pokemonInfo = [];
pokemonSpecies = [];
evolutionChain = [];
evolutionData = [];

const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get("name");
const pokemonDetailsContainer = document.getElementById("pokemonDetails");

let detailsName;
let detailsID;

let germanName;
let japanName;

const onInitDetails = async () => {
  await fetchImages();
  await fetchPokemonDetails();
  await fetchEvolution();
  await fetchEvolutionImages();
  renderDetailsPage();
};

const fetchImages = async () => {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then(async (response) => await response.json())
    .then((data) => {
      pokemonInfo.push(data);
    })
    .catch((error) => console.error(error));
  console.log("Pokemon Info: ", pokemonInfo);
  console.log("Pokemon Species: ", pokemonSpecies);
};

const fetchPokemonDetails = async () => {
  await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`)
    .then(async (response) => await response.json())
    .then((data) => {
      pokemonSpecies.push(data);
    })
    .catch((error) => console.error(error));
};

const fetchEvolution = async () => {
  await fetch(pokemonSpecies[0].evolution_chain.url)
    .then(async (response) => await response.json())
    .then((data) => {
      evolutionChain.push(data);
      console.log("Data: ", data);
    })
    .catch((error) => console.error(error));
};

const fetchEvolutionImages = async () => {
  let firstEvolution = evolutionChain[0].chain.species.name;
  await fetch(`https://pokeapi.co/api/v2/pokemon/${firstEvolution}/`)
    .then(async (response) => await response.json())
    .then((data) => {
      evolutionData.push({
        sprite: data.sprites.other["official-artwork"].front_default,
        name: data.name,
      })
      console.log("DataImages: ", data);
      console.log(("EvolutionData: ", evolutionData));
    })
    .catch((error) => console.error(error));
  if (evolutionChain) {
  }
};

const renderDetailsPage = () => {
  renderHeaderContainer();
};

const renderHeaderContainer = () => {
  setTimeout(() => {
    renderIdAndName();
    renderOtherLanguageName();
    renderHeaderImg();
  }, 1000);
};

renderIdAndName = () => {
  let nameAndID = document.getElementById("detailsHeaderContainerName");
  detailsID = pokemonInfo[0].id;
  detailsName = pokemonInfo[0].name;
  nameAndID.innerHTML = `
  #${(detailsID * 0.001).toFixed(3).toString().replace(".", "")}
  ${detailsName.charAt(0).toUpperCase() + detailsName.slice(1)}
  `;
};

renderOtherLanguageName = () => {
  let otherLanguageName = document.getElementById(
    "detailsHeaderContainerNameOtherLanguage"
  );
  germanLanguage = pokemonSpecies[0].names[5].language.name;
  germanName = pokemonSpecies[0].names[5].name;
  japanLanguage = pokemonSpecies[0].names[9].language.name;
  japanName = pokemonSpecies[0].names[9].name;
  otherLanguageName.innerHTML = `${germanName} (${germanLanguage}) - ${japanName} (${japanLanguage})`;
};

renderHeaderImg = () => {
  let pokemonImageContainer = document.querySelector("#imageContainer");
  let pokemonImageContainerCreate = document.createElement("img");
  let pokemonImage =
    pokemonInfo[0].sprites.other["official-artwork"].front_default;
  pokemonImageContainerCreate.src = pokemonImage;
  pokemonImageContainer.appendChild(pokemonImageContainerCreate);
};
