let evolutionStages = ["firstStage", "secondStage", "thirdStage"];

const renderHeaderContainer = async () => {
  await renderIdAndName();
  await renderOtherLanguageName();
  await renderHeaderImg();
  await renderEvolution();
};

renderIdAndName = () => {
  let nameAndID = document.getElementById("detailsHeaderContainerName");
  detailsID = pokemonInfo[0].id;
  detailsName = pokemonInfo[0].name;
  nameAndID.classList.add('br-s2-gray', 'mainField', 'br-8')
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
  pokemonImageContainerCreate.setAttribute('class', 'w-100')
  pokemonImageContainer.appendChild(pokemonImageContainerCreate);
};

renderEvolution = () => {
  let evolutionContainer = document.querySelector("#evolutionChain");
  setTimeout(() => {
    renderEvolutionContainer(evolutionContainer);
  }, 1000);
};

renderEvolutionContainer = async (evolutionContainer) => {
  const stageDivsCreated = {};
  console.log(evolutionData);
  for (let i = 0; i < evolutionData.length; i++) {
    let currentStage = evolutionStages[i];
    let pokemon = evolutionData[i];
    let stage = pokemon.stage;
    let container = document.createElement("div");
    // if (currentStage != "firstStage") {
    //   renderEvolutionObjekts(evolutionContainer);
    // }
    if (!stageDivsCreated[stage]) {
      container.setAttribute("id", `stage${i + 1}`);
      container.classList.add("w-33")
      evolutionContainer.appendChild(container);
      stageDivsCreated[stage] = true;
    }
    renderEvolutionImg(evolutionData, currentStage, container);
  }
};

const renderEvolutionObjekts = (evolutionContainer) => {
  let arrow = document.createElement("div");
  arrow.setAttribute("class", "arrow");
  evolutionContainer.appendChild(arrow);
};

renderEvolutionImg = (evolutionData, currentStage, container) => {
  let stage = evolutionData.filter((pokemon) => pokemon.stage === currentStage);
  for (let i = 0; i < stage.length; i++) {
    let imgContainer = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute('class', 'w-75')
    if (stage[i].stage !== "firstStage") {
      imgContainer.classList.add("arrow", "d-flex", "align-items-center");
    }
    img.src = stage[i].sprite;
    imgContainer.appendChild(img);
    container.appendChild(imgContainer);
  }
};

filterEvolutionImg = () => { };
