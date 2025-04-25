// backend/routes/authRoutes.js
const express = require('express');
const { login, signup } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/signup
router.post('/signup', signup);

module.exports = router;