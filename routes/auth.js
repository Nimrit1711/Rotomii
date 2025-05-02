const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const { validateRegistration, isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Register new user
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username exists
    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email exists
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Register user
    const userId = await User.register(username, email, password);

    return res.status(201).json({
      message: 'User registered successfully',
      userId
    });
  } catch (error) {
    // Use logger or remove console statement
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      return res.json({
        message: 'Login successful',
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
          avatar: user.avatar_image,
          theme: user.theme_preference,
          isAdmin: user.is_admin === 1
        }
      });
    });
    return undefined;
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    return res.json({ message: 'Logged out successfully' });
  });
});

// Check authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      isAuthenticated: true,
      user: {
        id: req.user.user_id,
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar_image,
        theme: req.user.theme_preference,
        isAdmin: req.user.is_admin === 1
      }
    });
  }
  return res.json({ isAuthenticated: false });
});

// Change password route (protected)
router.post('/change-password', isAuthenticated, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    // Check if all fields are provided
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if new passwords match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    // Validate new password format
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long and contain at least one letter and one number'
      });
    }

    // Verify current password
    const user = await User.findById(req.user.user_id);
    const isMatch = await User.validatePassword(user, currentPassword);

    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Change password
    await User.changePassword(req.user.user_id, newPassword);

    return res.json({ message: 'Password changed successfully' });
  } catch (error) {
    // Use logger or remove console statement
    return res.status(500).json({ message: 'Server error while changing password' });
  }
});

// Admin routes
// Get all users (admin only)
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.getAllUsers();
    return res.json({ users });
  } catch (error) {
    // Use logger or remove console statement
    return res.status(500).json({ message: 'Server error while fetching users' });
  }
});

// Delete user (admin only)
router.delete('/users/:userId', isAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent admin from deleting their own account
    if (parseInt(userId, 10) === req.user.user_id) {
      return res.status(400).json({ message: 'Cannot delete your own admin account' });
    }

    const success = await User.deleteUser(userId);

    if (success) {
      return res.json({ message: 'User deleted successfully' });
    }
    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    // Use logger or remove console statement
    return res.status(500).json({ message: 'Server error while deleting user' });
  }
});

module.exports = router;
