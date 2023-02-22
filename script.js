let pokemonData = [];

let maxPokemon = 12;
let currentPokemon = 0;
let nextPokemon = 12;

const onInit = () => {
  fetchPokemon();
};

const fetchPokemon = () => {
  for (let i = 1; i < 891; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then((response) => response.json())
      .then((data) => {
        pokemonData.push({
          id: data.id,
          name: data.name,
          sprite: data.sprites.other["official-artwork"].front_default,
          types: data.types,
        });
        if (pokemonData.length === 890) {
          renderPokemon();
        }
      })
      .catch((error) => console.error(error));
  }
};

const renderPokemon = () => {
  let pokemonDataSort = pokemonData.sort((a, b) => a.id - b.id);
  let loadMoreButton = document.getElementById("loadMoreButton");
  for (let i = currentPokemon; i < maxPokemon; i++) {
    let pokemonList = document.querySelector("#pokemonList");
    let pokemonContainer = document.createElement("div");
    pokemonContainer.setAttribute("class", "info-container");
    pokemonList.appendChild(pokemonContainer);
    rednerImageContainer(pokemonContainer, pokemonDataSort, i);
    renderIDContainer(pokemonContainer, pokemonDataSort, i);
    renderNameContainer(pokemonContainer, pokemonDataSort, i);
    renderTypesContainer(pokemonContainer, pokemonDataSort, i);
  }
  loadMoreButton.classList.remove('d-none')
  maxPokemon += nextPokemon;
  currentPokemon += nextPokemon;
};

const rednerImageContainer = (pokemonContainer, pokemonDataSort, i) => {
  let pokemonImageContainer = document.createElement("img");
  let pokemonImage = pokemonDataSort[i].sprite;
  pokemonImageContainer.classList.add("img-layout");
  pokemonImageContainer.src = pokemonImage;
  pokemonContainer.appendChild(pokemonImageContainer);
};

const renderIDContainer = (pokemonContainer, pokemonDataSort, i) => {
  let pokemonIDContainer = document.createElement("h5");
  let pokemonID = pokemonDataSort[i].id;
  pokemonIDContainer.setAttribute("id", pokemonID);
  pokemonIDContainer.innerHTML =
    "#" + (pokemonID * 0.001).toFixed(3).toString().replace(".", "");
  pokemonContainer.appendChild(pokemonIDContainer);
};

const renderNameContainer = (pokemonContainer, pokemonDataSort, i) => {
  let pokemonNameContainer = document.createElement("h4");
  let pokemonName = pokemonDataSort[i].name;
  pokemonNameContainer.setAttribute("id", i);
  pokemonNameContainer.innerHTML =
    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  pokemonContainer.appendChild(pokemonNameContainer);
};

const renderTypesContainer = (pokemonContainer, pokemonDataSort, i) => {
  let pokemonTypesContainer = document.createElement("div");
  pokemonTypesContainer.classList.add("d-flex", "gap-8");

  for (let j = 0; j < pokemonDataSort[i].types.length; j++) {
    let pokemonTypeContainer = document.createElement("p");
    let pokemonType = pokemonDataSort[i].types[j].type.name;
    pokemonTypeContainer.classList.add(
      "background-color-" + pokemonType,
      "pill"
    );
    pokemonTypeContainer.innerHTML =
      pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
    pokemonTypesContainer.appendChild(pokemonTypeContainer);
    pokemonContainer.appendChild(pokemonTypesContainer);
  }
};
