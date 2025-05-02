const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
  // Serialize user for the session
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Local strategy
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        // Check if input is email or username
        const isEmail = username.includes('@');
        let user;

        if (isEmail) {
          user = await User.findByEmail(username);
        } else {
          user = await User.findByUsername(username);
        }

        if (!user) {
          return done(null, false, { message: 'Incorrect username or email' });
        }

        const isMatch = await User.validatePassword(user, password);

        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));
};
