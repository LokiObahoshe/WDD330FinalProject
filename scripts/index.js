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
        returnButton.style.color = 'black';
    }

    changeThemeForType(selectedType);

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

                const link = document.createElement('a');
                link.href = `./card-detail.html?id=${pokemonData.id}`;
                link.classList.add('pokemonCardLink');

                const div = document.createElement('div');
                div.classList.add('pokemonCard');
                link.appendChild(div);

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

                document.getElementById('pokemonDisplay').appendChild(link);
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
    searchBar.value = '';

    document.documentElement.style.setProperty('--background', '#B60102');
    document.documentElement.style.setProperty('--foreground', '#ffe5e6');
    document.body.style.color = 'white';
});

function changeThemeForType(type) {
    if (type === 'water') {
        document.documentElement.style.setProperty('--background', '#4f72d1');
        document.documentElement.style.setProperty('--foreground', '#d1e5f1');
        document.body.style.color = 'black';
    } else if (type === 'grass') {
        document.documentElement.style.setProperty('--background', '#4fd169');
        document.documentElement.style.setProperty('--foreground', '#d1f1df');
        document.body.style.color = 'black';
    } else if (type === 'electric') {
        document.documentElement.style.setProperty('--background', '#eef567');
        document.documentElement.style.setProperty('--foreground', '#f7faed');
        document.body.style.color = 'black';
    } else if (type === 'normal' || type === 'steel') {
        document.documentElement.style.setProperty('--background', '#a8a8a8');
        document.documentElement.style.setProperty('--foreground', '#f2f2f2');
        document.body.style.color = 'black';
    } else if (type === 'ice') {
        document.documentElement.style.setProperty('--background', '#5efff4');
        document.documentElement.style.setProperty('--foreground', '#e0fcff');
        document.body.style.color = 'black';
    } else if (type === 'fighting') {
        document.documentElement.style.setProperty('--background', '#f7ae40');
        document.documentElement.style.setProperty('--foreground', '#fff5e6');
        document.body.style.color = 'black';
    } else if (type === 'poison') {
        document.documentElement.style.setProperty('--background', '#a44bdb');
        document.documentElement.style.setProperty('--foreground', '#f9f0ff');
        document.body.style.color = 'black';
    } else if (type === 'ground') {
        document.documentElement.style.setProperty('--background', '#b38054');
        document.documentElement.style.setProperty('--foreground', '#d9cfc7');
        document.body.style.color = 'black';
    } else if (type === 'flying') {
        document.documentElement.style.setProperty('--background', '#abcedb');
        document.documentElement.style.setProperty('--foreground', '#e9f1f5');
        document.body.style.color = 'black';
    } else if (type === 'psychic') {
        document.documentElement.style.setProperty('--background', '#d951e8');
        document.documentElement.style.setProperty('--foreground', '#f0c6f5');
        document.body.style.color = 'black';
    } else if (type === 'bug') {
        document.documentElement.style.setProperty('--background', '#92e89e');
        document.documentElement.style.setProperty('--foreground', '#d5f5d9');
        document.body.style.color = 'black';
    } else if (type === 'rock') {
        document.documentElement.style.setProperty('--background', '#a3a293');
        document.documentElement.style.setProperty('--foreground', '#f2f2e9');
        document.body.style.color = 'black';
    } else if (type === 'ghost') {
        document.documentElement.style.setProperty('--background', '#80359c');
        document.documentElement.style.setProperty('--foreground', '#d6bae0');
        document.body.style.color = 'white';
        returnButton.style.color = 'white';
    } else if (type === 'dragon') {
        document.documentElement.style.setProperty('--background', '#e9ebbc');
        document.documentElement.style.setProperty('--foreground', '#fffff5');
        document.body.style.color = 'black';
    } else if (type === 'dark') {
        document.documentElement.style.setProperty('--background', '#404040');
        document.documentElement.style.setProperty('--foreground', '#b3b3b3');
        document.body.style.color = 'white';
        returnButton.style.color = 'white';
    } else if (type === 'fairy') {
        document.documentElement.style.setProperty('--background', '#f56ed1');
        document.documentElement.style.setProperty('--foreground', '#ffdef6');
        document.body.style.color = 'black';
        returnButton.style.color = 'black';
    } else {
        document.documentElement.style.setProperty('--background', '#B60102');
        document.documentElement.style.setProperty('--foreground', '#ffe5e6');
        document.body.style.color = 'white';
        returnButton.style.color = 'white';
    }
}

getPokemon(url);