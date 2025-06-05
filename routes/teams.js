const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const getDb = require('../models/db');

// TODO: Implement Team management routes (Madeleine/Alex)
// - Create new team
// - Get user's teams
// - Get specific team details (with Pokemon)
// - Add/Remove Pokemon from team
// - Update team notes/name
// - Delete team
// - Maybe update Pokemon details within a team (nickname, notes)

router.get('/', isAuthenticated, async (req, res) => {
  const db = await getDb();
  try {
    const userId = req.user.user_id;
    console.log(req.session.user);
    console.log(userId);
    const teamGet = await db.all(`SELECT * FROM teams WHERE user_id = ?`, [userId]);
    const teams = [];
    for (const team of teamGet) {
      const pokemonRows = await db.all(`
        SELECT team_pokemon.position, team_pokemon.nickname, pokemon.name team_pokemon_id
        FROM team_pokemon tp
        JOIN pokemon p ON team_pokemon.pokemon_id = pokemon.id
        WHERE team_pokemon.team_id = ?
        ORDER BY team_pokemon.position ASC
        `, [team.team_id]);
        const pokemon = [];
        for (let i=0; i<6; i++){
          const poke = pokemonRows.find((p) => p.position === i +1);
          if (poke) {
            pokemon.push({
              name: poke.name,
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
  }
  });


router.post('/', isAuthenticated, (req, res) => {
  res.json({ message: 'Create new team (Madeleine/Alex to implement)' });
});

router.get('/:teamId', isAuthenticated, (req, res) => {
  res.json({ message: `Get team ${req.params.teamId} details (Madeleine/Alex to implement)` });
});

router.post('/:teamId/pokemon', isAuthenticated, (req, res) => {
    res.json({ message: `Add Pokemon to team ${req.params.teamId} (Madeleine/Alex to implement)` });
});

router.delete('/:teamId/pokemon/:position', isAuthenticated, (req, res) => {
    res.json({ message: `Remove Pokemon at position ${req.params.position} from team ${req.params.teamId} (Madeleine/Alex to implement)` });
});

// Add more routes for team modifications...

module.exports = router;
