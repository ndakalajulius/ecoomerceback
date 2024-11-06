const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Import the User model

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();  // Save the new user to the database

    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },  // Payload containing user ID and admin status
      process.env.JWT_SECRET,  // JWT secret from environment
      { expiresIn: '1h' }  // Token expiration time
    );

    // Send token in the response
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile (authenticated route)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);  // `req.user.userId` is set by auth middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user profile data
    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile (authenticated route)
exports.updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.user.userId);  // `req.user.userId` is set by auth middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user profile
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();  // Save the updated user data

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
