const url = "https://pokeapi.co/api/v2/pokemon?limit=100000";
let results = null;
let selectedType = null;
let debounceTimeout;

// consts for grabbing ID's in HTML
const returnButton = document.getElementById('returnButton');
const pokemonDisplayContainer = document.getElementById('pokemonDisplayContainer');
const typesContainer = document.querySelector('.typesContainer');
const pokemonDisplay = document.getElementById('pokemonDisplay');
const searchBar = document.getElementById('searchBar');

// Function for fetching Pokémon URL
async function getPokemon(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        pokemonCards(data);
    }
}

// Function for filtering Pokémon names with search bar
function filterPokemonByName(query) {
    if (!results) return [];

    const filteredResults = results.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    return filteredResults;
}

// Function for displaying Pokémon data
function pokemonCards(data) {
    results = data;

    // Just like the event listener further below, this
    // conditional statement shows and hides certain elements
    // on the HTML page
    if (!selectedType) {
        typesContainer.classList.remove('hidden');
        pokemonDisplayContainer.style.display = 'none';
        returnButton.classList.add('hidden');
        searchBar.classList.add('hidden');
    }
    else {
        typesContainer.classList.add('hidden');
        pokemonDisplayContainer.style.display = 'block';
        returnButton.classList.remove('hidden');
        searchBar.classList.remove('hidden');
    }

    pokemonDisplay.innerHTML = '';

    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const filteredResults = filterPokemonByName(searchQuery);

    filteredResults.forEach((pokemon) => {
        fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
                const pokemonTypes = pokemonData.types.map(type => type.type.name);
                if (!pokemonTypes.includes(selectedType)) {
                    return;
                }

                const div = document.createElement('div');
                div.classList.add('pokemonCard');

                const p = document.createElement('p');
                const pCap = pokemon.name.replace(/\b\w/g, char => char.toUpperCase());
                p.textContent = pCap;
                div.appendChild(p);

                const imgUrl = pokemonData.sprites.front_default;
                if (imgUrl && imgUrl !== "null") {
                    const img = document.createElement('img');
                    img.setAttribute('src', imgUrl);
                    img.setAttribute('alt', pokemon.name);
                    img.setAttribute('loading', 'lazy');
                    div.appendChild(img);
                }

                document.getElementById('pokemonDisplay').appendChild(div);
            })
            .catch(error => console.error("Error fetching Pokémon details:", error));
    });
}

// Event listener for selecting Pokémon types
typesContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        selectedType = event.target.alt.toLowerCase();
        console.log("Selected Type: ", selectedType);

        getPokemon(url);
    }
});

// Event listener for search bar debounce
// (to help reduce lag when displaying Pokémon)
searchBar.addEventListener('input', () => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        getPokemon(url);
    }, 300);
});

// Event listener for showing and hiding certain elements
// when the types are interacted with
returnButton.addEventListener('click', () => {
    typesContainer.classList.remove('hidden');
    pokemonDisplayContainer.style.display = 'none';
    returnButton.classList.add('hidden');
    searchBar.classList.add('hidden');
    selectedType = null;
    pokemonDisplay.innerHTML = '';
});

getPokemon(url);