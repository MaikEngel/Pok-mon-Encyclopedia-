pokemonInfo = [];
pokemonSpecies = [];

const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get("name");
const pokemonDetailsContainer = document.getElementById("pokemonDetails");

let detailsName;
let detailsID;

const fetchImages = () => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then((response) => response.json())
    .then((data) => {
      pokemonInfo.push(data);
    })
    .catch((error) => console.error(error));
  console.log(pokemonInfo);
  console.log(pokemonSpecies);
  fetchPokemonDetails();
};

const fetchPokemonDetails = () => {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`)
    .then((response) => response.json())
    .then((data) => {
      pokemonSpecies.push(data);
    });
  renderDetailsPage();
};

const renderDetailsPage = () => {
  renderHeaderContainer();
};

const renderHeaderContainer = () => {
  setTimeout(() => {
    renderIdAndName();
  }, 1000);
};

renderIdAndName = () => {
  let headerContainer = document.getElementById("detailsHeaderContainerName");
  detailsID = pokemonInfo[0].id;
  detailsName = pokemonInfo[0].name;
  headerContainer.innerHTML = `
  #${(detailsID * 0.001).toFixed(3).toString().replace(".", "")}
  ${detailsName.charAt(0).toUpperCase() + detailsName.slice(1)}
  `;
};
