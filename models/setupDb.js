
const getDb = require('./db');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // Use built-in crypto module

// Function to initialize the database
async function setupDb() {
  let db; // Declare db variable here to ensure it's accessible in finally block
  try {
    db = await getDb(); // Assign the database connection
    console.log('Setting up database...');
    
    // Create users table - Updated schema
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL, -- Store hash
        salt TEXT NOT NULL,          -- Store salt
        address TEXT,                -- Added address field
        avatar_image TEXT,
        theme_preference TEXT DEFAULT 'light',
        is_admin INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS teams (
        team_id INTEGER PRIMARY KEY AUTOINCREMENT,
        team_name TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS team_pokemon (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        team_id INTEGER NOT NULL,
        position INTEGER NOT NULL CHECK (position BETWEEN 1 AND 6),
        pokemon_id INTEGER NOT NULL,
        nickname TEXT,
        custom_notes TEXT,
        FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
        UNIQUE (team_id, position)
      );

      CREATE TABLE IF NOT EXISTS tags (
        tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag_name TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        UNIQUE (tag_name, user_id)
      );

      CREATE TABLE IF NOT EXISTS pokemon_tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pokemon_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE,
        UNIQUE (pokemon_id, tag_id)
      );

      CREATE TABLE IF NOT EXISTS boxes (
        box_id INTEGER PRIMARY KEY AUTOINCREMENT,
        box_name TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS box_pokemon (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        box_id INTEGER NOT NULL,
        position INTEGER NOT NULL,
        pokemon_id INTEGER NOT NULL,
        nickname TEXT,
        custom_notes TEXT,
        FOREIGN KEY (box_id) REFERENCES boxes(box_id) ON DELETE CASCADE
      );
    `);

    // Check if admin user exists
    const adminUser = await db.get('SELECT * FROM users WHERE username = ?', ['admin']);
    
    // Create admin user if it doesn't exist using crypto
    if (!adminUser) {
      const salt = crypto.randomBytes(16).toString('hex');
      // Use pbkdf2Sync for hashing (example, adjust iterations/keylen as needed)
      const hash = crypto.pbkdf2Sync('admin123', salt, 100000, 64, 'sha512').toString('hex');
      
      await db.run(
        'INSERT INTO users (username, email, password_hash, salt, address, is_admin) VALUES (?, ?, ?, ?, ?, ?)',
        ['admin', 'admin@rotomii.com', hash, salt, '123 Admin St', 1] // Added hash, salt, address
      );
      
      console.log('Admin user created');
    }
    
    console.log('Database setup complete');
  } catch (err) {
    console.error('Error setting up database:', err);
    throw err;
  } finally {
    // Only close if the db object was successfully obtained
    if (db) { 
        await db.close();
    }
  }
}

module.exports = setupDb;
