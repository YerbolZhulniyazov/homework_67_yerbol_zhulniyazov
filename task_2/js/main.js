const container = document.getElementById('container');
let page = 1;
const pageNumber = document.getElementById('page-number');
const nextPage = document.getElementById('next-page');
const previousPage = document.getElementById('previous-page');
function getCharacters(page) {
    let xhr = new XMLHttpRequest();
    // page нужен чтобы обратиться к странице и вытащит персонажей на данной странице,
    // results чтобы вытащит информацию о персонаже
    xhr.onload = function () {
        const characters = JSON.parse(this.response).results;
        showCharacters(characters);
        pageNumber.textContent = page;
    }
    xhr.open('GET', `https://rickandmortyapi.com/api/character?page=${page}`, true);
    xhr.send();
}

function showCharacters(characters) {
    container.innerHTML = '';
    characters.forEach(function (character) {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        img.src = character.image;
        card.appendChild(img);
        const h2 = document.createElement('h2');
        h2.textContent = character.name;
        card.appendChild(h2);
        img.addEventListener('click', function () {
            window.location.href = 'character.html?id=' + character.id;
        });
        container.appendChild(card);
    });
}

// При переходе с одной страницы на другую все действия повторяються заново
nextPage.addEventListener('click', function () {
    page++;
    getCharacters(page);
    previousPage.disabled = false;
});

previousPage.addEventListener('click', function () {
    if (page > 1) {
        page--;
        getCharacters(page);
        nextPage.disabled = false;
        if (page === 1) {
            previousPage.disabled = true;
        }
    }
});

//  Для первоначального получения информации
getCharacters(page);
