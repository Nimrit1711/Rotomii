const getDb = require('./db');

// Team model for handling Pokemon teams
class Team {
  // Create a new team for a user
  static async createTeam(userId, teamName, notes = '') {
    const db = await getDb();
    try {
      // Insert new team into database
      const result = await db.run(
        'INSERT INTO teams (team_name, user_id, notes) VALUES (?, ?, ?)',
        [teamName, userId, notes]
      );
      return result.lastID;
    } finally {
      await db.close();
    }
  }

  // Get a specific team with all its Pokemon
  static async getTeamById(teamId) {
    const db = await getDb();
    try {
      // Get the team information
      const team = await db.get('SELECT * FROM teams WHERE team_id = ?', [teamId]);

      // If team doesn't exist, return null
      if (!team) {
        return null;
      }

      // Get all Pokemon in this team
      const pokemon = await db.all(
        'SELECT * FROM team_pokemon WHERE team_id = ? ORDER BY position',
        [teamId]
      );

      // Return team info with its Pokemon
      return {
        ...team,
        pokemon
      };
    } finally {
      await db.close();
    }
  }

  // Get all teams for a specific user
  static async getUserTeams(userId) {
    const db = await getDb();
    try {
      // Get all teams that belong to this user
      return await db.all('SELECT * FROM teams WHERE user_id = ?', [userId]);
    } finally {
      await db.close();
    }
  }

  // Update team information (name and notes)
  static async updateTeam(teamId, updates) {
    const db = await getDb();
    try {
      // Only allow updating these fields
      const validFields = ['team_name', 'notes'];
      const setClause = [];
      const values = [];

      // Build the SQL update statement
      for (const key in updates) {
        if (validFields.includes(key)) {
          setClause.push(`${key} = ?`);
          values.push(updates[key]);
        }
      }

      // If nothing to update, return false
      if (setClause.length === 0) return false;

      // Add teamId to the values and execute update
      values.push(teamId);
      await db.run(
        `UPDATE teams SET ${setClause.join(', ')} WHERE team_id = ?`,
        values
      );

      return true;
    } finally {
      await db.close();
    }
  }

  // Delete a team and all its Pokemon
  static async deleteTeam(teamId) {
    const db = await getDb();
    try {
      // Delete the team
      const result = await db.run('DELETE FROM teams WHERE team_id = ?', [teamId]);
      return result.changes > 0;
    } finally {
      await db.close();
    }
  }

  // Add or update a Pokemon in a team
  static async addPokemonToTeam(teamId, position, pokemonId, nickname = '', notes = '') {
    const db = await getDb();
    try {
      // Check if the position is valid (1-6)
      if (position < 1 || position > 6) {
        throw new Error('Position must be between 1 and 6');
      }

      // Make sure the team exists
      const team = await db.get('SELECT * FROM teams WHERE team_id = ?', [teamId]);
      if (!team) {
        throw new Error('Team not found');
      }

      // Check if there's already a Pokemon in this position
      const existingPokemon = await db.get(
        'SELECT * FROM team_pokemon WHERE team_id = ? AND position = ?',
        [teamId, position]
      );

      // If position is already taken, update that Pokemon instead of adding a new one
      if (existingPokemon) {
        await db.run(
          'UPDATE team_pokemon SET pokemon_id = ?, nickname = ?, custom_notes = ? WHERE team_id = ? AND position = ?',
          [pokemonId, nickname, notes, teamId, position]
        );
        return existingPokemon.id;
      }
        // Add new Pokemon to the team
        const result = await db.run(
          'INSERT INTO team_pokemon (team_id, position, pokemon_id, nickname, custom_notes) VALUES (?, ?, ?, ?, ?)',
          [teamId, position, pokemonId, nickname, notes]
        );
        return result.lastID;

    } finally {
      await db.close();
    }
  }

  // Remove a Pokemon from a team
  static async removePokemonFromTeam(teamId, position) {
    const db = await getDb();
    try {
      const result = await db.run(
        'DELETE FROM team_pokemon WHERE team_id = ? AND position = ?',
        [teamId, position]
      );
      return result.changes > 0;
    } finally {
      await db.close();
    }
  }

  // Count how many Pokemon are in a team
  static async countPokemonInTeam(teamId) {
    const db = await getDb();
    try {
      const result = await db.get(
        'SELECT COUNT(*) as count FROM team_pokemon WHERE team_id = ?',
        [teamId]
      );
      return result.count;
    } finally {
      await db.close();
    }
  }
}

module.exports = Team;
