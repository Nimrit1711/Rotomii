/* Code based on and adjusted from
How to FETCH data from an API using JavaScript by Bro Code on Youtube
https://www.youtube.com/watch?v=37vxWr0WgQk */

async function getMon() {
    try {
        const pokename = document.getElementById('pokemon-name-input').value.toLowerCase();

        console.log('https://pokeapi.co/api/v2/pokemon/' + pokename);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokename);

        if (!response.ok){
            throw new Error ('Could not fetch resource');
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        /* This code was supposed to get the "box sprites" for the pokemon but I couldn't get
        the generation-viii identifier to work due to the dash
            const pokemonSprite = data.sprites.versions.generation-viii.icons.front_default;
        */
        const imgElement = document.getElementById('pokemonSprite');

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        /* Code testing for getting Pokemon Type (in array) from API */

        const pokemonType = data.types;

        const typeElement = document.getElementById('pokemonType');
        typeElement.style.display = "block";

        console.log(pokename + "'s typing is: ");
        for (let i = 0; i < pokemonType.length ; i++){
            console.log(pokemonType[i].type.name);
        }

    }
    catch(error){
        console.error(error);
    }
}