const express = require('express');
const router = express.Router();
const pokeApiService = require('../services/pokeapi');

// TODO: Implement Pokemon search and detail routes (Kristian)
// - Search route using PokeAPI
// - Route to get details for a specific Pokemon

router.get('/search', (req, res) => {
  res.json({ message: 'Pokemon search endpoint (Kristian to implement)' });
});

router.get('/nameslist', async (req, res) => {
  try {
    const namesArray = await pokeApiService.getPokemonNames();
    res.json(namesArray);
  } catch(error) {
    res.status(500).json({ error: 'PokeAPI request failed.' });
  }
});

router.get('/:pokemonId', async (req, res) => {
  try {
    const pokemonData = await pokeApiService.getPokemon(req.params.pokemonId);
    res.json(pokemonData);
  } catch(error) {
    res.status(500).json({ error: 'PokeAPI request failed.' });
  }
});



module.exports = router;
