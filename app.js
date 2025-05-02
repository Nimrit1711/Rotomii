const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Import database setup
const setupDb = require('./models/setupDb');

// Import models
const User = require('./models/user');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Session configuration
// TODO: Move secret to environment variable later
app.use(session({
  secret: 'rotomii-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Change to true when we deploy
    maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
  }
}));

// Setup passport stuff
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passport')(passport);

// Initialize database
setupDb().catch((err) => {
  process.exit(1);
});

// Routes
const authRoutes = require('./routes/auth');
const pokemonRoutes = require('./routes/pokemon');
const teamRoutes = require('./routes/teams');

app.use('/api/auth', authRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/teams', teamRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('Rotomii API is running! Made by Group 34');
});

// Protected route example
const { isAuthenticated, isAdmin } = require('./middleware/auth');

// Get user profile if logged in
app.get('/api/profile', isAuthenticated, (req, res) => res.json({
  user: {
    id: req.user.user_id,
    username: req.user.username,
    email: req.user.email,
    avatar: req.user.avatar_image,
    theme: req.user.theme_preference
  }
}));

// Admin route example - get all users
// Only admins can access this
app.get('/api/admin/users', isAdmin, async (req, res) => {
  try {
    const users = await User.getAllUsers();
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Handle 404 - route not found
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => res.status(500).json({ message: 'Something went wrong!' }));

// Start server
app.listen(PORT, () => {});
