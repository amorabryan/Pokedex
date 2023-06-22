/* exported data */
var data = {
  pokemonSeen: [],
  pokemonCaught: [],
  previousView: '',
  pageView: '',
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
