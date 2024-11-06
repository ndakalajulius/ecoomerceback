const express = require('express');
const router = express.Router();
const { register, login, getUserProfile, updateUserProfile } = require('../controllers/userController');  // Import controller functions
const { auth } = require('../middleware/authMiddleware');  // Import auth middleware to protect routes

// POST route for user registration
router.post('/register', register);

// POST route for user login
router.post('/login', login);

// GET route for getting user profile (protected by authentication)
router.get('/profile', auth, getUserProfile);

// PUT route for updating user profile (protected by authentication)
router.put('/profile', auth, updateUserProfile);

module.exports = router;  // Export the router to be used in the server
