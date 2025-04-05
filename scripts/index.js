// This import from "theme.js" is used to help change colors
// depending on which type is chosen
import { changeThemeForType } from './theme.js';

let results = null;
let selectedType = null;
let debounceTimeout;
const detailUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000";

// consts for grabbing ID's in HTML
const returnButton = document.getElementById('returnButton');
const pokemonDisplayContainer = document.getElementById('pokemonDisplayContainer');
const typesContainer = document.querySelector('.typesContainer');
const pokemonDisplay = document.getElementById('pokemonDisplay');
const searchBar = document.getElementById('searchBar');

// Function for fetching Pokémon URL
async function getPokemonDetail() {
    const response = await fetch(detailUrl);
    if (response.ok) {
        const data = await response.json();
        pokemonCards(data);
    } else {
        console.error('Failed to fetch Pokémon details');
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

// Event listener for selecting Pokemon types
typesContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        selectedType = event.target.alt.toLowerCase();

        getPokemonDetail();
    }
});

// Event listener for search bar debounce
// (to help reduce lag when displaying Pokémon)
searchBar.addEventListener('input', () => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        getPokemonDetail();
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

// This function leads the user to the favorites page
function navigateToFavorites() {
    window.location.href = 'favorites.html';
}

// This line creates an event listener for the favorites button
const viewFavoritesButton = document.getElementById('viewFavoritesbutton');
viewFavoritesButton.addEventListener('click', navigateToFavorites);

getPokemonDetail();