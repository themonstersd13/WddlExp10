// backend/controllers/taskController.js
const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, dueDate, priority, category } = req.body;
    try {
        const task = await Task.create({ 
            user: req.user.id, 
            title, 
            description, 
            dueDate, 
            priority, 
            category 
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};