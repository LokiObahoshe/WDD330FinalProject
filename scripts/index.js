const url = "https://pokeapi.co/api/v2/pokemon?limit=100000";
let results = null;

async function getPokemon(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        doStuff(data);
    }
}

function doStuff(data) {
    results = data;
    console.log("first: ", results);

    results.results.forEach((pokemon) => {
        const div = document.createElement('div');
        div.classList.add('pokemonCard');

        const p = document.createElement('p');
        //For capatalizing the Pokemon names
        const pCap = pokemon.name.replace(/\b\w/g, char => char.toUpperCase());
        p.textContent = pCap;
        div.appendChild(p);


        fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
                const img = document.createElement('img');
                img.setAttribute('src', pokemonData.sprites.front_default);
                img.setAttribute('alt', pokemon.name);
                div.appendChild(img);
            })
            .catch(error => console.error("Error fetching Pokémon details:", error));

        pokemonDisplay.appendChild(div);
    });
}

getPokemon(url);