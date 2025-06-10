// Authentication middleware functions
// Created by Alex Hart (a1839644)

// Check if the user is logged in
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).render('error', {
  error: 401,
  message: "Please log in to access this page.",
  err: {}
});

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

// Basic input sanitization helper
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim();
};

// Validate and sanitize registration input
exports.validateRegistration = (req, res, next) => {
  let {
 username, email, password, confirmPassword
} = req.body;

  // Sanitize inputs
  username = sanitizeString(username);
  email = sanitizeString(email);

  // Check if all fields are filled in
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Enhanced email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.length > 254) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Username validation - 3-20 chars, letters, numbers and underscore only
  if (username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(400).json({
      message: 'Username must be 3-20 characters and only contain letters, numbers, and underscores'
    });
  }

  // Enhanced password validation - at least 8 chars with letter and number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long and contain at least one letter and one number'
    });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Update req.body with sanitized values
  req.body.username = username;
  req.body.email = email;

  // All checks passed, continue
  return next();
};

// Validate team creation/update
exports.validateTeam = (req, res, next) => {
  let { teamName, team_name, notes } = req.body;

  // Handle both teamName and team_name fields
  const name = teamName || team_name;

  if (name !== undefined) {
    const sanitizedName = sanitizeString(name);
    if (!sanitizedName || sanitizedName.length === 0) {
      return res.status(400).json({ error: 'Team name cannot be empty' });
    }
    if (sanitizedName.length > 100) {
      return res.status(400).json({ error: 'Team name must be 100 characters or less' });
    }
    req.body.teamName = sanitizedName;
    req.body.team_name = sanitizedName;
  }

  if (notes !== undefined) {
    const sanitizedNotes = sanitizeString(notes);
    if (sanitizedNotes && sanitizedNotes.length > 500) {
      return res.status(400).json({ error: 'Notes must be 500 characters or less' });
    }
    req.body.notes = sanitizedNotes || '';
  }

  return next();
};

// Validate Pokemon addition to team
exports.validatePokemon = (req, res, next) => {
  let {
 position, pokemonName, nickname, notes
} = req.body;

  // Validate position
  const pos = parseInt(position, 10);
  if (!pos || pos < 1 || pos > 6) {
    return res.status(400).json({ error: 'Position must be between 1 and 6' });
  }

  // Validate Pokemon name
  if (!pokemonName || typeof pokemonName !== 'string') {
    return res.status(400).json({ error: 'Pokemon name is required' });
  }

  const sanitizedPokemonName = sanitizeString(pokemonName.toLowerCase());
  if (sanitizedPokemonName.length > 50) {
    return res.status(400).json({ error: 'Pokemon name too long' });
  }

  // Validate nickname
  if (nickname !== undefined) {
    const sanitizedNickname = sanitizeString(nickname);
    if (sanitizedNickname && sanitizedNickname.length > 50) {
      return res.status(400).json({ error: 'Nickname must be 50 characters or less' });
    }
    req.body.nickname = sanitizedNickname || '';
  }

  // Validate notes
  if (notes !== undefined) {
    const sanitizedNotes = sanitizeString(notes);
    if (sanitizedNotes && sanitizedNotes.length > 200) {
      return res.status(400).json({ error: 'Notes must be 200 characters or less' });
    }
    req.body.notes = sanitizedNotes || '';
  }

  req.body.position = pos;
  req.body.pokemonName = sanitizedPokemonName;

  return next();
};

// Validate profile updates
exports.validateProfile = (req, res, next) => {
  let {
 username, email, address, avatar_image
} = req.body;

  if (username !== undefined) {
    const sanitizedUsername = sanitizeString(username);
    if (sanitizedUsername.length < 3 || sanitizedUsername.length > 20 || !/^[a-zA-Z0-9_]+$/.test(sanitizedUsername)) {
      return res.status(400).json({
        message: 'Username must be 3-20 characters and only contain letters, numbers, and underscores'
      });
    }
    req.body.username = sanitizedUsername;
  }

  if (email !== undefined) {
    const sanitizedEmail = sanitizeString(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail) || sanitizedEmail.length > 254) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    req.body.email = sanitizedEmail;
  }

  if (address !== undefined) {
    const sanitizedAddress = sanitizeString(address);
    if (sanitizedAddress && sanitizedAddress.length > 200) {
      return res.status(400).json({ message: 'Address must be 200 characters or less' });
    }
    req.body.address = sanitizedAddress || '';
  }

  if (avatar_image !== undefined) {
    const sanitizedAvatar = sanitizeString(avatar_image);
    if (sanitizedAvatar && sanitizedAvatar.length > 500) {
      return res.status(400).json({ message: 'Avatar URL too long' });
    }
    req.body.avatar_image = sanitizedAvatar || '';
  }

  return next();
};

// Validate numeric IDs
exports.validateNumericId = (paramName) => (req, res, next) => {
    const id = parseInt(req.params[paramName], 10);
    if (!id || id < 1) {
      return res.status(400).json({ error: `Invalid ${paramName}` });
    }
    req.params[paramName] = id;
    return next();
  };
