require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// ========== MONGODB CONNECTION URI ==========
// Set MONGODB_URI in your .env file or as an environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/krishimitra';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
    console.log('📂 Database:', MONGODB_URI);
}).catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.log('⚠️  Server will continue without MongoDB. Forum questions will not persist.');
});

// Import models
const forumQuestion = require('./models/ForumQuestion');
const Analytics = require('./models/Analytics');
const Blog = require('./models/Blog');
const Update = require('./models/Update');

// Admin password (hashed)
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('krishi@2026', 10);

// Middleware
// ========== CORS CONFIGURATION ==========
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    /\.vercel\.app$/  // Allows all Vercel deployment URLs
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed instanceof RegExp) return allowed.test(origin);
            return allowed === origin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(null, true); // Fallback to allowing for now if specific check fails
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-admin-password', 'Authorization', 'Origin', 'Accept'],
    optionsSuccessStatus: 200
}));

// Manual CORS fallback for Vercel
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password, Authorization, Origin, Accept');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});
app.use(express.json());

// Root route for health check
app.get('/', (req, res) => {
    res.json({ message: 'Krishi Mitra API is alive 🚀' });
});

// Admin authentication middleware
const authenticateAdmin = async (req, res, next) => {
    const password = req.headers['x-admin-password'];

    if (!password) {
        return res.status(401).json({ error: 'Admin password required' });
    }

    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isValid) {
        return res.status(401).json({ error: 'Invalid admin password' });
    }

    next();
};

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');
const FORUM_FILE = path.join(DATA_DIR, 'forum.json');
const UPDATES_FILE = path.join(DATA_DIR, 'updates.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

// Helper functions for reading/writing JSON
const readJSON = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
};

const writeJSON = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error);
    }
};

// Analytics middleware - now uses MongoDB for fast performance
const trackView = (page) => async (req, res, next) => {
    try {
        const analytics = await Analytics.getInstance();
        analytics.totalViews++;
        analytics.pageViews[page]++;
        await analytics.save();
    } catch (error) {
        console.error('Error tracking view:', error);
    }
    next();
};

// ==================== BLOG ROUTES (MongoDB) ====================

// Get all blogs
app.get('/api/blogs', trackView('blog'), async (req, res) => {
    try {
        const publishedBlogs = await Blog.find({ isPublished: true })
            .sort({ publishedDate: -1 })
            .lean();
        res.json(publishedBlogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

// Get single blog by slug
app.get('/api/blogs/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Increment view count
        blog.views = (blog.views || 0) + 1;
        await blog.save();

        // Track in MongoDB analytics (async)
        Analytics.getInstance().then(async (analytics) => {
            if (!analytics.blogViews.has(blog.id)) {
                analytics.blogViews.set(blog.id, 0);
            }
            analytics.blogViews.set(blog.id, analytics.blogViews.get(blog.id) + 1);
            await analytics.save();
        }).catch(err => console.error('Analytics blog view error:', err));

        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});

// Create blog (admin) - requires authentication
app.post('/api/blogs', authenticateAdmin, async (req, res) => {
    try {
        const newBlog = new Blog({
            id: uuidv4(),
            ...req.body,
            slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            publishedDate: new Date(),
            views: 0
        });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create blog' });
    }
});

// Update blog (admin) - requires authentication
app.put('/api/blogs/:id', authenticateAdmin, async (req, res) => {
    try {
        const blog = await Blog.findOne({ id: req.params.id });

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const updates = { ...req.body };
        if (updates.title) {
            updates.slug = updates.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }

        Object.assign(blog, updates);
        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update blog' });
    }
});

// Delete blog (admin) - requires authentication
app.delete('/api/blogs/:id', authenticateAdmin, async (req, res) => {
    try {
        await Blog.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

// Get all blogs for admin (including unpublished) - requires authentication
app.get('/api/admin/blogs', authenticateAdmin, async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

// ==================== FORUM ROUTES (MongoDB) ====================

// Get all forum questions - OPTIMIZED with lean() for speed
app.get('/api/forum', trackView('forum'), async (req, res) => {
    try {
        // lean() returns plain JavaScript objects instead of Mongoose documents (faster)
        const questions = await ForumQuestion.find()
            .select('-email')  // Don't send email to frontend
            .sort({ createdDate: -1 })  // Most recent first
            .lean();  // Faster performance

        res.json(questions);
    } catch (error) {
        console.error('Forum fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch forum questions' });
    }
});

// Get single question - OPTIMIZED
app.get('/api/forum/:id', async (req, res) => {
    try {
        const question = await ForumQuestion.findById(req.params.id)
            .select('-email');  // Don't send email to frontend

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Increment view count
        question.views += 1;
        await question.save();

        // Track in MongoDB analytics (async, don't wait)
        Analytics.getInstance().then(analytics => {
            if (!analytics.forumViews.has(question._id.toString())) {
                analytics.forumViews.set(question._id.toString(), 0);
            }
            analytics.forumViews.set(
                question._id.toString(),
                analytics.forumViews.get(question._id.toString()) + 1
            );
            analytics.save().catch(err => console.error('Analytics save error:', err));
        });

        res.json(question);
    } catch (error) {
        console.error('Question fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch question' });
    }
});

// Ask question
app.post('/api/forum', async (req, res) => {
    try {
        const { question, description, author, email, category } = req.body;

        // Validate required fields
        if (!question || !description || !author || !email) {
            return res.status(400).json({ error: 'All fields including email are required' });
        }

        const newQuestion = new ForumQuestion({
            question,
            description,
            author,
            email,
            category: category || 'General'
        });

        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Question creation error:', error);
        res.status(500).json({ error: 'Failed to create question' });
    }
});

// Answer question (admin) - requires authentication
app.post('/api/forum/:id/answer', authenticateAdmin, async (req, res) => {
    try {
        const question = await ForumQuestion.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const newAnswer = {
            content: req.body.content,
            author: req.body.author || 'Krishi Mitra Team',
            isOfficial: true
        };

        question.answers.push(newAnswer);
        question.isAnswered = true;

        await question.save();
        res.json(question);
    } catch (error) {
        console.error('Answer post error:', error);
        res.status(500).json({ error: 'Failed to post answer' });
    }
});

// Delete question (admin) - requires authentication
app.delete('/api/forum/:id', authenticateAdmin, async (req, res) => {
    try {
        await ForumQuestion.findByIdAndDelete(req.params.id);
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Question delete error:', error);
        res.status(500).json({ error: 'Failed to delete question' });
    }
});

// Edit answer (admin) - requires authentication
app.put('/api/forum/:id/answer/:answerId', authenticateAdmin, async (req, res) => {
    try {
        const question = await ForumQuestion.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const answer = question.answers.id(req.params.answerId);
        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        answer.content = req.body.content;
        await question.save();
        res.json(question);
    } catch (error) {
        console.error('Answer edit error:', error);
        res.status(500).json({ error: 'Failed to edit answer' });
    }
});

// Delete answer (admin) - requires authentication
app.delete('/api/forum/:id/answer/:answerId', authenticateAdmin, async (req, res) => {
    try {
        const question = await ForumQuestion.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        question.answers = question.answers.filter(a => a._id.toString() !== req.params.answerId);
        if (question.answers.length === 0) {
            question.isAnswered = false;
        }
        await question.save();
        res.json(question);
    } catch (error) {
        console.error('Answer delete error:', error);
        res.status(500).json({ error: 'Failed to delete answer' });
    }
});

// ==================== UPDATES ROUTES (MongoDB) ====================

// Get all updates
app.get('/api/updates', trackView('updates'), async (req, res) => {
    try {
        const updates = await Update.find().sort({ date: -1 }).lean();
        res.json(updates);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch updates' });
    }
});

// Create update (admin) - requires authentication
app.post('/api/updates', authenticateAdmin, async (req, res) => {
    try {
        const newUpdate = new Update({
            id: uuidv4(),
            ...req.body,
            date: new Date()
        });
        await newUpdate.save();
        res.status(201).json(newUpdate);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create update' });
    }
});

// Delete update (admin) - requires authentication
app.delete('/api/updates/:id', authenticateAdmin, async (req, res) => {
    try {
        await Update.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Update deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete update' });
    }
});

// Edit update (admin) - requires authentication
app.put('/api/updates/:id', authenticateAdmin, async (req, res) => {
    try {
        const update = await Update.findOne({ id: req.params.id });

        if (!update) {
            return res.status(404).json({ error: 'Update not found' });
        }

        Object.assign(update, req.body);
        await update.save();
        res.json(update);
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit update' });
    }
});

// ==================== ANALYTICS ROUTES ====================

// Get analytics (admin) - OPTIMIZED with MongoDB
app.get('/api/analytics', authenticateAdmin, async (req, res) => {
    try {
        // Get analytics from MongoDB
        const analytics = await Analytics.getInstance();

        // Get counts from databases
        const totalBlogs = await Blog.countDocuments();
        const publishedBlogs = await Blog.countDocuments({ isPublished: true });
        const totalUpdates = await Update.countDocuments();
        const totalQuestions = await ForumQuestion.countDocuments();
        const answeredQuestions = await ForumQuestion.countDocuments({ isAnswered: true });

        // Update stats in analytics document
        analytics.stats.totalBlogs = totalBlogs;
        analytics.stats.publishedBlogs = publishedBlogs;
        analytics.stats.totalQuestions = totalQuestions;
        analytics.stats.answeredQuestions = answeredQuestions;
        analytics.stats.totalUpdates = totalUpdates;
        await analytics.save();

        res.json({
            totalViews: analytics.totalViews,
            pageViews: analytics.pageViews,
            blogViews: Object.fromEntries(analytics.blogViews),
            forumViews: Object.fromEntries(analytics.forumViews),
            stats: analytics.stats
        });
    } catch (error) {
        console.error('Analytics fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Krishi Mitra API is running' });
});

// Start server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🌱 Krishi Mitra Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
