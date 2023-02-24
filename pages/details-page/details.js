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
  await loadEvolutionImages();
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
    })
    .catch((error) => console.error(error));
};

const loadEvolutionImages = async () => {
  let firstStage = evolutionChain[0].chain.species.name;
  let evolvesStageTwo = evolutionChain[0].chain.evolves_to;
  await fetchEvolutionImages(firstStage, "firstStage");
  if (evolvesStageTwo.length >= 1) {
    for (let i = 0; i < evolvesStageTwo.length; i++) {
      let evolvesStageThree = evolutionChain[0].chain.evolves_to[i].evolves_to;
      let secondStage = evolvesStageTwo[i].species.name;
      fetchEvolutionImages(secondStage, "secondStage");
      if (evolvesStageThree.length >= 1) {
        for (let j = 0; j < evolvesStageThree.length; j++) {
          let thirdStage = evolvesStageThree[j].species.name;
          fetchEvolutionImages(thirdStage, "thirdStage");
        }
      }
    }
  }
};

fetchEvolutionImages = async (currentPokemon, stage) => {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}/`)
    .then(async (response) => await response.json())
    .then(async (data) => {
      await evolutionData.push({
        sprite: data.sprites.other["official-artwork"].front_default,
        name: data.name,
        stage: stage,
      });
    })
    .catch((error) => console.error(error));
};

const renderDetailsPage = async () => {
  await renderHeaderContainer();
};


