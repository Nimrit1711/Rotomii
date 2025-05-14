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

function calculateTypeInteraction(pokemonType) {
    let typeDefenses = {
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
    };

    if (pokemonType.length > 1) {
        let type0 = typeInteraction[pokemonType[0]].defenseMultiplier;
        let type1 = typeInteraction[pokemonType[1]].defenseMultiplier;

        for (let key in typeDefenses){
            if (typeof typeDefenses[key] == 'number'){
            typeDefenses[key] = type0[key] * type1[key];
            }
        }
    } else {
        typeDefenses = typeInteraction[pokemonType[0]].defenseMultiplier;
    }

    return typeDefenses;
}

function determineWeaknesses(defenses){
    let weakArray = [];
        for (let key in defenses){
            if (typeof defenses[key] == 'number'){
                if (defenses[key] > 1) {
                    weakArray.push(key);
                }
            }
        }
    return weakArray;
}

function determineResistances(defenses){
    let resistArray = [];
        for (let key in defenses){
            if (typeof defenses[key] == 'number'){
                if (defenses[key] < 1 && defenses[key] > 0) {
                    resistArray.push(key);
                }
            }
        }
    return resistArray;
}

function determineImmunities(defenses){
    let immuneArray = [];
        for (let key in defenses){
            if (typeof defenses[key] == 'number'){
                if (defenses[key] === 0) {
                    immuneArray.push(key);
                }
            }
        }
    return immuneArray;
}



function findPokemon(_slotNum) {
    const slotDiv = document.getElementById(_slotNum);
    const resultDiv = slotDiv.querySelector('#results');
    resultDiv.style.display = "none";
    const officialArtElement = slotDiv.querySelector('#pokemon-art');
    officialArtElement.src = '/images/loading-placeholder.gif';

    const pokemonName = slotDiv.querySelector('#pokemon-name-input').value.toLowerCase();

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = async function (){
        if (this.readyState === 4 && this.status === 200){
            const thisPokemon = JSON.parse(this.response);

            const pokemonOfficialArt = thisPokemon.sprites.other["official-artwork"].front_default;
            const pokemonTypeRaw = thisPokemon.types;
            const pokemonType = [];
            for (let i = 0; i < pokemonTypeRaw.length ; i++){
                pokemonType.push(pokemonTypeRaw[i].type.name);
            }

            /* THESE PARTS AFTER AREN'T RELATED TO THE API SEARCH FUNCTION */

            /* CALCULATE DEFENSES */
            const typeDefenses = calculateTypeInteraction(pokemonType);
            const defWeaknesses = determineWeaknesses(typeDefenses);
            const defResistances = determineResistances(typeDefenses);
            const defImmunities = determineImmunities(typeDefenses);

            /* UPDATE POKEMON ART ELEMENT */
            officialArtElement.src = pokemonOfficialArt;


            const typeP = slotDiv.querySelector('#paragraph-1');
            typeP.innerText = pokemonName + "'s typing:";
            const listType = slotDiv.querySelector('#typing');
            listType.innerHTML = ""; // clear the list element
            for (let i = 0; i < pokemonTypeRaw.length ; i++){
                const node = document.createElement('li');
                node.innerText = pokemonType[i];
                listType.appendChild(node);
            }

            /* TYPE INTERACTIONS */
            const p2 = slotDiv.querySelector('#paragraph-2');
            p2.innerText = pokemonName + " is weak against:";
            const listWeak = slotDiv.querySelector('#weaknesses');
            listWeak.innerHTML = ""; // clear the list element
            for (let i = 0; i < defWeaknesses.length; i++){
                const node = document.createElement('li');
                node.innerText = defWeaknesses[i];
                listWeak.appendChild(node);
            }

            const p3 = slotDiv.querySelector('#paragraph-3');
            p3.innerText = pokemonName + " is resistant to:";
            const listResist = slotDiv.querySelector('#resistances');
            listResist.innerHTML = ""; // clear the list element
            for (let i = 0; i < defResistances.length; i++){
                const node = document.createElement('li');
                node.innerText = defResistances[i];
                listResist.appendChild(node);
            }

            const p4 = slotDiv.querySelector('#paragraph-4');
            const listImmune = slotDiv.querySelector('#immunities');
            listImmune.innerHTML = ""; // clear the list element
            if (defImmunities.length > 0){
                p4.innerText = pokemonName + " is immune to:";
                for (let i = 0; i < defImmunities.length; i++){
                    const node = document.createElement('li');
                    node.innerText = defImmunities[i];
                    listImmune.appendChild(node);
                }
            } else {
                p4.innerText = pokemonName + " has not immunities.";
            }

            resultDiv.style.display = "block";
        }
    };
    xhttp.open("GET", "/pokemon/" + pokemonName, true);
    xhttp.send();
}

/* CATCH BUTTON CALL */


const catch1 = document.getElementById('slot-1').querySelector('button');
catch1.addEventListener('click', () => {
    findPokemon('slot-1');
});
const catch2 = document.getElementById('slot-2').querySelector('button');
catch2.addEventListener('click', () => {
    findPokemon('slot-2');
});
const catch3 = document.getElementById('slot-3').querySelector('button');
catch3.addEventListener('click', () => {
    findPokemon('slot-3');
});
const catch4 = document.getElementById('slot-4').querySelector('button');
catch4.addEventListener('click', () => {
    findPokemon('slot-4');
});
const catch5 = document.getElementById('slot-5').querySelector('button');
catch5.addEventListener('click', () => {
    findPokemon('slot-5');
});
const catch6 = document.getElementById('slot-6').querySelector('button');
catch6.addEventListener('click', () => {
    findPokemon('slot-6');
});