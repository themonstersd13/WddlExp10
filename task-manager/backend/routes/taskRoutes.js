// backend/routes/taskRoutes.js
const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/tasks - Get all tasks
router.get('/', authenticate, getTasks);

// POST /api/tasks - Create a new task
router.post('/', authenticate, createTask);

// PUT /api/tasks/:id - Update a task
router.put('/:id', authenticate, updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', authenticate, deleteTask);

module.exports = router;