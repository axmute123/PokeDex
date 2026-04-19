let pokemonData = JSON.parse(localStorage.getItem("pokemonData")) || [];

const getNextId = () => {
  let currentId = Number(localStorage.getItem("pokemonIdCounter")) || 0;
  currentId++;
  localStorage.setItem("pokemonIdCounter", currentId);
  return currentId;
};

const createCard = () => {
  const data = `
    <div class="flex flex-col border-2 w-96 m-5 bg-yellow-100 p-3">
      <input id="poke-image" type="text" placeholder="Image URL" class="border p-2 mb-2">

      <label>Name:</label>
      <input id="poke-name" type="text" placeholder="Name" class="border p-2 mb-2">

      <label>Health:</label>
      <input id="poke-health" type="number" placeholder="Health" class="border p-2 mb-2">

      <label>Type:</label>
      <input id="poke-type" type="text" placeholder="Type" class="border p-2 mb-2">

      <label>Description:</label>
      <input id="poke-desc" type="text" placeholder="Description" class="border p-2 mb-2">

      <button class="bg-green-500 text-white p-2 mt-2" onclick="saveCard()">Save</button>
    </div>
  `;

  document.getElementById("display-card").innerHTML = data;
  displayCard();
};


const saveCard = () => {
  const pokeName = document.getElementById("poke-name").value
  const pokeHealth = document.getElementById("poke-health").value
  const pokeType = document.getElementById("poke-type").value
  const pokeDesc = document.getElementById("poke-desc").value


  const newPokemon = {
    id: getNextId(),
    image: null, 
    pokeName: pokeName,
    pokeHealth: pokeHealth,
    pokeType: pokeType,
    pokeDesc: pokeDesc,
  }
  console.log(newPokemon);
  pokemonData.push(newPokemon);
  localStorage.setItem("pokemonData", JSON.stringify(pokemonData));
  pokemonData = JSON.parse(localStorage.getItem("pokemonData"));
  displayCard();
  // document.getElementById("display-card").style.display = "none";
  // document.getElementById("card-container").style.display = "block";
};

const displayCard = () => {
  const container = document.getElementById("card-container");

  
  if (!container) return;

  container.innerHTML = "";

  pokemonData.forEach(pokemon => {
    const card = `
      <div class="border-2 p-3 m-3 w-60 bg-yellow-200">
        ${pokemon.image ? `<img src="${pokemon.image}" class="h-32 w-full object-cover mb-2">` : ""}
        <p><strong>Name: ${pokemon.pokeName}</strong></p>
        <p>Health: ${pokemon.pokeHealth}</p>
        <p>Type: ${pokemon.pokeType}</p>
        <p>Description: ${pokemon.pokeDesc}</p>
        <button onclick="deleteCard(${pokemon.id})" class="bg-red-500 text-white px-2 mt-2">Delete</button>
      </div>
    `;
    container.innerHTML += card;
  });
};

const updateCard = (id) => {

}


const deleteCard = (id) => {
  pokemonData = pokemonData.filter(pokemon => pokemon.id !== id);

  localStorage.setItem("pokemonData", JSON.stringify(pokemonData));

  displayCard();
};

displayCard();


