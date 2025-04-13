const express = require('express');
const router = express.Router();

// TODO: Implement Pokemon search and detail routes (Kristian)
// - Search route using PokeAPI
// - Route to get details for a specific Pokemon

router.get('/search', (req, res) => {
  res.json({ message: 'Pokemon search endpoint (Kristian to implement)' });
});

router.get('/:pokemonId', (req, res) => {
  res.json({ message: `Get Pokemon details for ${req.params.pokemonId} (Kristian to implement)` });
});

module.exports = router;
