let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');

let xhr = new XMLHttpRequest();
xhr.onload = function () {
    const character = JSON.parse(this.response);
    const container = document.getElementById('character-container');
    const img = document.createElement('img');
    img.src = character.image;
    container.appendChild(img);
    const h1 = document.createElement('h1');
    h1.textContent = character.name;
    container.appendChild(h1);
    const status = document.createElement('p');
    status.innerHTML = `<strong>Status:</strong> ${character.status}`;
    container.appendChild(status);
    const species = document.createElement('p');
    species.innerHTML = `<strong>Species:</strong> ${character.species}`;
    container.appendChild(species);
    const gender = document.createElement('p');
    gender.innerHTML = `<strong>Gender:</strong> ${character.gender}`;
    container.appendChild(gender);
    const origin = document.createElement('p');
    origin.innerHTML = `<strong>Origin:</strong> ${character.origin.name}`;
    container.appendChild(origin);
    const location = document.createElement('p');
    location.innerHTML = `<strong>Location:</strong> ${character.location.name}`;
    container.appendChild(location);
    const episodes = document.createElement('p');
    episodes.innerHTML = `<strong>Episodes:</strong> `;
    // обращаюсь к полю episode у персонажа, вытаскиваю url эпизода и делаю туда запрос чтобы получит
    // эпизод и его название
    character.episode.forEach(function (episodeUrl) {
        let getEpisode = new XMLHttpRequest();
        getEpisode.onload = function () {
            const episode = JSON.parse(this.response);
            episodes.innerHTML += `${episode.episode} (${episode.name}), `;
        }
        getEpisode.open('GET', episodeUrl, true);
        getEpisode.send();
    });
    container.appendChild(episodes);
}
xhr.open('GET', `https://rickandmortyapi.com/api/character/${id}`, true);
xhr.send();
