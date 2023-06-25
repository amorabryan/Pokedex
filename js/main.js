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
  } else if (id >= 906) {
    return;
  }

  $columnSixth.appendChild($pokemonCard);
  $pokemonCard.setAttribute('id', id);
  $pokemonName.textContent = capitalizeName(name);
  $pokemonCard.appendChild($pokemonName);

  $pokemonCard.appendChild($pokemonBackground);

  if (id < 10) {
    $pokemonImg.setAttribute('src', 'images/assets/images/00' + id + '.png');
  } else if (id < 100) {
    $pokemonImg.setAttribute('src', 'images/assets/images/0' + id + '.png');
  } else if (id >= 100) {
    $pokemonImg.setAttribute('src', 'images/assets/images/' + id + '.png');
  }
  $pokemonImg.setAttribute('alt', name + '-pokemon-photo');
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
    const nationalDex = data.allPokemon;
    data.allPokemon = xhr.response.pokemon_entries;
    for (let i = 0; i < nationalDex.length; i++) {
      const pokemonId = nationalDex[i].entry_number;
      const pokemonName = nationalDex[i].pokemon_species.name;
      renderCards(pokemonId, pokemonName);
    }
  });
  xhr.send();
}

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

function capitalizeGen(string) {
  let gen = '';
  if (string.includes('-')) {
    const splitGen = string.split('-');
    const generation = splitGen[1].toUpperCase();
    gen = generation;
  } return gen;
}

function calculateHeight(number) {
  const height = number / 10;
  const convertHeight = Math.round(height * 10) / 10 + ' m';
  return convertHeight;
}

function calculateWeight(number) {
  const weight = number / 10;
  const convertWeight = Math.round(weight * 10) / 10 + ' kg';
  return convertWeight;
}

function flavorText(string) {
  let output = '';
  output = string.replaceAll('\n', ' ');
  output = output.replaceAll('\f', ' ');
  output = output.replaceAll('POKéMON', 'Pokémon');
  return output;
}

const $filterLaunch = document.querySelector('.filter');
const $filterModal = document.querySelector('.filter-modal');
const $closeFilter = document.querySelector('.close-filter');
const $regionSelect = document.querySelector('.region-select');
const $regionFilter = document.querySelectorAll('.region-filter');
const $pokemonCards = document.querySelectorAll('.pokemon-cards');

$filterLaunch.addEventListener('click', function () {
  $filterLaunch.classList.add('hidden');
  $filterModal.classList.remove('hidden');
});

function closeFilter(event) {
  $filterLaunch.classList.remove('hidden');
  $filterModal.classList.add('hidden');
}

$closeFilter.addEventListener('click', closeFilter);

function displayView(view) {
  for (let i = 0; i < $pokemonCards.length; i++) {
    const checkRegion = $pokemonCards[i].getAttribute('data-view');
    if (checkRegion === view) {
      $pokemonCards[i].classList.remove('hidden');
    } else {
      $pokemonCards[i].classList.add('hidden');
    }
  }
}

$regionSelect.addEventListener('click', function () {
  if (event.target.tagName === 'A') {
    for (let i = 0; i < $regionFilter.length; i++) {
      if (event.target === $regionFilter[i]) {
        data.view = event.target.getAttribute('data-view');
        displayView(data.view);
      }
    }
  } closeFilter();
});

document.addEventListener('DOMContentLoaded', function () {
  const cardView = data.view;
  displayView(cardView);
  generatePokemonCards();
  tabHide();
});

const $tabContainer = document.querySelector('.tab-container');
function tabHide() {
  const mediaQuery = window.innerWidth;
  if (mediaQuery >= 1000) {
    $tabContainer.classList.add('hidden');
  } else if (mediaQuery <= 1000) {
    $tabContainer.classList.remove('hidden');
  }
}
window.addEventListener('resize', tabHide);

const $detailName = document.querySelector('.detail-name');
const $detailId = document.querySelector('.detail-id');
const $detailImg = document.querySelector('.detail-img');

const $cardContainer = document.querySelector('.card-container');
const $pokemonAbilities = document.querySelector('.pokemon-abilities');
const $typeOne = document.querySelector('.type-one');
const $typeTwo = document.querySelector('.type-two');
const $pokemonHeight = document.querySelector('.pokemon-height');
const $pokemonWeight = document.querySelector('.pokemon-weight');
const $flavorText = document.querySelector('.flavor-text');
const $pokemonGeneration = document.querySelector('.pokemon-generation');

function displayDetails(event) {
  if (event.target.closest('.pokemon-card') !== null) {
    window.scrollTo(top);
    const id = event.target.closest('.pokemon-card').id;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + id);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      const pokemon = xhr.response;
      const name = pokemon.name;
      if (id < 10) {
        $detailId.textContent = '#00' + id;
      } else if (id < 100) {
        $detailId.textContent = '#0' + id;
      } else if (id >= 100) {
        $detailId.textContent = '#' + id;
      }
      $detailName.textContent = capitalizeName(name);
      if (id < 10) {
        $detailImg.setAttribute('src', 'images/assets/images/00' + id + '.png');
      } else if (id < 100) {
        $detailImg.setAttribute('src', 'images/assets/images/0' + id + '.png');
      } else if (id >= 100) {
        $detailImg.setAttribute('src', 'images/assets/images/' + id + '.png');
      }
      let abilities = '';
      const allAbilities = pokemon.abilities;
      for (let a = 0; a < allAbilities.length; a++) {
        if (a === 0) {
          abilities = capitalizeName(allAbilities[a].ability.name);
        } else {
          abilities = abilities + ', ' + capitalizeName(allAbilities[a].ability.name);
        }
      }
      $pokemonAbilities.textContent = abilities;
      const typeOne = pokemon.types[0].type.name;
      $typeOne.textContent = capitalizeName(typeOne);
      $typeOne.className = 'type-one ' + typeOne;
      if (pokemon.types.length > 1) {
        const typeTwo = pokemon.types[1].type.name;
        $typeTwo.textContent = capitalizeName(typeTwo);
        $typeTwo.className = 'type-two ' + typeTwo;
      } else {
        $typeTwo.className = 'type-two hidden';
      }
      $pokemonHeight.textContent = calculateHeight(pokemon.height);
      $pokemonWeight.textContent = calculateWeight(pokemon.weight);
      const xhr2 = new XMLHttpRequest();
      xhr2.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + id);
      xhr2.responseType = 'json';
      xhr2.addEventListener('load', function () {
        const pokemon = xhr2.response;
        const entries = pokemon.flavor_text_entries;
        let flavor = '';
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].language.name === 'en') {
            flavor = flavorText(entries[i].flavor_text);
            break;
          }
        }
        $flavorText.textContent = flavor;
        const generation = capitalizeGen(pokemon.generation.name);
        $pokemonGeneration.textContent = generation;
      });
      xhr2.send();
    });
    xhr.send();
  }
  viewSwap('details');
}

$cardContainer.addEventListener('click', displayDetails);

const $pageView = document.querySelectorAll('.view');

function viewSwap(viewSwitch) {
  data.pageView = viewSwitch;
  for (let i = 0; i < $pageView.length; i++) {
    if (viewSwitch === $pageView[i].getAttribute('data-view')) {
      $pageView[i].classList.remove('hidden');
    } else {
      $pageView[i].classList.add('hidden');
    }
  }
}

const $backButton = document.querySelector('.back-button');
$backButton.addEventListener('click', function (event) {
  viewSwap('gallery');
});
