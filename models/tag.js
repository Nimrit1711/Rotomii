const getDb = require('./db');

class Tag {
  static async createTag(userId, tagName) {
    const db = await getDb();
    try {
      const result = await db.run(
        'INSERT INTO tags (tag_name, user_id) VALUES (?, ?)',
        [tagName.toLowerCase().trim(), userId]
      );
      return result.lastID;
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('Tag already exists for this user.');
      }
      throw error;
    } finally {
      if (db) await db.close();
    }
  }

  static async getUserTags(userId) {
    const db = await getDb();
    try {
      return await db.all(
        'SELECT tag_id, tag_name FROM tags WHERE user_id = ? ORDER BY tag_name',
        [userId]
      );
    } finally {
      if (db) await db.close();
    }
  }

  static async tagPokemon(userId, pokemonId, tagName) {
    const db = await getDb();
    try {
      let tagId;
      const existingTag = await db.get(
        'SELECT tag_id FROM tags WHERE tag_name = ? AND user_id = ?',
        [tagName.toLowerCase().trim(), userId]
      );

      if (existingTag) {
        tagId = existingTag.tag_id;
      } else {
        const result = await db.run(
          'INSERT INTO tags (tag_name, user_id) VALUES (?, ?)',
          [tagName.toLowerCase().trim(), userId]
        );
        tagId = result.lastID;
      }

      await db.run(
        'INSERT INTO pokemon_tags (pokemon_id, tag_id) VALUES (?, ?)',
        [pokemonId, tagId]
      );

      return tagId;
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('Pokemon is already tagged with this tag.');
      }
      throw error;
    } finally {
      if (db) await db.close();
    }
  }

  static async untagPokemon(userId, pokemonId, tagName) {
    const db = await getDb();
    try {
      const tag = await db.get(
        'SELECT tag_id FROM tags WHERE tag_name = ? AND user_id = ?',
        [tagName.toLowerCase().trim(), userId]
      );

      if (!tag) {
        throw new Error('Tag not found.');
      }

      const result = await db.run(
        'DELETE FROM pokemon_tags WHERE pokemon_id = ? AND tag_id = ?',
        [pokemonId, tag.tag_id]
      );

      return result.changes > 0;
    } finally {
      if (db) await db.close();
    }
  }

  static async getPokemonTags(userId, pokemonId) {
    const db = await getDb();
    try {
      return await db.all(`
        SELECT t.tag_name 
        FROM tags t
        JOIN pokemon_tags pt ON t.tag_id = pt.tag_id
        WHERE t.user_id = ? AND pt.pokemon_id = ?
        ORDER BY t.tag_name
      `, [userId, pokemonId]);
    } finally {
      if (db) await db.close();
    }
  }

  static async searchPokemonByTags(userId, tagNames) {
    const db = await getDb();
    try {
      const placeholders = tagNames.map(() => '?').join(',');
      const tagNamesLower = tagNames.map((tag) => tag.toLowerCase().trim());

      return await db.all(`
        SELECT DISTINCT pt.pokemon_id
        FROM pokemon_tags pt
        JOIN tags t ON pt.tag_id = t.tag_id
        WHERE t.user_id = ? AND t.tag_name IN (${placeholders})
      `, [userId, ...tagNamesLower]);
    } finally {
      if (db) await db.close();
    }
  }

  static async deleteTag(userId, tagName) {
    const db = await getDb();
    try {
      const result = await db.run(
        'DELETE FROM tags WHERE tag_name = ? AND user_id = ?',
        [tagName.toLowerCase().trim(), userId]
      );
      return result.changes > 0;
    } finally {
      if (db) await db.close();
    }
  }
}

module.exports = Tag;
