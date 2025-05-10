function findPokemon() {
    const pokemonName = document.getElementById('pokemon-name-input').value.toLowerCase();

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = async function (){
        if (this.readyState === 4 && this.status === 200){
            const thisPokemon = JSON.parse(this.response);

            const pokemonSprite = thisPokemon.sprites.front_default;
            const pokemonBoxSprite = thisPokemon.sprites.versions['generation-viii'].icons.front_default;
            const pokemonOfficialArt = thisPokemon.sprites.other["official-artwork"].front_default;
            const pokemonType = thisPokemon.types;
            /*  pokemonType contains an array of json objects. To get the 'name' of the type
                go through pokemonType[i].type.name
            */

            /* poketest.html specific */
            const resultDiv = document.getElementById('results');
            resultDiv.style.display = "block";

            const typeP = document.getElementById('paragraph-1');
            typeP.innerText = pokemonName + "'s typing:";
            for (let i = 0; i < pokemonType.length; i++){
                const node = document.getElementById('type-' + i);
                node.style.display = "block";
                node.innerText = pokemonType[i].type.name;
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