const express = require('express');
const router = express.Router();

// TODO: Implement Pokemon search and detail routes (Kristian)
// - Search route using PokeAPI
// - Route to get details for a specific Pokemon

router.get('/search', (req, res) => {
  res.json({ message: 'Pokemon search endpoint (Kristian to implement)' });
});

router.get('/nameslist', async (req, res) => {
  try {
    const pokemonData = await fetch('https://pokeapi.co/api/v2/pokemon-form/?limit=1527');
    const pokemonDataJson = await pokemonData.json();

    let namesArray = [];
    for (let i = 0; i < pokemonDataJson.results.length ; i++){
      namesArray.push(pokemonDataJson.results[i].name);
    }

    res.json(namesArray);
  } catch(error) {
    res.status(500).json({ error: 'PokeAPI request failed.' });
  }
});

router.get('/:pokemonId', async (req, res) => {
  try {
    const pokemonData = await fetch('https://pokeapi.co/api/v2/pokemon/' + req.params.pokemonId);
    const pokemonDataJson = await pokemonData.json();
    res.json(pokemonDataJson);

  } catch(error) {
    res.status(500).json({ error: 'PokeAPI request failed.' });
  }
});



module.exports = router;
