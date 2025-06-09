const express = require('express');
const router = express.Router();
const {
 isAuthenticated, validateTeam, validatePokemon, validateNumericId
} = require('../middleware/auth');
const getDb = require('../models/db');
const Team = require('../models/team');
const pokeApiService = require('../services/pokeapi');

// API endpoint to get user teams (for dropdowns, etc.)
router.get('/api/list', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const teams = await Team.getUserTeams(userId);
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

router.get('/', isAuthenticated, async (req, res) => {
  let db;
  try {
    db = await getDb();
    const userId = req.user.user_id;
    const teamGet = await db.all(`SELECT * FROM teams WHERE user_id = ?`, [userId]);
    const teams = [];
    for (const team of teamGet) {
      const pokemonRows = await db.all(`
        SELECT position, nickname, pokemon_id
        FROM team_pokemon
        WHERE team_id = ?
        ORDER BY position ASC
        `, [team.team_id]);
        const pokemon = [];
        for (let i=0; i<6; i++){
          const poke = pokemonRows.find((p) => p.position === i +1);
          if (poke) {
            pokemon.push({
              name: poke.pokemon_id,
              nickname: poke.nickname,
              spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.pokemon_id}.png`
            });
          } else {
            pokemon.push(null);
          }
        }

        teams.push({
          id: team.team_id,
          nickname: team.team_name,
          pokemon
        });
    }

    res.render('teams', { teams });
  } catch (err) {
    res.status(500).send('Error fetching teams');
  } finally {
    if (db) {
      await db.close();
    }
  }
});

// Render team creation page
router.get('/create', isAuthenticated, (req, res) => {
  res.render('team-create');
});


// Create new team
router.post('/', isAuthenticated, validateTeam, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { teamName, notes } = req.body;

    const teamId = await Team.createTeam(userId, teamName, notes);
    res.status(201).json({
      success: true,
      teamId,
      message: 'Team created successfully'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create team' });
  }
});

// Render team detail page
router.get('/:teamId(\\d+)', isAuthenticated, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = req.user.user_id;

    const team = await Team.getTeamById(teamId);

    if (!team) {
      return res.status(404).send('Team not found');
    }

    // Check if the team belongs to the requesting user
    if (team.user_id !== userId) {
      return res.status(403).send('Unauthorized access to this team');
    }

    // Format the Pokemon data for the view
    const pokemon = [];
    for (let i = 1; i <= 6; i++) {
      const poke = team.pokemon.find((p) => p.position === i);
      if (poke) {
        pokemon.push({
          position: i,
          id: poke.pokemon_id,
          nickname: poke.nickname,
          notes: poke.custom_notes,
          spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.pokemon_id}.png`
        });
      } else {
        pokemon.push(null);
      }
    }

    res.render('team-detail', {
      team: {
        ...team,
        pokemon
      }
    });
  } catch (err) {
    res.status(500).send('Error loading team details');
  }
});

// Get specific team details
router.get('/:teamId', isAuthenticated, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = req.user.user_id;

    const team = await Team.getTeamById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Check if the team belongs to the requesting user
    if (team.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this team' });
    }

    res.json({
      success: true,
      team
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team details' });
  }
});

// Add Pokemon by ID to team (for search results)
router.post('/:teamId/add-pokemon', isAuthenticated, validateNumericId('teamId'), async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = req.user.user_id;
    const { pokemonId, nickname } = req.body;

    // Check if the team belongs to the user
    const team = await Team.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    if (team.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this team' });
    }

    // Find the first available position
    const existingPokemon = team.pokemon || [];
    let position = 1;
    for (let i = 1; i <= 6; i++) {
      if (!existingPokemon.find((p) => p.position === i)) {
        position = i;
        break;
      }
    }

    // Check if team is full
    if (existingPokemon.length >= 6) {
      return res.status(400).json({ error: 'Team is full (maximum 6 Pokemon)' });
    }

    // Add Pokemon to team
    const pokemonEntryId = await Team.addPokemonToTeam(
      teamId,
      position,
      parseInt(pokemonId, 10),
      nickname || ''
    );

    res.json({
      success: true,
      pokemonEntryId,
      position,
      message: 'Pokemon added to team successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to add Pokemon to team' });
  }
});

// Add/Update Pokemon in team
router.post('/:teamId/pokemon', isAuthenticated, validateNumericId('teamId'), validatePokemon, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = req.user.user_id;
    const {
 position, pokemonName, nickname, notes
} = req.body;

    // Check if the team belongs to the user
    const team = await Team.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    if (team.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this team' });
    }

    // Get name to ID map
    const nameToIdMap = await pokeApiService.getNameToIdMap();

    // Validate Pokémon name exists
    if (!nameToIdMap[pokemonName]) {
      return res.status(400).json({ error: `Invalid Pokémon name: ${pokemonName}` });
    }

    const pokemonId = nameToIdMap[pokemonName];

    // Add Pokemon to team
    const pokemonEntryId = await Team.addPokemonToTeam(
      teamId,
      parseInt(position, 10),
      pokemonId,
      nickname || '',
      notes || ''
    );

    // After adding Pokemon, check if we need a new blank team
    const teams = await Team.getUserTeams(userId);
    let blankTeamCount = 0;

    for (const userTeam of teams) {
      const pokemonCount = await Team.countPokemonInTeam(userTeam.team_id);
      if (pokemonCount === 0 && (userTeam.team_name === 'My Team' || userTeam.team_name === '')) {
        blankTeamCount++;
      }
    }

    // If no blank teams exist, create one
    if (blankTeamCount === 0) {
      await Team.createTeam(userId, 'My Team', '');
    }

    res.json({
      success: true,
      pokemonEntryId,
      message: 'Pokemon added to team successfully',
      pokemonId
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to add Pokemon to team' });
  }
});

// Remove Pokemon from team
router.delete('/:teamId/pokemon/:position', isAuthenticated, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const position = parseInt(req.params.position, 10);
    const userId = req.user.user_id;

    // Check if the team belongs to the user
    const team = await Team.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    if (team.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this team' });
    }

    // Remove Pokemon from team
    const success = await Team.removePokemonFromTeam(teamId, position);

    if (success) {
      // After removing Pokemon, check for duplicate blank teams
      const teams = await Team.getUserTeams(userId);
      const blankTeams = [];

      for (const userTeam of teams) {
        const pokemonCount = await Team.countPokemonInTeam(userTeam.team_id);
        if (pokemonCount === 0 && (userTeam.team_name === 'My Team' || userTeam.team_name === '')) {
          blankTeams.push(userTeam);
        }
      }

      // If we have more than one blank team, delete the extras
      if (blankTeams.length > 1) {
        // Keep the first blank team, delete the rest
        for (let i = 1; i < blankTeams.length; i++) {
          await Team.deleteTeam(blankTeams[i].team_id);
        }
      }

      res.json({
        success: true,
        message: 'Pokemon removed from team successfully'
      });
    } else {
      res.status(404).json({ error: 'Pokemon not found at this position' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove Pokemon from team' });
  }
});

// Update team name/notes
router.put('/:teamId', isAuthenticated, validateNumericId('teamId'), validateTeam, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = req.user.user_id;
    const { team_name, notes } = req.body;

    // Check if the team belongs to the user
    const team = await Team.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    if (team.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this team' });
    }

    // Update team
    const updates = {};
    if (team_name !== undefined) updates.team_name = team_name;
    if (notes !== undefined) updates.notes = notes;

    const success = await Team.updateTeam(teamId, updates);

    if (success) {
      res.json({
        success: true,
        message: 'Team updated successfully'
      });
    } else {
      res.status(400).json({ error: 'No valid fields to update' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update team' });
  }
});

// Delete team
router.delete('/:teamId', isAuthenticated, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = req.user.user_id;

    // Check if the team belongs to the user
    const team = await Team.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    if (team.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this team' });
    }

    // Check if this is the user's last team
    const allTeams = await Team.getUserTeams(userId);
    if (allTeams.length === 1) {
      return res.status(400).json({ error: 'Cannot delete your last team' });
    }

    // Delete team
    const success = await Team.deleteTeam(teamId);

    if (success) {
      // After deleting, ensure user still has a blank team
      const remainingTeams = await Team.getUserTeams(userId);
      let hasBlankTeam = false;

      for (const userTeam of remainingTeams) {
        const pokemonCount = await Team.countPokemonInTeam(userTeam.team_id);
        if (pokemonCount === 0 && (userTeam.team_name === 'My Team' || userTeam.team_name === '')) {
          hasBlankTeam = true;
          break;
        }
      }

      // If no blank team exists after deletion, create one
      if (!hasBlankTeam) {
        await Team.createTeam(userId, 'My Team', '');
      }

      res.json({
        success: true,
        message: 'Team deleted successfully'
      });
    } else {
      res.status(500).json({ error: 'Failed to delete team' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

// Get team Pokemon count
router.get('/:teamId/count', isAuthenticated, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = req.user.user_id;

    // Check if the team belongs to the user
    const team = await Team.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    if (team.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this team' });
    }

    const count = await Team.countPokemonInTeam(teamId);

    res.json({
      success: true,
      count
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to count Pokemon in team' });
  }
});

// Get team weakness/resistance analysis
router.get('/:teamId/analysis', isAuthenticated, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = req.user.user_id;

    // Check if the team belongs to the user
    const team = await Team.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    if (team.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this team' });
    }

    const analysis = await Team.getTeamAnalysis(teamId);

    res.json({
      success: true,
      analysis
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get team analysis' });
  }
});

// Get just team weaknesses
router.get('/:teamId/weaknesses', isAuthenticated, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = req.user.user_id;

    // Check if the team belongs to the user
    const team = await Team.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    if (team.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this team' });
    }

    const weaknesses = await Team.getTeamWeaknesses(teamId);

    res.json({
      success: true,
      weaknesses
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get team weaknesses' });
  }
});

// Get just team resistances
router.get('/:teamId/resistances', isAuthenticated, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = req.user.user_id;

    // Check if the team belongs to the user
    const team = await Team.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    if (team.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this team' });
    }

    const resistances = await Team.getTeamResistances(teamId);

    res.json({
      success: true,
      resistances
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get team resistances' });
  }
});

module.exports = router;
