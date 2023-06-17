const $hamburger = document.querySelector('.hamburger-menu');
const $backPokeball = document.querySelector('.pokeball-hamburger');

$hamburger.addEventListener('click', function () {
  $hamburger.classList.toggle('change');
  $backPokeball.classList.toggle('spin');
});

const $kantoRegion = document.querySelector('.kanto-region');
const $johtoRegion = document.querySelector('.johto-region');
const $hoennRegion = document.querySelector('.hoenn-region');
const $sinnohRegion = document.querySelector('.sinnoh-region');
const $unovaRegion = document.querySelector('.unova-region');
const $kalosRegion = document.querySelector('.kalos-region');
const $alolaRegion = document.querySelector('.alola-region');
const $galarRegion = document.querySelector('.galar-region');

let allPokemon = [];

function renderCards(id, name) {
  const $columnSixth = document.createElement('div');
  const $pokemonCard = document.createElement('div');
  const $pokemonName = document.createElement('h4');
  const $pokemonBackground = document.createElement('div');
  const $pokemonImg = document.createElement('img');
  const $pokemonID = document.createElement('h5');

  $columnSixth.className = 'column-sixth';
  $pokemonCard.className = 'pokemon-card flex';
  $pokemonName.className = 'pokemon-name';
  $pokemonBackground.className = 'pokemon-background';
  $pokemonImg.className = 'pokemon-img';
  $pokemonID.className = 'pokemon-id';

  if (id >= 1 && id <= 151) {
    $kantoRegion.appendChild($columnSixth);
  } else if (id >= 152 && id <= 251) {
    $johtoRegion.appendChild($columnSixth);
  } else if (id >= 252 && id <= 386) {
    $hoennRegion.appendChild($columnSixth);
  } else if (id >= 387 && id <= 493) {
    $sinnohRegion.appendChild($columnSixth);
  } else if (id >= 494 && id <= 649) {
    $unovaRegion.appendChild($columnSixth);
  } else if (id >= 650 && id <= 721) {
    $kalosRegion.appendChild($columnSixth);
  } else if (id >= 722 && id <= 809) {
    $alolaRegion.appendChild($columnSixth);
  } else if (id >= 810 && id <= 905) {
    $galarRegion.appendChild($columnSixth);
  }

  $columnSixth.appendChild($pokemonCard);

  $pokemonName.textContent = capitalizeName(name);
  $pokemonCard.appendChild($pokemonName);

  $pokemonCard.appendChild($pokemonBackground);

  if (id < 10) {
    $pokemonImg.setAttribute('src', '/images/assets/images/00' + id + '.png');
  } else if (id < 100) {
    $pokemonImg.setAttribute('src', '/images/assets/images/0' + id + '.png');
  } else if (id >= 100) {
    $pokemonImg.setAttribute('src', '/images/assets/images/' + id + '.png');
  }
  $pokemonBackground.appendChild($pokemonImg);

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
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokedex/1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    allPokemon = xhr.response.pokemon_entries;
    for (let i = 0; i < allPokemon.length; i++) {
      const pokemonId = allPokemon[i].entry_number;
      const pokemonName = allPokemon[i].pokemon_species.name;
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
