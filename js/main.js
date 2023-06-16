const $hamburger = document.querySelector('.hamburger-menu');
const $backPokeball = document.querySelector('.pokeball-hamburger');

$hamburger.addEventListener('click', function () {
  $hamburger.classList.toggle('change');
  $backPokeball.classList.toggle('spin');
});

const $pokemonCards = document.querySelector('.pokemon-cards');
let kantoRegion = [];

function renderCards(id, name) {
  const $columnSixth = document.createElement('div');
  $columnSixth.className = 'column-sixth';
  $pokemonCards.appendChild($columnSixth);

  const $pokemonCard = document.createElement('div');
  $pokemonCard.className = 'pokemon-card flex';
  $columnSixth.appendChild($pokemonCard);

  const $pokemonName = document.createElement('h4');
  $pokemonName.className = 'pokemon-name';
  $pokemonName.textContent = capitalizeName(name);
  $pokemonCard.appendChild($pokemonName);

  const $pokemonBackground = document.createElement('div');
  $pokemonBackground.className = 'pokemon-background';
  $pokemonCard.appendChild($pokemonBackground);

  const $pokemonImg = document.createElement('img');
  $pokemonImg.className = 'pokemon-img';
  if (id < 10) {
    $pokemonImg.setAttribute('src', '/images/assets/images/00' + id + '.png');
  } else if (id < 100) {
    $pokemonImg.setAttribute('src', '/images/assets/images/0' + id + '.png');
  } else if (id >= 100) {
    $pokemonImg.setAttribute('src', '/images/assets/images/' + id + '.png');
  }
  $pokemonBackground.appendChild($pokemonImg);

  const $pokemonID = document.createElement('h5');
  $pokemonID.className = 'pokemon-id';
  if (id < 10) {
    $pokemonID.textContent = '#00' + id;
  } else if (id < 100) {
    $pokemonID.textContent = '#0' + id;
  } else if (id >= 100) {
    $pokemonID.textContent = '#' + id;
  }

  $pokemonCard.appendChild($pokemonID);
}

function generatePokemonCards() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokedex/kanto');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    kantoRegion = xhr.response.pokemon_entries;
    for (let i = 0; i < kantoRegion.length; i++) {
      const pokemonId = kantoRegion[i].entry_number;
      const pokemonName = kantoRegion[i].pokemon_species.name;
      renderCards(pokemonId, pokemonName);
    }
  });
  xhr.send();
}

window.addEventListener('load', generatePokemonCards);

function capitalizeName(string) {
  let name = '';
  if (string.includes('-')) {
    const splitName = string.split('-');
    const firstName = splitName[0].charAt(0).toUpperCase() + splitName[0].substring(1);
    const secondName = splitName[1].charAt(0).toUpperCase() + splitName[1].substring(1);
    name = firstName + '-' + secondName;
  } else {
    name = string[0].toUpperCase() + string.substring(1);
  }
  return name;
}
