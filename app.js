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
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pokemon', pokemonRouter);

// Setup passport stuff
app.use(passport.initialize());
app.use(passport.session());

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

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
