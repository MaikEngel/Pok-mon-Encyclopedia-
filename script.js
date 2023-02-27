let pokemonData = [];

let maxPokemon = 12;
let currentPokemon = 0;
let nextPokemon = 12;

let pokemonLoaded = false;
let showButtonFirstTime = false;
let bottom = false;

const onInit = () => {
  fetchPokemon();
};

const fetchPokemon = async () => {
  for (let i = 1; i < 891; i++) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then(async (response) => await response.json())
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
  for (let i = currentPokemon; i < maxPokemon; i++) {
    let pokemonType = pokemonDataSort[i].types[0].type.name;
    let pokemonList = document.querySelector("#pokemonList");
    let pokemonContainer = document.createElement("div");
    pokemonContainer.classList.add("info-container", "br-8", "background-color-" + pokemonType,);
    pokemonContainer.setAttribute(
      "onclick",
      `openDetails('${pokemonDataSort[i].name}')`
    );
    pokemonList.appendChild(pokemonContainer);
    rednerImageContainer(pokemonContainer, pokemonDataSort, i);
    renderIDContainer(pokemonContainer, pokemonDataSort, i);
    renderNameContainer(pokemonContainer, pokemonDataSort, i);
    // renderTypesContainer(pokemonContainer, pokemonDataSort, i);
  }
  showButton();
  countPokemon();
};

const rednerImageContainer = (pokemonContainer, pokemonDataSort, i) => {
  let pokemonImageContainer = document.createElement("img");
  let pokemonImage = pokemonDataSort[i].sprite;
  pokemonImageContainer.classList.add("img-layout");
  pokemonImageContainer.src = pokemonImage;
  pokemonContainer.appendChild(pokemonImageContainer);
};

const renderIDContainer = (pokemonContainer, pokemonDataSort, i) => {
  let pokemonIDContainer = document.createElement("h3");
  let pokemonID = pokemonDataSort[i].id;
  pokemonIDContainer.setAttribute("id", pokemonID);
  pokemonIDContainer.innerHTML =
    "#" + (pokemonID * 0.001).toFixed(3).toString().replace(".", "");
  pokemonContainer.appendChild(pokemonIDContainer);
};

const renderNameContainer = (pokemonContainer, pokemonDataSort, i) => {
  let pokemonNameContainer = document.createElement("h2");
  let pokemonName = pokemonDataSort[i].name;
  pokemonNameContainer.setAttribute("id", i);
  pokemonNameContainer.innerHTML =
    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  pokemonContainer.appendChild(pokemonNameContainer);
};

// const renderTypesContainer = (pokemonContainer, pokemonDataSort, i) => {
//   let pokemonTypesContainer = document.createElement("div");
//   pokemonTypesContainer.classList.add("d-flex", "gap-8");

//   for (let j = 0; j < pokemonDataSort[i].types.length; j++) {
//     let pokemonTypeContainer = document.createElement("p");
//     let pokemonType = pokemonDataSort[i].types[j].type.name;
//     pokemonTypeContainer.classList.add(
//       "pill"
//     );
//     pokemonTypeContainer.innerHTML =
//       pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
//     pokemonTypesContainer.appendChild(pokemonTypeContainer);
//     pokemonContainer.appendChild(pokemonTypesContainer);
//   }
// };

const countPokemon = () => {
  if (maxPokemon >= 888 && !bottom) {
    maxPokemon = 890;
    currentPokemon = 888;
    bottom = true;
    renderPokemon();
  } else {
    maxPokemon += nextPokemon;
    currentPokemon += nextPokemon;
  }
};

const showButton = () => {
  let loadMoreButton = document.getElementById("loadMoreButton");
  if (!pokemonLoaded && !showButtonFirstTime) {
    loadMoreButton.classList.remove("d-none");
    showButtonFirstTime = true;
  } else if (pokemonLoaded) {
    loadMoreButton.classList.add("d-none");
  } else if (!pokemonLoaded) {
    pokemonLoaded = true;
  }
};

const openDetails = (name) => {
  location.href = `pages/details-page/details.html?name=${name}`;
};

window.addEventListener("scroll", () => {
  let distanceToBottom =
    document.documentElement.scrollHeight -
    (window.innerHeight + window.scrollY);
  if (distanceToBottom < 50 && maxPokemon <= 889 && pokemonLoaded) {
    console.log(maxPokemon);
    renderPokemon();
  }
});

const test = () => {
  console.log(pokemonData);
};
