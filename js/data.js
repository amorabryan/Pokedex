/* exported data */
var data = {
  allPokemon: [],
  pokemonSeen: [],
  pokemonCaught: [],
  pageView: 'gallery',
  view: 'kanto'
};

const previousDataJSON = localStorage.getItem('pokemon-data');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', unload);

function unload(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('pokemon-data', dataJSON);
}
