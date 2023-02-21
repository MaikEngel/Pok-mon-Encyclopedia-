let pokemonData = [];

const onInit = () => {
  fetchPokemon();
  setTimeout(() => { 
    renderPokemon();
  }, 2000);
};

const fetchPokemon = () => {
  for (let i = 1; i < 891; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then((response) => response.json())
      .then((data) => {
        pokemonData.push({
          id: data.id,
          name: data.name,
          sprite: data.sprites.other,
        });
      })
      .catch((error) => console.error(error));
    console.log(pokemonData);
  }
};

const renderPokemon = () => {
  for (let i = 0; i < pokemonData.length; i++) {
    let pokemonDataSort = pokemonData.sort((a, b) => a.id - b.id);
    const pokemonImageContainer = document.querySelector(
      "#pokemonImageContainer"
    );
    console.log(pokemonDataSort);
    const pokemonImage = document.createElement("img");

    pokemonImage.src = pokemonDataSort[i].sprite.home.front_default;
    pokemonImageContainer.appendChild(pokemonImage);
  }
};
