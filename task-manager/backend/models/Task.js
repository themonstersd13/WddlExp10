// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    category: { type: String },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);