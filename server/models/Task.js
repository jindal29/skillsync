const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    details: {
        type: String, // "keep details add details"
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
