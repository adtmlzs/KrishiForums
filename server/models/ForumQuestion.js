const mongoose = require('mongoose');

const forumQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        index: true  // Index for faster search
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    category: {
        type: String,
        default: 'General',
        index: true  // Index for filtering by category
    },
    createdDate: {
        type: Date,
        default: Date.now,
        index: -1  // Index for sorting by date (newest first)
    },
    views: {
        type: Number,
        default: 0
    },
    answers: [{
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            default: 'Krishi Mitra Team'
        },
        createdDate: {
            type: Date,
            default: Date.now
        },
        isOfficial: {
            type: Boolean,
            default: true
        }
    }],
    isAnswered: {
        type: Boolean,
        default: false,
        index: true  // Index for filtering answered/unanswered
    }
}, {
    timestamps: true,
    collection: 'forum',  // Explicitly set collection name to 'forum'
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual field for answer count (computed automatically)
forumQuestionSchema.virtual('answerCount').get(function () {
    return this.answers ? this.answers.length : 0;
});

module.exports = mongoose.model('ForumQuestion', forumQuestionSchema);
