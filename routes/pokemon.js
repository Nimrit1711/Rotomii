const express = require('express');
const router = express.Router();

// TODO: Implement Pokemon search and detail routes (Kristian)
// - Search route using PokeAPI
// - Route to get details for a specific Pokemon

router.get('/search', (req, res) => {
  res.json({ message: 'Pokemon search endpoint (Kristian to implement)' });
});

router.get('/:pokemonId', async (req, res) => {
  try {
    const pokemonData = await fetch('https://pokeapi.co/api/v2/pokemon/' + req.params.pokemonId);
    const pokemonDataJson = await pokemonData.json();
    res.json(pokemonDataJson);

  } catch(error) {
    res.status(500).json({ error: 'PokeAPI request failed.' });
  }

  /*
  const pokemonData = fetch('https://pokeapi.co/api/v2/pokemon/' + req.params.pokemonId);
  console.log ('https://pokeapi.co/api/v2/pokemon/' + req.params.pokemonId);
  console.log (pokemonData);
  res.send(pokemonData);
  */
});

module.exports = router;
