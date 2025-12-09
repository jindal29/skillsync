const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Trainer receiving the review
        required: true,
    },
    skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Review', reviewSchema);
