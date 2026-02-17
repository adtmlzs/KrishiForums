const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    publishedDate: {
        type: Date,
        default: Date.now,
        index: -1
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true,
        index: true
    },
    tags: [String],
    image: String
}, {
    timestamps: true,
    collection: 'blogs'
});

module.exports = mongoose.model('Blog', blogSchema);
