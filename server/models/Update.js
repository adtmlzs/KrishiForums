const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        index: -1
    },
    link: String,
    category: {
        type: String,
        default: 'General'
    }
}, {
    timestamps: true,
    collection: 'updates'
});

module.exports = mongoose.model('Update', updateSchema);
