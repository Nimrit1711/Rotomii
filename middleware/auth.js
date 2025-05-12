// Authentication middleware functions
// Created by Alex Hart (a1839644)

// Check if the user is logged in
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Please log in to access this page' });
};

// Check if the user is an admin
exports.isAdmin = (req, res, next) => {
  // TODO: Test this more thoroughly
  if (req.isAuthenticated() && req.user.is_admin === 1) {
    return next();
  }
  return res.status(403).json({ message: 'Sorry, only admins can access this page' });
};

// Validate registration input
exports.validateRegistration = (req, res, next) => {
  const {
 username, email, password, confirmPassword
} = req.body;

  // Check if all fields are filled in
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if email is valid
  // Simple email validation - has @ and .
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Username validation - 3-20 chars, letters, numbers and underscore only
  if (username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(400).json({
      message: 'Username must be 3-20 characters and only contain letters, numbers, and underscores'
    });
  }

  // Basic password validation - at least 8 chars
  if (password.length < 8) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long'
    });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // All checks passed, continue
  return next();
};
