import { updateCaughtCounter } from './utils.js';

const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const favoritesContainer = document.querySelector('#favoritesContainer');

// This function removes pokemon from the favorites page
function removeFromFavorites(pokemonId, favDiv) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.id !== pokemonId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    favDiv.remove();

    if (favorites.length === 0) {
        displayEmptyMessage();
    }
}

// This function displays an empty favorites message
function displayEmptyMessage() {
    const existingMessage = document.querySelector('.empty-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    favoritesContainer.innerHTML = '';

    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Your favorites list is empty. Please add some Pokémon!';
    emptyMessage.classList.add('empty-message');
    favoritesContainer.appendChild(emptyMessage);
}

// This conditional statement displays each favorite pokemon
// and checks if there are no favorite pokemon added
if (favorites.length === 0) {
    displayEmptyMessage();
} else {
    favorites.forEach(async (fav) => {

        const favDiv = document.createElement('div');
        favDiv.classList.add('favorite-card');

        const link = document.createElement('a');
        link.href = `./card-detail.html?id=${fav.id}`;

        const favName = document.createElement('h2');
        const favNameCap = fav.name.replace(/\b\w/g, char => char.toUpperCase());
        favName.textContent = favNameCap;
        favDiv.appendChild(favName);

        const favSprite = createSpriteImage(fav.sprite, 'Favorite Sprite');
        if (favSprite) {
            favDiv.appendChild(favSprite);
        }

        link.appendChild(favDiv);

        // This line creates the remove favorite pokemon button
        // while also preventing the user from triggering the anchor
        // link when removing the pokemon
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Favorites';

        removeButton.onclick = (event) => {
            event.preventDefault();

            removeFromFavorites(fav.id, favDiv);
        };
        favDiv.appendChild(removeButton);

        favoritesContainer.appendChild(link);
    });
}

// This function checks to make sure an image is available and uses lazy loading
function createSpriteImage(src, alt) {
    if (!src) return null;
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.classList.add('pokemon-sprite');
    img.loading = 'lazy';
    return img;
}

const returnToTypesButton = document.querySelector('#returnToTypesButton');

returnToTypesButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

/* ---------------------------Dark Mode----------------------------- */

const darkModeButton = document.getElementById('darkMode');

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

/* -------------------------------------------------------- */

updateCaughtCounter()