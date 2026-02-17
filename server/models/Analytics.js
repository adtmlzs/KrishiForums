const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    totalViews: {
        type: Number,
        default: 0
    },
    pageViews: {
        home: { type: Number, default: 0 },
        blog: { type: Number, default: 0 },
        forum: { type: Number, default: 0 },
        updates: { type: Number, default: 0 }
    },
    blogViews: {
        type: Map,
        of: Number,
        default: {}
    },
    forumViews: {
        type: Map,
        of: Number,
        default: {}
    },
    stats: {
        totalBlogs: { type: Number, default: 0 },
        publishedBlogs: { type: Number, default: 0 },
        totalQuestions: { type: Number, default: 0 },
        answeredQuestions: { type: Number, default: 0 },
        totalUpdates: { type: Number, default: 0 }
    }
}, {
    timestamps: true,
    collection: 'analytics'
});

// Create a singleton pattern - only one analytics document
analyticsSchema.statics.getInstance = async function () {
    let analytics = await this.findOne();
    if (!analytics) {
        analytics = await this.create({});
    }
    return analytics;
};

module.exports = mongoose.model('Analytics', analyticsSchema);
