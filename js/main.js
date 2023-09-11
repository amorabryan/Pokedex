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
    name = `${firstName} ${secondName}`;
  } else {
    name = string[0].toUpperCase() + string.substring(1);
  }
  return name;
}

function capitalizeSprite(string) {
  let name = '';
  const splitName = string.split('_');
  if (splitName.length === 2) {
    const firstName = splitName[0].charAt(0).toUpperCase() + splitName[0].substring(1);
    const secondName = splitName[1].charAt(0).toUpperCase() + splitName[1].substring(1);
    name = `${firstName} ${secondName}`;
  } else if (splitName.length === 3) {
    const firstName = splitName[0].charAt(0).toUpperCase() + splitName[0].substring(1);
    const secondName = splitName[1].charAt(0).toUpperCase() + splitName[1].substring(1);
    const thirdName = splitName[2].charAt(0).toUpperCase() + splitName[2].substring(1);
    name = `${firstName} ${secondName} ${thirdName}`;
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
  output = output.replaceAll('TRAINER', 'trainer');
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
const $viewContainer = document.querySelector('.view-container');
const $tabChildren = $tabContainer.children;
const $viewChildren = $viewContainer.children;

let activeTabIndex = 0;

function tabHide() {
  const mediaQuery = window.innerWidth;
  for (let i = 0; i < $tabChildren.length; i++) {
    if (mediaQuery > 1000) {
      $tabChildren[i].classList.add('hidden');
      $viewChildren[i].classList.remove('hidden');
      $tabContainer.classList.add('hidden');
    } else if (mediaQuery < 1000) {
      $tabChildren[i].classList.remove('hidden');
      $viewChildren[i].classList.add('hidden');
      $tabContainer.classList.remove('hidden');
    }
  }

  if (mediaQuery < 1000) {
    $viewChildren[activeTabIndex].classList.remove('hidden');
  }
}

function tabClick(index) {
  activeTabIndex = index;
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
      renderStats(pokemon);
      const pokemonSprites = pokemon.sprites;
      renderSprites(pokemonSprites);
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
  while ($pokemonSprites.hasChildNodes()) {
    $pokemonSprites.removeChild($pokemonSprites.firstChild);
  }
  viewSwap('gallery');
});

const $tab = document.querySelectorAll('.tab');
const $tabContent = document.querySelectorAll('.tab-content');

$tabContainer.addEventListener('click', function (event) {
  if (event.target.matches('.tab')) {
    for (let tabIndex = 0; tabIndex < $tab.length; tabIndex++) {
      if ($tab[tabIndex] === event.target) {
        $tab[tabIndex].className = 'tab' + ' active';
        tabClick(tabIndex);
      } else {
        $tab[tabIndex].className = 'tab';
      }
    }

    const $dataView = event.target.getAttribute('data-view');

    for (let viewIndex = 0; viewIndex < $tabContent.length; viewIndex++) {
      if ($tabContent[viewIndex].getAttribute('data-view') === $dataView) {
        $tabContent[viewIndex].classList.remove('hidden');
      } else {
        $tabContent[viewIndex].classList.add('hidden');
      }
    }
  }
});

const $pokemonSprites = document.querySelector('.pokemon-sprites');

function renderSprites(pokemon) {
  const sprites = [
    'front_default',
    'back_default',
    'front_shiny',
    'back_shiny',
    'front_female',
    'back_female',
    'front_shiny_female',
    'back_shiny_female'
  ];

  for (let i = 0; i < sprites.length; i++) {
    const $spriteView = document.createElement('div');
    const $spriteImg = document.createElement('img');
    const $spriteName = document.createElement('p');

    $spriteView.className = 'sprite-view column-fourth column-half flex';
    $spriteImg.className = 'sprite-img';
    $spriteName.className = 'sprite-name';

    const spriteUrl = pokemon[sprites[i]];
    if (spriteUrl === null) {
      $spriteView.classList.add('hidden');
    } else {
      $spriteImg.setAttribute('src', spriteUrl);
    }

    $spriteName.textContent = capitalizeSprite(sprites[i]);

    $spriteView.appendChild($spriteImg);
    $spriteView.appendChild($spriteName);
    $pokemonSprites.appendChild($spriteView);
  }
}

const $stats = document.querySelector('#stats').getContext('2d');

function renderStats(pokemon) {
  const statNames = ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'];
  const statValues = [pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[3].base_stat, pokemon.stats[4].base_stat, pokemon.stats[5].base_stat];
  const scatterColor = pokemon.types[0].type.name;
  const bgColor = matchType(pokemonTypes, scatterColor);

  // eslint-disable-next-line no-undef, no-unused-vars
  const statChart = new Chart($stats, {
    type: 'bar',
    data: {
      labels: statNames,
      datasets: [{
        backgroundColor: bgColor,
        data: statValues
      }]
    },
    options: {
      legend: { display: false },
      title: { display: false },
      scales: {
        y: {
          min: 0,
          grace: '5%',
          ticks: {
            stepSize: 5
          }
        }
      }
    }
  });
}

const pokemonTypes = [
  { type: 'normal', color: 'rgb(168, 168, 120)' },
  { type: 'fire', color: 'rgb(240, 128, 48)' },
  { type: 'water', color: 'rgb(104, 144, 240)' },
  { type: 'grass', color: 'rgb(120, 200, 80)' },
  { type: 'electric', color: 'rgb(248, 208, 48)' },
  { type: 'ice', color: 'rgb(152, 216, 216)' },
  { type: 'fighting', color: 'rgb(192, 48, 40)' },
  { type: 'poison', color: 'rgb(160, 64, 160)' },
  { type: 'ground', color: 'rgb(224, 192, 104)' },
  { type: 'flying', color: 'rgb(168, 144, 240)' },
  { type: 'psychic', color: 'rgb(248, 88, 136)' },
  { type: 'bug', color: 'rgb(168, 184, 32)' },
  { type: 'rock', color: 'rgb(184, 160, 56)' },
  { type: 'ghost', color: 'rgb(112, 88, 152)' },
  { type: 'dark', color: 'rgb(112, 88, 72)' },
  { type: 'dragon', color: 'rgb(112, 56, 248)' },
  { type: 'steel', color: 'rgb(184, 184, 208)' },
  { type: 'fairy', color: 'rgb(240, 182, 188)' }
];

function matchType(typeArray, name) {
  for (let i = 0; i < typeArray.length; i++) {
    const typeObj = typeArray[i];
    if (typeObj.type === name) {
      return typeObj.color;
    }
  }
}
