async function getMon() {
    try {
        const pokename = document.getElementById('pokemonName').value.toLowerCase();

        // console.log('https://pokeapi.co/api/v2/pokemon/' + pokename);
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
        console.log("okay so this doesn't work yet. finding it hard to get to the actual type");
        console.log("api returns the type as an array of object with the object containing another object");
        console.log("kind of like array:key:key:type so idk yet how to navigate objects within objects");
        console.log("will look into it as soon as i can");


    }
    catch(error){
        console.error(error);
    }
}