const getDb = require('./db');
const crypto = require('crypto');
// Function to initialize the database
async function setupDb() {
  let db; try {
    db = await getDb();
    // Create users table - Updated schema
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        address TEXT,
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
        -- Damage multipliers for each type (1.0 = neutral, 2.0 = weak, 0.5 = resistant, 0.0 = immune)
        normal_dmg REAL DEFAULT 1.0,
        fire_dmg REAL DEFAULT 1.0,
        water_dmg REAL DEFAULT 1.0,
        electric_dmg REAL DEFAULT 1.0,
        grass_dmg REAL DEFAULT 1.0,
        ice_dmg REAL DEFAULT 1.0,
        fighting_dmg REAL DEFAULT 1.0,
        poison_dmg REAL DEFAULT 1.0,
        ground_dmg REAL DEFAULT 1.0,
        flying_dmg REAL DEFAULT 1.0,
        psychic_dmg REAL DEFAULT 1.0,
        bug_dmg REAL DEFAULT 1.0,
        rock_dmg REAL DEFAULT 1.0,
        ghost_dmg REAL DEFAULT 1.0,
        dragon_dmg REAL DEFAULT 1.0,
        dark_dmg REAL DEFAULT 1.0,
        steel_dmg REAL DEFAULT 1.0,
        fairy_dmg REAL DEFAULT 1.0,
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

      -- Added tables for Pokemon Types and Interactions
      CREATE TABLE IF NOT EXISTS types (
        type_id INTEGER PRIMARY KEY AUTOINCREMENT,
        type_name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS pokemon_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pokemon_id INTEGER NOT NULL, -- Assumes PokeAPI ID or similar external ID
        type_id INTEGER NOT NULL,
        FOREIGN KEY (type_id) REFERENCES types(type_id) ON DELETE CASCADE,
        UNIQUE (pokemon_id, type_id)
      );

      CREATE TABLE IF NOT EXISTS type_interactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        attacking_type_id INTEGER NOT NULL,
        defending_type_id INTEGER NOT NULL,
        multiplier REAL NOT NULL, -- e.g., 2.0, 0.5, 0.0, 1.0
        FOREIGN KEY (attacking_type_id) REFERENCES types(type_id) ON DELETE CASCADE,
        FOREIGN KEY (defending_type_id) REFERENCES types(type_id) ON DELETE CASCADE,
        UNIQUE (attacking_type_id, defending_type_id)
      );
    `);

    // Check if admin user exists
    const adminUser = await db.get('SELECT * FROM users WHERE username = ?', ['admin']);

    // Create admin user if it doesn't exist using crypto
    if (!adminUser) {
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync('admin123', salt, 100000, 64, 'sha512').toString('hex');

      await db.run(
        'INSERT INTO users (username, email, password_hash, salt, address, is_admin) VALUES (?, ?, ?, ?, ?, ?)',
        ['admin', 'admin@rotomii.com', hash, salt, '123 Admin St', 1]
      );
    }
  } finally {
    if (db) {
      await db.close();
    }
  }
}

module.exports = setupDb;
