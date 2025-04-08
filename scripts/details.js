// This import from "theme.js" is used to help change colors
// depending on which type is chosen
import { changeThemeForType } from './theme.js';

const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

const detailUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

// This function fetches all the pokemon information needed (id)
async function getPokemonDetail() {
    if (!pokemonId) {
        return;
    }

    const response = await fetch(detailUrl);
    if (response.ok) {
        const data = await response.json();
        displayPokemonDetails(data);
    } else {
        console.error('Failed to fetch Pokémon details');
    }
}

// This function fetches the pokemon move details
async function fetchMoveDetails(moveUrl) {
    const response = await fetch(moveUrl);
    if (response.ok) {
        const moveData = await response.json();
        return moveData;
    } else {
        console.error('Failed to fetch move details');
        return null;
    }
}

// This function fetches the old pokemon cries
async function getLegacyPokemonCry(pokemonId) {
    const cryUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    const response = await fetch(cryUrl);
    if (response.ok) {
        const data = await response.json();
        const cry = data.cries;
        return cry.legacy;
    } else {
        console.error('Failed to fetch Pokémon cry');
        return null;
    }
}

// This function fetches the latest pokemon cries
async function getLatestPokemonCry(pokemonId) {
    const cryUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    const response = await fetch(cryUrl);
    if (response.ok) {
        const data = await response.json();
        const cry = data.cries;
        return cry.latest;
    } else {
        console.error('Failed to fetch Pokémon cry');
        return null;
    }
}

//////////////////* Pokemon Detail Cards *//////////////////////

// This is the function that creates the entire details page body
async function displayPokemonDetails(pokemonData) {
    const container = document.querySelector('#pokemonDetailContainer');

    const pokemonType = pokemonData.types[0].type.name;

    changeThemeForType(pokemonType);

    const header = document.createElement('header');
    header.classList.add('detailsHeader');
    container.appendChild(header);

    const darkModeButton = document.createElement('button');
    darkModeButton.textContent = 'Dark Mode';
    darkModeButton.setAttribute('id', 'darkMode');
    darkModeButton.classList.add('detailButtons');
    header.appendChild(darkModeButton);

    // This line checks if dark mode is enabled in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // This function toggles dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');

        const currentMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', currentMode);

        darkModeButton.textContent = currentMode ? 'Light Mode' : 'Dark Mode';
    }

    // This conditional statement changes the button text
    // whenever light or dark mode is selected
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeButton.textContent = 'Light Mode';
    } else {
        darkModeButton.textContent = 'Dark Mode';
    }

    darkModeButton.addEventListener('click', toggleDarkMode);

    // This line creates favorite button to add a pokemon to favorites
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = 'Add to Favorites';
    favoriteButton.classList.add('detailButtons');
    favoriteButton.onclick = () => addToFavorites(pokemonData);
    header.appendChild(favoriteButton);

    // This line creates and displays pokemon names
    const name = document.createElement('h1');
    const nameCap = pokemonData.name.replace(/\b\w/g, char => char.toUpperCase());
    name.textContent = nameCap;
    header.appendChild(name);

    // This line creates view favorite button to view favorite pokemon
    const viewFavorites = document.createElement('button');
    viewFavorites.textContent = 'View Your Favorite Pokémon';
    viewFavorites.setAttribute('id', 'viewFavoritesbutton');
    viewFavorites.classList.add('detailButtons');
    header.appendChild(viewFavorites)

    viewFavorites.addEventListener('click', navigateToFavorites);

    // This line creates pokedex button to view that pokemons
    // official pokedex information
    const pokedexButton = document.createElement('button');
    pokedexButton.textContent = 'View Pokédex Entry';
    pokedexButton.classList.add('detailButtons');
    pokedexButton.addEventListener('click', () => {
        const pokedexUrl = `https://pokemondb.net/pokedex/${pokemonData.name}`;
        window.open(pokedexUrl, '_blank');
    });

    header.appendChild(pokedexButton);

    // This line creates a "return to types" button
    const returnTypesButton = document.createElement('button');
    returnTypesButton.textContent = 'Return to Types';
    returnTypesButton.classList.add('detailButtons');
    container.appendChild(returnTypesButton)

    returnTypesButton.addEventListener('click', navigateToHome);

    // This line creates and displays the front sprite
    const sprites = pokemonData.sprites;
    const frontDefaultImg = createSpriteImage(sprites.front_default, 'Front Default');
    if (frontDefaultImg) {
        container.appendChild(frontDefaultImg);
    }

    // This line creates and displays the back sprite
    const backDefaultImg = createSpriteImage(sprites.back_default, 'Back Default');
    if (backDefaultImg) {
        container.appendChild(backDefaultImg);
    }

    // This line creates and displays the shiny front sprite
    const shinyFrontImg = createSpriteImage(sprites.front_shiny, 'Shiny Front');
    if (shinyFrontImg) {
        container.appendChild(shinyFrontImg);
    }

    // This line creates and displays the shiny back sprite
    const shinyBackImg = createSpriteImage(sprites.back_shiny, 'Shiny Back');
    if (shinyBackImg) {
        container.appendChild(shinyBackImg);
    }

    // This line displays pokemon details for the details page
    const types = pokemonData.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ');
    const typesDiv = document.createElement('div');
    typesDiv.classList.add('typetextarea');
    const typesP = document.createElement('h2');
    typesP.textContent = `Type(s): ${types}`;
    container.appendChild(typesDiv);
    typesDiv.appendChild(typesP);

    // this line fetches and displays abilities
    const abilities = pokemonData.abilities;
    const abilityPromises = abilities.map(async ability => {
        const abilityDetails = await fetchAbilityDetails(ability.ability.url);
        const capitalizedAbilityName = ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1);
        const abilityDiv = document.createElement('p');
        abilityDiv.innerHTML = `Ability: ${capitalizedAbilityName}<br>Effect: ${abilityDetails.effect}`;
        typesDiv.appendChild(abilityDiv);
    });

    // this line allows dom to wait for all abilities to be displayed
    await Promise.all(abilityPromises);

    const movesDiv = document.createElement('div');
    movesDiv.classList.add('pokemon-moves');

    for (const move of pokemonData.moves.slice(0, 10)) {
        const moveData = await fetchMoveDetails(move.move.url);
        if (moveData) {
            const moveDiv = document.createElement('div');
            moveDiv.classList.add('pokemon-move');

            const moveName = document.createElement('h2');
            moveName.textContent = move.move.name.replace(/\b\w/g, char => char.toUpperCase());
            moveDiv.appendChild(moveName);

            const moveType = moveData.type.name;
            const moveTypeElement = document.createElement('p');
            moveTypeElement.textContent = `Type: ${moveType}`;
            moveDiv.appendChild(moveTypeElement);

            const movePower = moveData.power || 'N/A';
            const movePowerElement = document.createElement('p');
            movePowerElement.textContent = `Power: ${movePower}`;
            moveDiv.appendChild(movePowerElement);

            const moveAccuracy = moveData.accuracy || 'N/A';
            const moveAccuracyElement = document.createElement('p');
            moveAccuracyElement.textContent = `Accuracy: ${moveAccuracy}`;
            moveDiv.appendChild(moveAccuracyElement);

            const moveDescription = moveData.effect_entries.find(entry => entry.language.name === 'en')?.effect || 'No description available';
            const moveDescriptionElement = document.createElement('p');
            moveDescriptionElement.textContent = `Description: ${moveDescription}`;
            moveDiv.appendChild(moveDescriptionElement);

            movesDiv.appendChild(moveDiv);
        }
    }

    const criesDiv = document.createElement('div')
    criesDiv.classList.add('criesDiv');

    // This line creates the old pokemon cry button
    const cryButtonLegacy = document.createElement('button');
    cryButtonLegacy.textContent = 'Hear Old Pokémon Cry';
    cryButtonLegacy.classList.add('detailButtons', 'criesButton');
    cryButtonLegacy.onclick = async () => {
        const cryUrl = await getLegacyPokemonCry(pokemonData.id);
        if (cryUrl) {
            const audio = new Audio(cryUrl);
            audio.play();
        } else {
            alert('Sorry, the Pokémon cry is not available.');
        }
    };

    criesDiv.appendChild(cryButtonLegacy);

    // This line creates the latest pokemon cry button
    const cryButtonLatest = document.createElement('button');
    cryButtonLatest.textContent = 'Hear New Pokémon Cry';
    cryButtonLatest.classList.add('detailButtons', 'criesButton');
    cryButtonLatest.onclick = async () => {
        const cryUrl = await getLatestPokemonCry(pokemonData.id);
        if (cryUrl) {
            const audio = new Audio(cryUrl);
            audio.play();
        } else {
            alert('Sorry, the Pokémon cry is not available.');
        }
    };

    criesDiv.appendChild(cryButtonLatest);

    container.appendChild(criesDiv);

    const movesTitle = document.createElement('h1');
    movesTitle.textContent = 'Top 10 Moves:';
    container.appendChild(movesTitle);

    container.appendChild(movesDiv);

    const speciesUrl = pokemonData.species.url;
    const evolutionChainData = await getEvolutionChain(speciesUrl);
    const addedEvolutions = new Set();

    const evolutionTitle = document.createElement('h1');
    evolutionTitle.textContent = 'Evolution:';
    container.appendChild(evolutionTitle);

    // This conditional statement was created to help
    // make pokemon evolutions accurate by calling and
    // using the processEvolutionChain function
    if (evolutionChainData) {
        const evolutionContainer = document.createElement('div');
        evolutionContainer.classList.add('evolution-chain');

        let currentStage = evolutionChainData.chain;

        // This conditional statement checks if the pokemon can evolve or not
        if (!currentStage.evolves_to || currentStage.evolves_to.length === 0) {
            const noEvolutionMessage = document.createElement('p');
            noEvolutionMessage.textContent = `${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)} does not evolve.`;
            evolutionContainer.appendChild(noEvolutionMessage);
        } else {
            await processEvolutionChain(currentStage, evolutionContainer, addedEvolutions);
        }

        container.appendChild(evolutionContainer);
    }
}

//////////////////////////////////////////

//////////////////* Miscellaneous *//////////////////////

// This function was created to help make Pokemon chains
// accurate, because there are pokemon out there with many
// evolutions when compared to others (Eevee was mainly the cause
// of issues, because Eevee has 8 evolutions in total)
async function processEvolutionChain(evolutionStep, container, addedEvolutions) {
    // This line skips the evolution if already added to avoid duplicates
    if (addedEvolutions.has(evolutionStep.species.name)) {
        return;
    }

    const evolutionStepDiv = document.createElement('div');
    evolutionStepDiv.classList.add('evolution-step');

    const pokemonId = evolutionStep.species.url.split('/')[6];
    const evolutionSpriteUrl = await getPokemonSprite(pokemonId);

    // This line adds the evolution step to the container 
    // if the sprite exists
    if (evolutionSpriteUrl) {
        const evolutionSprite = document.createElement('img');
        evolutionSprite.src = evolutionSpriteUrl;
        evolutionSprite.alt = evolutionStep.species.name;
        evolutionSprite.classList.add('pokemon-evolution-sprite');
        evolutionStepDiv.appendChild(evolutionSprite);

        const evolutionName = document.createElement('span');
        evolutionName.textContent = evolutionStep.species.name.charAt(0).toUpperCase() + evolutionStep.species.name.slice(1);
        evolutionStepDiv.appendChild(evolutionName);

        evolutionStepDiv.addEventListener('click', () => {
            window.location.href = `card-detail.html?id=${pokemonId}`;
        });

        // This line marks the evolution as added to, again, avoid duplicates
        addedEvolutions.add(evolutionStep.species.name);

        container.appendChild(evolutionStepDiv);
    }

    // This line checks if there are any more evolutions to add
    if (evolutionStep.evolves_to && evolutionStep.evolves_to.length > 0) {
        for (const nextEvolution of evolutionStep.evolves_to) {
            await processEvolutionChain(nextEvolution, container, addedEvolutions);
        }
    }
}

// This function grabs detailed ability info
async function fetchAbilityDetails(abilityUrl) {
    const response = await fetch(abilityUrl);
    if (response.ok) {
        const abilityData = await response.json();
        return {
            effect: abilityData.effect_entries.find(entry => entry.language.name === 'en')?.effect || 'No description available',
        };
    } else {
        console.error('Failed to fetch ability details');
        return { effect: 'No description available' };
    }
}

// This function creates pokemon images and utilizes lazy load
function createSpriteImage(src, alt) {
    if (!src) return null;
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add('pokemon-sprite');
    img.loading = 'lazy';
    return img;
}

// This function adds pokemon to favorites usong local storage
function addToFavorites(pokemonData) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const favoritePokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        sprite: pokemonData.sprites.front_default,
    };

    // This line checks for pokemon in the favorites already to prevent duplicates
    const isAlreadyFavorite = favorites.some(fav => fav.id === pokemonData.id);
    if (!isAlreadyFavorite) {
        favorites.push(favoritePokemon);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${pokemonData.name} has been added to your favorites!`);
    } else {
        alert(`${pokemonData.name} already exists in your favorites.`);
    }
}

// This function leads the user to the favorites page
function navigateToFavorites() {
    window.location.href = 'favorites.html';
}

// This function leads the user to the home page
function navigateToHome() {
    window.location.href = 'index.html';
}

// This function grabs the data needed for the evolution chain
async function getEvolutionChain(pokemonSpeciesUrl) {
    const response = await fetch(pokemonSpeciesUrl);
    if (response.ok) {
        const speciesData = await response.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionChainResponse = await fetch(evolutionChainUrl);
        if (evolutionChainResponse.ok) {
            const evolutionChainData = await evolutionChainResponse.json();
            return evolutionChainData;
        }
    }
    console.error('Failed to fetch evolution chain');
    return null;
}

// This function grabs the pokemon sprites
async function getPokemonSprite(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
    if (response.ok) {
        const pokemonData = await response.json();
        return pokemonData.sprites.front_default;
    }
    return null;
}

//////////////////////////////////////////

getPokemonDetail();