const typeInteraction = {
    normal: {
        defenseMultiplier: {
            normal: 1,
            fighting: 2,
            flying: 1,
            poison: 1,
            ground: 1,
            rock: 1,
            bug: 1,
            ghost: 0,
            steel: 1,
            fire: 1,
            water: 1,
            grass: 1,
            electric: 1,
            psychic: 1,
            ice: 1,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    fighting: {
        defenseMultiplier: {
            normal: 1,
            fighting: 1,
            flying: 2,
            poison: 1,
            ground: 1,
            rock: 0.5,
            bug: 0.5,
            ghost: 1,
            steel: 1,
            fire: 1,
            water: 1,
            grass: 1,
            electric: 1,
            psychic: 2,
            ice: 1,
            dragon: 1,
            dark: 0.5,
            fairy: 2,
            stellar: 1,
            unknown: 1
        }
    },
    flying: {
        defenseMultiplier: {
            normal: 1,
            fighting: 0.5,
            flying: 1,
            poison: 1,
            ground: 0,
            rock: 2,
            bug: 0.5,
            ghost: 1,
            steel: 1,
            fire: 1,
            water: 1,
            grass: 0.5,
            electric: 2,
            psychic: 1,
            ice: 2,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    poison: {
        defenseMultiplier: {
            normal: 1,
            fighting: 0.5,
            flying: 1,
            poison: 0.5,
            ground: 2,
            rock: 1,
            bug: 0.5,
            ghost: 1,
            steel: 1,
            fire: 1,
            water: 1,
            grass: 0.5,
            electric: 1,
            psychic: 2,
            ice: 1,
            dragon: 1,
            dark: 1,
            fairy: 0.5,
            stellar: 1,
            unknown: 1
        }
    },
    ground: {
        defenseMultiplier: {
            normal: 1,
            fighting: 1,
            flying: 1,
            poison: 0.5,
            ground: 1,
            rock: 0.5,
            bug: 1,
            ghost: 1,
            steel: 1,
            fire: 1,
            water: 2,
            grass: 2,
            electric: 0,
            psychic: 1,
            ice: 2,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    rock: {
        defenseMultiplier: {
            normal: 0.5,
            fighting: 2,
            flying: 0.5,
            poison: 0.5,
            ground: 2,
            rock: 1,
            bug: 1,
            ghost: 1,
            steel: 2,
            fire: 0.5,
            water: 2,
            grass: 2,
            electric: 1,
            psychic: 1,
            ice: 1,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    bug: {
        defenseMultiplier: {
            normal: 1,
            fighting: 0.5,
            flying: 2,
            poison: 1,
            ground: 0.5,
            rock: 2,
            bug: 1,
            ghost: 1,
            steel: 1,
            fire: 2,
            water: 1,
            grass: 0.5,
            electric: 1,
            psychic: 1,
            ice: 1,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    ghost: {
        defenseMultiplier: {
            normal: 0,
            fighting: 0,
            flying: 1,
            poison: 0.5,
            ground: 1,
            rock: 1,
            bug: 0.5,
            ghost: 2,
            steel: 1,
            fire: 1,
            water: 1,
            grass: 1,
            electric: 1,
            psychic: 1,
            ice: 1,
            dragon: 1,
            dark: 2,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    steel: {
        defenseMultiplier: {
            normal: 0.5,
            fighting: 2,
            flying: 0.5,
            poison: 0,
            ground: 2,
            rock: 0.5,
            bug: 0.5,
            ghost: 1,
            steel: 0.5,
            fire: 2,
            water: 1,
            grass: 0.5,
            electric: 1,
            psychic: 0.5,
            ice: 0.5,
            dragon: 0.5,
            dark: 1,
            fairy: 0.5,
            stellar: 1,
            unknown: 1
        }
    },
    fire: {
        defenseMultiplier: {
            normal: 1,
            fighting: 1,
            flying: 1,
            poison: 1,
            ground: 2,
            rock: 2,
            bug: 0.5,
            ghost: 1,
            steel: 0.5,
            fire: 0.5,
            water: 2,
            grass: 0.5,
            electric: 1,
            psychic: 1,
            ice: 0.5,
            dragon: 1,
            dark: 1,
            fairy: 0.5,
            stellar: 1,
            unknown: 1
        }
    },
    water: {
        defenseMultiplier: {
            normal: 1,
            fighting: 1,
            flying: 1,
            poison: 1,
            ground: 1,
            rock: 1,
            bug: 1,
            ghost: 1,
            steel: 0.5,
            fire: 0.5,
            water: 0.5,
            grass: 2,
            electric: 2,
            psychic: 1,
            ice: 0.5,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    grass: {
        defenseMultiplier: {
            normal: 1,
            fighting: 1,
            flying: 2,
            poison: 2,
            ground: 0.5,
            rock: 1,
            bug: 2,
            ghost: 1,
            steel: 1,
            fire: 2,
            water: 0.5,
            grass: 0.5,
            electric: 0.5,
            psychic: 1,
            ice: 2,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    electric: {
        defenseMultiplier: {
            normal: 1,
            fighting: 1,
            flying: 0.5,
            poison: 1,
            ground: 2,
            rock: 1,
            bug: 1,
            ghost: 1,
            steel: 0.5,
            fire: 1,
            water: 1,
            grass: 1,
            electric: 0.5,
            psychic: 1,
            ice: 1,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    psychic: {
        defenseMultiplier: {
            normal: 1,
            fighting: 0.5,
            flying: 1,
            poison: 1,
            ground: 1,
            rock: 1,
            bug: 2,
            ghost: 2,
            steel: 1,
            fire: 1,
            water: 1,
            grass: 1,
            electric: 1,
            psychic: 0.5,
            ice: 1,
            dragon: 1,
            dark: 2,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    ice: {
        defenseMultiplier: {
            normal: 1,
            fighting: 2,
            flying: 1,
            poison: 1,
            ground: 1,
            rock: 2,
            bug: 1,
            ghost: 1,
            steel: 2,
            fire: 2,
            water: 1,
            grass: 1,
            electric: 1,
            psychic: 1,
            ice: 0.5,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    dragon: {
        defenseMultiplier: {
            normal: 1,
            fighting: 1,
            flying: 1,
            poison: 1,
            ground: 1,
            rock: 1,
            bug: 1,
            ghost: 1,
            steel: 1,
            fire: 0.5,
            water: 0.5,
            grass: 0.5,
            electric: 0.5,
            psychic: 1,
            ice: 2,
            dragon: 2,
            dark: 1,
            fairy: 2,
            stellar: 1,
            unknown: 1
        }
    },
    dark: {
        defenseMultiplier: {
            normal: 1,
            fighting: 2,
            flying: 1,
            poison: 1,
            ground: 1,
            rock: 1,
            bug: 2,
            ghost: 0.5,
            steel: 1,
            fire: 1,
            water: 1,
            grass: 1,
            electric: 1,
            psychic: 0,
            ice: 1,
            dragon: 1,
            dark: 0.5,
            fairy: 2,
            stellar: 1,
            unknown: 1
        }
    },
    fairy: {
        defenseMultiplier: {
            normal: 1,
            fighting: 0.5,
            flying: 1,
            poison: 2,
            ground: 1,
            rock: 1,
            bug: 0.5,
            ghost: 1,
            steel: 2,
            fire: 1,
            water: 1,
            grass: 1,
            electric: 1,
            psychic: 1,
            ice: 1,
            dragon: 0,
            dark: 0.5,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    stellar: {
        defenseMultiplier: {
            normal: 1,
            fighting: 1,
            flying: 1,
            poison: 1,
            ground: 1,
            rock: 1,
            bug: 1,
            ghost: 1,
            steel: 1,
            fire: 1,
            water: 1,
            grass: 1,
            electric: 1,
            psychic: 1,
            ice: 1,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    },
    unknown: {
        defenseMultiplier: {
            normal: 1,
            fighting: 1,
            flying: 1,
            poison: 1,
            ground: 1,
            rock: 1,
            bug: 1,
            ghost: 1,
            steel: 1,
            fire: 1,
            water: 1,
            grass: 1,
            electric: 1,
            psychic: 1,
            ice: 1,
            dragon: 1,
            dark: 1,
            fairy: 1,
            stellar: 1,
            unknown: 1
        }
    }
};


function findPokemon() {
    const pokemonName = document.getElementById('pokemon-name-input').value.toLowerCase();

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = async function (){
        if (this.readyState === 4 && this.status === 200){
            const thisPokemon = JSON.parse(this.response);

            const pokemonSprite = thisPokemon.sprites.front_default;
            const pokemonBoxSprite = thisPokemon.sprites.versions['generation-viii'].icons.front_default;
            const pokemonOfficialArt = thisPokemon.sprites.other["official-artwork"].front_default;
            const pokemonTypeRaw = thisPokemon.types;
            const pokemonType = [];
            for (let i = 0; i < pokemonTypeRaw.length ; i++){
                pokemonType.push(pokemonTypeRaw[i].type.name);
            }

            /* poketest.html specific */
            const resultDiv = document.getElementById('results');
            resultDiv.style.display = "block";

            const typeP = document.getElementById('paragraph-1');
            typeP.innerText = pokemonName + "'s typing:";
            for (let i = 0; i < pokemonTypeRaw.length ; i++){
                const node = document.getElementById('type-' + i);
                node.style.display = "block";
                node.innerText = pokemonType[i];
            }

            const officialArtElement = document.getElementById('pokemon-official-art');
            officialArtElement.src = pokemonOfficialArt;

            const spriteElement = document.getElementById('pokemon-sprite');
            spriteElement.src = pokemonSprite;

            const boxSpriteElement = document.getElementById('pokemon-box-sprite');
            boxSpriteElement.src = pokemonBoxSprite;
        }
    };
    xhttp.open("GET", "/pokemon/" + pokemonName, true);
    xhttp.send();
}
