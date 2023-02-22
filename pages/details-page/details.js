const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');

const pokemonDetailsContainer = document.getElementById('pokemonDetails');

fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        pokemonDetailsContainer.innerHTML = `
      <h2>${data.name}</h2>
    `;
    });