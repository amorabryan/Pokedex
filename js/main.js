const $hamburger = document.querySelector('.hamburger-menu');
const $backPokeball = document.querySelector('.pokeball-hamburger');

$hamburger.addEventListener('click', function () {
  $hamburger.classList.toggle('change');
  $backPokeball.classList.toggle('spin');
});
