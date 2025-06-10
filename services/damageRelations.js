const pokeApiService = require('./pokeapi');

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

async function calculatePokemonDamageRelations(pokemonId) {
  try {
    const pokemon = await pokeApiService.getPokemon(pokemonId);

    const damageMultipliers = {};
    POKEMON_TYPES.forEach((type) => {
      damageMultipliers[`${type}_dmg`] = 1.0;
    });

    for (const typeData of pokemon.types) {
      const typeName = typeData.type.name;
      const typeEffectiveness = await pokeApiService.getTypeData(typeName);

      typeEffectiveness.damage_relations.double_damage_from.forEach((attackingType) => {
        const key = `${attackingType.name}_dmg`;
        if (damageMultipliers[key] !== undefined) {
          damageMultipliers[key] *= 2.0;
        }
      });

      typeEffectiveness.damage_relations.half_damage_from.forEach((attackingType) => {
        const key = `${attackingType.name}_dmg`;
        if (damageMultipliers[key] !== undefined) {
          damageMultipliers[key] *= 0.5;
        }
      });

      typeEffectiveness.damage_relations.no_damage_from.forEach((attackingType) => {
        const key = `${attackingType.name}_dmg`;
        if (damageMultipliers[key] !== undefined) {
          damageMultipliers[key] = 0.0;
        }
      });
    }

    return damageMultipliers;
  } catch (error) {
    console.error(`Error calculating damage relations for Pokemon ${pokemonId}:`, error);
    throw error;
  }
}

function calculateTeamWeaknessScores(teamPokemon) {
  const teamScores = {};

  POKEMON_TYPES.forEach((type) => {
    teamScores[type] = 0;
  });

  teamPokemon.forEach((pokemon) => {
    POKEMON_TYPES.forEach((type) => {
      const damageKey = `${type}_dmg`;
      const multiplier = pokemon[damageKey] || 1.0;

      if (multiplier > 1.0) {
        teamScores[type] -= 1;
      } else if (multiplier < 1.0) {
        teamScores[type] += 1;
      }
    });
  });

  return teamScores;
}

function getTeamWeaknesses(teamScores) {
  return Object.keys(teamScores).filter((type) => teamScores[type] < 0);
}

function getTeamResistances(teamScores) {
  return Object.keys(teamScores).filter((type) => teamScores[type] > 0);
}

function getTeamAnalysis(teamPokemon) {
  const scores = calculateTeamWeaknessScores(teamPokemon);
  const weaknesses = getTeamWeaknesses(scores);
  const resistances = getTeamResistances(scores);

  return {
    scores,
    weaknesses,
    resistances,
    summary: {
      totalWeaknesses: weaknesses.length,
      totalResistances: resistances.length,
      overallBalance: resistances.length - weaknesses.length
    }
  };
}

module.exports = {
  calculatePokemonDamageRelations,
  calculateTeamWeaknessScores,
  getTeamWeaknesses,
  getTeamResistances,
  getTeamAnalysis,
  POKEMON_TYPES
};
