export function changeThemeForType(type) {
    const returnButton = document.querySelector('.returnButton');
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
        if (returnButton) {
            returnButton.style.color = 'white';
        }
    } else if (type === 'dragon') {
        document.documentElement.style.setProperty('--background', '#e9ebbc');
        document.documentElement.style.setProperty('--foreground', '#fffff5');
        document.body.style.color = 'black';
    } else if (type === 'dark') {
        document.documentElement.style.setProperty('--background', '#404040');
        document.documentElement.style.setProperty('--foreground', '#b3b3b3');
        document.body.style.color = 'white';
        if (returnButton != null) {
            returnButton.style.color = 'white';
        }
    } else if (type === 'fairy') {
        document.documentElement.style.setProperty('--background', '#f56ed1');
        document.documentElement.style.setProperty('--foreground', '#ffdef6');
        document.body.style.color = 'black';
    } else {
        document.documentElement.style.setProperty('--background', '#B60102');
        document.documentElement.style.setProperty('--foreground', '#ffe5e6');
        document.body.style.color = 'white';
        if (returnButton != null) {
            returnButton.style.color = 'white';
        }
    }
}