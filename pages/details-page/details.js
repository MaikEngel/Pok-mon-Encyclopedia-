// const urlParams = new URLSearchParams(window.location.search);
// const pokemonName = urlParams.get('name');

// const pokemonDetailsContainer = document.getElementById('pokemonDetails');

// fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`)
//     .then(response => response.json())
//     .then(data => {
//         const pokemonName = data.name;
//         const pokemonImage = data.sprites.front_default;
//         const pokemonType = data.types[0].type.name;

//         pokemonDetailsContainer.innerHTML = `
//       <h2>${pokemonName}</h2>
//     `;
//     });