import { useState, useEffect } from 'react';
import { blogAPI, forumAPI, updatesAPI, analyticsAPI } from '../services/api';
import styles from '../styles/Admin.module.css';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [analytics, setAnalytics] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    // Blog editor state
    const [blogForm, setBlogForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: 'Krishi Mitra Team',
        category: 'Technology',
        isPublished: true
    });
    const [editingBlogId, setEditingBlogId] = useState(null);

    // Update editor state
    const [updateForm, setUpdateForm] = useState({
        title: '',
        content: '',
        category: 'Development'
    });
    const [editingUpdateId, setEditingUpdateId] = useState(null);

    // Answer form state
    const [answerForm, setAnswerForm] = useState({});

    // Edit answer state
    const [editingAnswer, setEditingAnswer] = useState(null); // { questionId, answerId, content }

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'krishi@2026') {
            setIsAuthenticated(true);
            setAuthError('');
            localStorage.setItem('admin_password', password);
        } else {
            setAuthError('Invalid password');
        }
    };

    useEffect(() => {
        const storedPassword = localStorage.getItem('admin_password');
        if (storedPassword === 'krishi@2026') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [activeTab, isAuthenticated]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'dashboard') {
                const response = await analyticsAPI.get();
                setAnalytics(response.data);
            } else if (activeTab === 'blogs') {
                const response = await blogAPI.getAllAdmin();
                setBlogs(response.data);
            } else if (activeTab === 'forum') {
                const response = await forumAPI.getAll();
                setQuestions(response.data);
            } else if (activeTab === 'updates') {
                const response = await updatesAPI.getAll();
                setUpdates(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    //==================== BLOG MANAGEMENT ====================
    const handleCreateBlog = async (e) => {
        e.preventDefault();
        try {
            if (editingBlogId) {
                await blogAPI.update(editingBlogId, blogForm);
            } else {
                await blogAPI.create(blogForm);
            }
            setBlogForm({ title: '', excerpt: '', content: '', author: 'Krishi Mitra Team', category: 'Technology', isPublished: true });
            setEditingBlogId(null);
            fetchData();
        } catch (error) {
            alert('Error saving blog');
        }
    };

    const handleEditBlog = (blog) => {
        setBlogForm({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            author: blog.author,
            category: blog.category,
            isPublished: blog.isPublished
        });
        setEditingBlogId(blog._id || blog.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteBlog = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await blogAPI.delete(id);
                fetchData();
            } catch (error) {
                alert('Error deleting blog');
            }
        }
    };

    //==================== FORUM MANAGEMENT ====================
    const handleAnswerQuestion = async (questionId) => {
        const content = answerForm[questionId];
        if (!content || !content.trim()) return;
        try {
            await forumAPI.answer(questionId, { content });
            setAnswerForm({ ...answerForm, [questionId]: '' });
            fetchData();
        } catch (error) {
            alert('Error posting answer');
        }
    };

    const handleEditAnswer = async () => {
        if (!editingAnswer || !editingAnswer.content.trim()) return;
        try {
            await forumAPI.editAnswer(editingAnswer.questionId, editingAnswer.answerId, { content: editingAnswer.content });
            setEditingAnswer(null);
            fetchData();
        } catch (error) {
            alert('Error editing answer');
        }
    };

    const handleDeleteAnswer = async (questionId, answerId) => {
        if (window.confirm('Delete this answer?')) {
            try {
                await forumAPI.deleteAnswer(questionId, answerId);
                fetchData();
            } catch (error) {
                alert('Error deleting answer');
            }
        }
    };

    const handleDeleteQuestion = async (id) => {
        if (window.confirm('Delete this question and all its answers?')) {
            try {
                await forumAPI.delete(id);
                fetchData();
            } catch (error) {
                alert('Error deleting question');
            }
        }
    };

    //==================== UPDATES MANAGEMENT ====================
    const handleCreateUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingUpdateId) {
                await updatesAPI.update(editingUpdateId, updateForm);
            } else {
                await updatesAPI.create(updateForm);
            }
            setUpdateForm({ title: '', content: '', category: 'Development' });
            setEditingUpdateId(null);
            fetchData();
        } catch (error) {
            alert('Error saving update');
        }
    };

    const handleEditUpdate = (update) => {
        setUpdateForm({
            title: update.title,
            content: update.content,
            category: update.category
        });
        setEditingUpdateId(update._id || update.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteUpdate = async (id) => {
        if (window.confirm('Delete this update?')) {
            try {
                await updatesAPI.delete(id);
                fetchData();
            } catch (error) {
                alert('Error deleting update');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_password');
        setIsAuthenticated(false);
        setPassword('');
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.adminPage}>
                <div className={styles.loginContainer}>
                    <div className={styles.loginBox}>
                        <h1>🌱 Admin Access</h1>
                        <p>Enter password to access the admin panel</p>
                        <form onSubmit={handleLogin}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                autoFocus
                            />
                            {authError && <p className={styles.loginError}>{authError}</p>}
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.adminPage}>
            <div className={styles.adminContainer}>
                <div className={styles.adminHeader}>
                    <h1 className={styles.adminTitle}>🌱 Admin Panel</h1>
                    <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={activeTab === 'dashboard' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={activeTab === 'blogs' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('blogs')}
                    >
                        Blogs
                    </button>
                    <button
                        className={activeTab === 'forum' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('forum')}
                    >
                        Forum
                    </button>
                    <button
                        className={activeTab === 'updates' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('updates')}
                    >
                        Updates
                    </button>
                </div>

                <div className={styles.tabContent}>
                    {/* DASHBOARD */}
                    {activeTab === 'dashboard' && analytics && (
                        <div className={styles.dashboard}>
                            <h2>Analytics Overview</h2>
                            <div className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <h3>Total Views</h3>
                                    <p className={styles.statNumber}>{analytics.totalViews}</p>
                                </div>
                                <div className={styles.statCard}>
                                    <h3>Blog Posts</h3>
                                    <p className={styles.statNumber}>{analytics.stats.totalBlogs}</p>
                                    <span>({analytics.stats.publishedBlogs} published)</span>
                                </div>
                                <div className={styles.statCard}>
                                    <h3>Forum Questions</h3>
                                    <p className={styles.statNumber}>{analytics.stats.totalQuestions}</p>
                                    <span>({analytics.stats.answeredQuestions} answered)</span>
                                </div>
                                <div className={styles.statCard}>
                                    <h3>Updates</h3>
                                    <p className={styles.statNumber}>{analytics.stats.totalUpdates}</p>
                                </div>
                            </div>
                            <h3>Page Views</h3>
                            <ul className={styles.pageViews}>
                                {Object.entries(analytics.pageViews).map(([page, views]) => (
                                    <li key={page}><strong>{page}:</strong> {views} views</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* BLOGS */}
                    {activeTab === 'blogs' && (
                        <div className={styles.blogsTab}>
                            <h2>{editingBlogId ? '✏️ Edit Blog' : '📝 Create New Blog'}</h2>
                            <form onSubmit={handleCreateBlog} className={styles.form}>
                                <input
                                    type="text"
                                    placeholder="Blog Title"
                                    value={blogForm.title}
                                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Excerpt (short summary)"
                                    value={blogForm.excerpt}
                                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                                    required
                                />
                                <select value={blogForm.category} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}>
                                    <option value="Technology">Technology</option>
                                    <option value="Farming">Farming</option>
                                    <option value="Innovation">Innovation</option>
                                </select>
                                <textarea
                                    value={blogForm.content}
                                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                    placeholder="Write your blog content here..."
                                    rows="10"
                                    style={{ fontFamily: 'inherit', fontSize: '1rem' }}
                                />
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={blogForm.isPublished}
                                        onChange={(e) => setBlogForm({ ...blogForm, isPublished: e.target.checked })}
                                    />
                                    Publish immediately
                                </label>
                                <button type="submit">{editingBlogId ? 'Update Blog' : 'Create Blog'}</button>
                                {editingBlogId && (
                                    <button type="button" onClick={() => {
                                        setBlogForm({ title: '', excerpt: '', content: '', author: 'Krishi Mitra Team', category: 'Technology', isPublished: true });
                                        setEditingBlogId(null);
                                    }}>Cancel</button>
                                )}
                            </form>

                            <h2>All Blogs</h2>
                            <div className={styles.blogsList}>
                                {blogs.map((blog) => (
                                    <div key={blog._id || blog.id} className={styles.blogItem}>
                                        <h3>{blog.title}</h3>
                                        <p>{blog.excerpt}</p>
                                        <div className={styles.blogActions}>
                                            <span>{blog.isPublished ? '✅ Published' : '📄 Draft'}</span>
                                            <span>👁 {blog.views} views</span>
                                            <button onClick={() => handleEditBlog(blog)}>✏️ Edit</button>
                                            <button onClick={() => handleDeleteBlog(blog._id || blog.id)}>🗑 Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FORUM */}
                    {activeTab === 'forum' && (
                        <div className={styles.forumTab}>
                            <h2>Forum Questions</h2>
                            {questions.map((question) => (
                                <div key={question._id} className={styles.questionItem}>
                                    <h3>{question.question}</h3>
                                    <p>{question.description}</p>
                                    <div className={styles.questionMeta}>
                                        <span>By {question.author}</span>
                                        <span>👁 {question.views} views</span>
                                        <span>💬 {question.answers?.length || 0} answers</span>
                                        <button onClick={() => handleDeleteQuestion(question._id)}>🗑 Delete Question</button>
                                    </div>

                                    <div className={styles.answerSection}>
                                        <h4>Answers:</h4>
                                        {question.answers && question.answers.map((answer) => (
                                            <div key={answer._id} className={styles.answer}>
                                                {editingAnswer && editingAnswer.answerId === answer._id ? (
                                                    <>
                                                        <textarea
                                                            value={editingAnswer.content}
                                                            onChange={(e) => setEditingAnswer({ ...editingAnswer, content: e.target.value })}
                                                        />
                                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                            <button onClick={handleEditAnswer}>💾 Save</button>
                                                            <button onClick={() => setEditingAnswer(null)} style={{ background: '#e0e0e0', color: '#555' }}>Cancel</button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                                                            <span style={{ fontSize: '0.8rem', color: '#999' }}>{answer.author}</span>
                                                            <button
                                                                onClick={() => setEditingAnswer({
                                                                    questionId: question._id,
                                                                    answerId: answer._id,
                                                                    content: answer.content
                                                                })}
                                                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                                            >✏️ Edit</button>
                                                            <button
                                                                onClick={() => handleDeleteAnswer(question._id, answer._id)}
                                                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'none', color: '#e53935', border: '1px solid #e53935' }}
                                                            >🗑 Delete</button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}

                                        <textarea
                                            placeholder="Write your answer..."
                                            value={answerForm[question._id] || ''}
                                            onChange={(e) => setAnswerForm({ ...answerForm, [question._id]: e.target.value })}
                                        />
                                        <button onClick={() => handleAnswerQuestion(question._id)}>Post Answer</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* UPDATES */}
                    {activeTab === 'updates' && (
                        <div className={styles.updatesTab}>
                            <h2>{editingUpdateId ? '✏️ Edit Update' : '📢 Create Update'}</h2>
                            <form onSubmit={handleCreateUpdate} className={styles.form}>
                                <input
                                    type="text"
                                    placeholder="Update Title"
                                    value={updateForm.title}
                                    onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Update Content"
                                    value={updateForm.content}
                                    onChange={(e) => setUpdateForm({ ...updateForm, content: e.target.value })}
                                    required
                                />
                                <select value={updateForm.category} onChange={(e) => setUpdateForm({ ...updateForm, category: e.target.value })}>
                                    <option value="Development">Development</option>
                                    <option value="Release">Release</option>
                                    <option value="Event">Event</option>
                                </select>
                                <button type="submit">{editingUpdateId ? 'Update' : 'Create Update'}</button>
                                {editingUpdateId && (
                                    <button type="button" onClick={() => {
                                        setUpdateForm({ title: '', content: '', category: 'Development' });
                                        setEditingUpdateId(null);
                                    }}>Cancel</button>
                                )}
                            </form>

                            <h2>All Updates</h2>
                            <div className={styles.updatesList}>
                                {updates.map((update) => (
                                    <div key={update._id || update.id} className={styles.updateItem}>
                                        <span className={styles.updateCategory}>{update.category}</span>
                                        <h3>{update.title}</h3>
                                        <p>{update.content}</p>
                                        <div className={styles.updateActions}>
                                            <span>{new Date(update.date).toLocaleDateString()}</span>
                                            <button onClick={() => handleEditUpdate(update)}>✏️ Edit</button>
                                            <button onClick={() => handleDeleteUpdate(update._id || update.id)}>🗑 Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
