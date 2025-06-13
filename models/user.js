const getDb = require('./db');
const crypto = require('crypto');
// Function to hash a password with a salt
function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

// User model for handling all user-related operations
class User {
  // Register a new user
  static async register(username, email, password, address = null, avatar = null, theme = 'light') {
    const db = await getDb();
    try {
      // Generate a salt
      const salt = crypto.randomBytes(16).toString('hex');
      // Hash the password using the salt
      const hashedPassword = hashPassword(password, salt);

      // Insert the new user into the database
      const result = await db.run(
        'INSERT INTO users (username, email, password_hash, salt, address, avatar_image, theme_preference) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [username, email, hashedPassword, salt, address, avatar, theme]
      );
      return result.lastID;
    } finally {
      if (db) await db.close();
    }
  }

  // Find a user by their username
  static async findByUsername(username) {
    const db = await getDb();
    try {
      return await db.get('SELECT * FROM users WHERE username = ?', [username]);
    } finally {
      if (db) await db.close();
    }
  }

  // Find a user by their email
  static async findByEmail(email) {
    const db = await getDb();
    try {
      return await db.get('SELECT * FROM users WHERE email = ?', [email]);
    } finally {
      if (db) await db.close();
    }
  }

  // Validate the password against the stored hash
  static async validatePassword(user, password) {
    // Hash the provided password using the user's stored salt
    const hashToCompare = hashPassword(password, user.salt);
    // Compare the generated hash with the stored hash
    return crypto.timingSafeEqual(Buffer.from(hashToCompare, 'hex'), Buffer.from(user.password_hash, 'hex'));
  }

  // Find a user by their ID
  static async findById(id) {
    const db = await getDb();
    try {
      // Select all columns except the password hash and salt for security
      return await db.get('SELECT user_id, username, email, address, avatar_image, theme_preference, is_admin, created_at FROM users WHERE user_id = ?', [id]);
    } finally {
      if (db) await db.close();
    }
  }

  // Update user profile information (including address)
  static async updateProfile(userId, updates) {
    const db = await getDb();
    try {
      const validFields = ['username', 'email', 'address', 'avatar_image', 'theme_preference'];
      const setClause = [];
      const values = [];

      // Build the SET clause for the SQL query
      for (const key in updates) {
        if (validFields.includes(key)) {
          setClause.push(`${key} = ?`);
          values.push(updates[key]);
        }
      }

      // If no valid fields to update, return false
      if (setClause.length === 0) return false;

      values.push(userId);

      const result = await db.run(
        `UPDATE users SET ${setClause.join(', ')} WHERE user_id = ?`,
        values
      );

      return result.changes > 0;
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('Username or email already exists.');
      } else {
        throw error;
      }
    } finally {
      if (db) await db.close();
    }
  }

  // Change the user's password using crypto
  static async changePassword(userId, newPassword) {
    const db = await getDb();
    try {
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = hashPassword(newPassword, salt);

      const result = await db.run(
        'UPDATE users SET password_hash = ?, salt = ? WHERE user_id = ?',
        [hashedPassword, salt, userId]
      );

      return result.changes > 0;
    } finally {
      if (db) await db.close();
    }
  }

  // Get all users - for admin only (exclude password info)
  static async getAllUsers() {
    const db = await getDb();
    try {
      return await db.all('SELECT user_id, username, email, address, avatar_image, theme_preference, is_admin, created_at FROM users');
    } finally {
      if (db) await db.close();
    }
  }

  // Get all non-admin users - for admin only (exclude password info)
  static async getNonAdminUsers() {
    const db = await getDb();
    try {
      return await db.all('SELECT user_id, username, email, address, avatar_image, theme_preference, is_admin, created_at FROM users WHERE is_admin = 0');
    } finally {
      if (db) await db.close();
    }
  }

  // Delete a user
  static async deleteUser(userId) {
    const db = await getDb();
    try {
      const result = await db.run('DELETE FROM users WHERE user_id = ?', [userId]);
      return result.changes > 0;
    } finally {
      if (db) await db.close();
    }
  }
}





module.exports = User;
