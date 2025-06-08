const express = require('express');
const router = express.Router();
const pokeApiService = require('../services/pokeapi');
const Tag = require('../models/tag');
const { isAuthenticated } = require('../middleware/auth');

// TODO: Implement Pokemon search and detail routes (Kristian)
// - Search route using PokeAPI
// - Route to get details for a specific Pokemon

router.get('/search', async (req, res) => {
  try {
    const { q, tags } = req.query;
    let results = [];

    if (tags && req.user) {
      const tagArray = tags.split(',').map((tag) => tag.trim());
      const taggedPokemon = await Tag.searchPokemonByTags(req.user.user_id, tagArray);
      results = taggedPokemon.map((item) => ({ id: item.pokemon_id }));
    }

    if (q) {
      const searchResults = await pokeApiService.searchPokemon(q);
      if (tags && req.user) {
        const taggedIds = results.map((p) => p.id);
        const combinedResults = searchResults.filter((pokemon) => taggedIds.includes(pokemon.id)
          || pokemon.name.toLowerCase().includes(q.toLowerCase()));
        results = combinedResults;
      } else {
        results = searchResults;
      }
    }

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
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

    if (req.user) {
      const tags = await Tag.getPokemonTags(req.user.user_id, req.params.pokemonId);
      pokemonData.userTags = tags.map((tag) => tag.tag_name);
    }

    res.json(pokemonData);
  } catch(error) {
    res.status(500).json({ error: 'PokeAPI request failed.' });
  }
});

router.post('/:pokemonId/tags', isAuthenticated, async (req, res) => {
  try {
    const { tagName } = req.body;
    if (!tagName) {
      return res.status(400).json({ error: 'Tag name is required' });
    }

    await Tag.tagPokemon(req.user.user_id, req.params.pokemonId, tagName);
    res.json({ message: 'Pokemon tagged successfully' });
  } catch (error) {
    if (error.message.includes('already tagged')) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Tag creation error:', error);
    res.status(500).json({ error: 'Failed to tag Pokemon' });
  }
});

router.delete('/:pokemonId/tags', isAuthenticated, async (req, res) => {
  try {
    const { tagName } = req.body;
    if (!tagName) {
      return res.status(400).json({ error: 'Tag name is required' });
    }

    const success = await Tag.untagPokemon(req.user.user_id, req.params.pokemonId, tagName);
    if (success) {
      res.json({ message: 'Tag removed successfully' });
    } else {
      res.status(404).json({ error: 'Tag not found on this Pokemon' });
    }
  } catch (error) {
    console.error('Tag removal error:', error);
    res.status(500).json({ error: 'Failed to remove tag' });
  }
});

router.get('/:pokemonId/tags', isAuthenticated, async (req, res) => {
  try {
    const tags = await Tag.getPokemonTags(req.user.user_id, req.params.pokemonId);
    res.json(tags.map((tag) => tag.tag_name));
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ error: 'Failed to get Pokemon tags' });
  }
});



module.exports = router;
