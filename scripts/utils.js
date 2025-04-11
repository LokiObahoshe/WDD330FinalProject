/* ---------------------------Pokemon Counter----------------------------- */

export function updateCaughtCounter() {
    let count = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('caught-') && localStorage.getItem(key) === 'true') {
            count++;
        }
    }

    const counterElement = document.getElementById('caughtCounter');
    if (counterElement) {
        counterElement.textContent = `Caught: ${count} Pokémon`;
    }
}

/* -------------------------------------------------------- */

/* ---------------------------Theme----------------------------- */

export function changeThemeForType(type) {
    const returnButton = document.querySelector('#returnButton');
    const h1 = document.querySelector('h1');

    // This function allows all the color palets from
    // the "changeThemeForType" function to avoid
    // overriding dark mode
    if (document.body.classList.contains('dark-mode')) {
        return;
    }

    if (!type && h1) {
        h1.style.color = 'white';
        return;
    }

    // If the types choosen are ghost or dark, make h1 white
    if (type === 'ghost' || type === 'dark') {

        // This timeout was added so that the dynamically
        // loaded h1 colors in the details page will also correctly
        // be affected by types choosen
        setTimeout(() => {
            const h1 = document.querySelector('h1');
            if (h1) {
                h1.style.color = 'white';
            }
        }, 1);

    }

    // If the types choosen are not ghost or dark, make h1 black
    if (type !== 'ghost' && type !== 'dark' && h1) {
        h1.style.color = 'black';
    }

    if (type === 'water') {
        document.documentElement.style.setProperty('--background', '#8ea8ed');
        document.documentElement.style.setProperty('--foreground', '#d1e5f1');
    } else if (type === 'grass') {
        document.documentElement.style.setProperty('--background', '#4fd169');
        document.documentElement.style.setProperty('--foreground', '#d1f1df');
    } else if (type === 'electric') {
        document.documentElement.style.setProperty('--background', '#eef567');
        document.documentElement.style.setProperty('--foreground', '#f7faed');
    } else if (type === 'normal' || type === 'steel') {
        document.documentElement.style.setProperty('--background', '#a8a8a8');
        document.documentElement.style.setProperty('--foreground', '#f2f2f2');
    } else if (type === 'ice') {
        document.documentElement.style.setProperty('--background', '#5efff4');
        document.documentElement.style.setProperty('--foreground', '#e0fcff');
    } else if (type === 'fighting') {
        document.documentElement.style.setProperty('--background', '#f7ae40');
        document.documentElement.style.setProperty('--foreground', '#fff5e6');
    } else if (type === 'poison') {
        document.documentElement.style.setProperty('--background', '#be7be8');
        document.documentElement.style.setProperty('--foreground', '#f9f0ff');
    } else if (type === 'ground') {
        document.documentElement.style.setProperty('--background', '#c9986d');
        document.documentElement.style.setProperty('--foreground', '#d9cfc7');
    } else if (type === 'flying') {
        document.documentElement.style.setProperty('--background', '#abcedb');
        document.documentElement.style.setProperty('--foreground', '#e9f1f5');
    } else if (type === 'psychic') {
        document.documentElement.style.setProperty('--background', '#e06bed');
        document.documentElement.style.setProperty('--foreground', '#f0c6f5');
    } else if (type === 'bug') {
        document.documentElement.style.setProperty('--background', '#92e89e');
        document.documentElement.style.setProperty('--foreground', '#d5f5d9');
    } else if (type === 'rock') {
        document.documentElement.style.setProperty('--background', '#a3a293');
        document.documentElement.style.setProperty('--foreground', '#f2f2e9');
    } else if (type === 'ghost') {
        document.documentElement.style.setProperty('--background', '#80359c');
        document.documentElement.style.setProperty('--foreground', '#d6bae0');
        if (returnButton) {
            returnButton.style.color = 'white';
        }
    } else if (type === 'dragon') {
        document.documentElement.style.setProperty('--background', '#e9ebbc');
        document.documentElement.style.setProperty('--foreground', '#fffff5');
    } else if (type === 'dark') {
        document.documentElement.style.setProperty('--background', '#404040');
        document.documentElement.style.setProperty('--foreground', '#b3b3b3');
        if (returnButton) {
            returnButton.style.color = 'white';
        }
    } else if (type === 'fairy') {
        document.documentElement.style.setProperty('--background', '#f56ed1');
        document.documentElement.style.setProperty('--foreground', '#ffdef6');
    } else if (type === 'fire') {
        document.documentElement.style.setProperty('--background', '#f5775b');
        document.documentElement.style.setProperty('--foreground', '#fff3f0');
    } else {
        document.documentElement.style.setProperty('--background', '#B60102');
        document.documentElement.style.setProperty('--foreground', '#ffe5e6');
    }
}