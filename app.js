require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
const setupDb = require('./models/setupDb');
const User = require('./models/user');
const { isAuthenticated, isAdmin } = require('./middleware/auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pokemonRouter = require('./routes/pokemon');
var teamPages = require('./routes/teams');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-for-development',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Basic security headers middleware
app.use((req, res, next) => {
  // Prevent clickjacking attacks
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS filtering in browsers
  res.setHeader('X-XSS-Protection', '1; mode=block');

  next();
});

// Setup passport stuff
app.use(passport.initialize());
app.use(passport.session());

// Make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pokemon', pokemonRouter);
app.use('/teams', teamPages);




// Passport configuration
require('./config/passport')(passport);

// Initialize database
setupDb().catch((err) => {
  console.error('Database initialization error:', err);
  process.exit(1);
});

// Routes
const authRoutes = require('./routes/auth');
const pokemonRoutes = require('./routes/pokemon');
const teamRoutes = require('./routes/teams');
const indexRoutes = require('./routes/index');

app.use('/api/auth', authRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/teams', teamRoutes);
app.use('/', indexRoutes);
// Get user profile if logged in
app.get('/api/profile', isAuthenticated, (req, res) => {
  res.json({
    user: {
      id: req.user.user_id,
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar_image,
      theme: req.user.theme_preference
    }
  });
});

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

app.use((req, res, next) => {
  next(createError(404, 'Page Not Found'));
});

// error handler
app.use(function(err, req, res, next) {
  // Log error for debugging (in production, use proper logging service)
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Don't expose sensitive error information in production
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Set safe error message
  const safeMessage = isDevelopment ? err.message : 'Something went wrong';
  const safeError = isDevelopment ? err : {};

  // Set locals for template
  res.locals.message = safeMessage;
  res.locals.error = safeError;

  // Render error page with safe information
  res.status(err.status || 500);
  res.render('error', {
    error: safeError,
    message: safeMessage
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
