/**
 * PokeAPI Service
 * This file helps us get Pokemon data from the PokeAPI
 * Created by Kristian Sorono (a1809029)
 */

// Base URL for the PokeAPI
const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

// Basic fetch function for getting data from the API
async function fetchFromPokeAPI(endpoint) {
  const response = await fetch(`${POKE_API_BASE_URL}${endpoint}`);

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  // Parse the JSON response
  return response.json();
}

// All the functions for interacting with the PokeAPI
const pokeApiService = {
  // Get a specific Pokemon by name or ID
  getPokemon: async (nameOrId) => {
    // Make sure the name is lowercase for the API
    const search = String(nameOrId).toLowerCase();
    return fetchFromPokeAPI(`/pokemon/${search}`);
  },

  // Get a list of Pokemon with pagination
  getPokemonList: async (limit = 20, offset = 0) => fetchFromPokeAPI(`/pokemon?limit=${limit}&offset=${offset}`),

  // Get data about a specific Pokemon type
  getTypeData: async (type) => {
    const typeName = String(type).toLowerCase();
    return fetchFromPokeAPI(`/type/${typeName}`);
  },

  // Get Pokemon that are a specific type
  getPokemonByType: async (type) => {
    const typeData = await pokeApiService.getTypeData(type);

    // Extract just the Pokemon names and URLs from the response
    // This makes it easier to use in our application
    return typeData.pokemon.map((entry) => ({
      name: entry.pokemon.name,
      url: entry.pokemon.url
    }));
  },

  // Search for Pokemon by name (partial match)
  // TODO: Make this function search more Pokemon than just 100
  // It would be better to use a real API endpoint but the PokeAPI doesn't support search
  searchPokemonByName: async (name, limit = 20) => {
    // Get a list of Pokemon to search through
    const response = await fetchFromPokeAPI('/pokemon?limit=100');
    const searchName = String(name).toLowerCase();

    // Filter the Pokemon list to find matches
    const matches = response.results
      .filter((pokemon) => pokemon.name.includes(searchName))
      .slice(0, limit);

    return matches;
  },

  // Get all Pokemon names (for autocomplete/search features)
  getPokemonNames: async () => {
    const response = await fetchFromPokeAPI('/pokemon-form/?limit=1527');
    return response.results.map((pokemon) => pokemon.name);
  },

  // Get Pokemon ID by name
  getNameToIdMap: async () => {
    const response = await fetchFromPokeAPI('/pokemon?limit=1527');
    const nameToIdMap = {};

    response.results.forEach((pokemon) => {
      // Extract ID from URL (e.g., 'https://pokeapi.co/api/v2/pokemon/25/')
      const id = pokemon.url.split('/').filter((part) => part).pop();
      if (id && !isNaN(id)) {
        nameToIdMap[pokemon.name] = parseInt(id, 10);
      }
    });

    return nameToIdMap;
  },

  // Enhanced search function for Pokemon
  searchPokemon: async (query, limit = 20) => {
    const response = await fetchFromPokeAPI('/pokemon?limit=1527');
    const searchQuery = String(query).toLowerCase();

    const matches = response.results
      .filter((pokemon) => pokemon.name.includes(searchQuery))
      .slice(0, limit)
      .map((pokemon) => {
        const id = pokemon.url.split('/').filter((part) => part).pop();
        return {
          id: parseInt(id, 10),
          name: pokemon.name,
          url: pokemon.url
        };
      });

    return matches;
  },
  searchPokemonByType: async (type) => {
  const rawResults = await pokeApiService.getPokemonByType(type);

  return rawResults.map((p) => {
    const idMatch = p.url.match(/\/pokemon\/(\d+)\//);
    const id = idMatch ? parseInt(idMatch[1], 10) : null;
    return { id, name: p.name };
  });
}
};

module.exports = pokeApiService;
