let pokemonData = JSON.parse(localStorage.getItem("pokemonData")) || [];
// console.log("data:", pokemonData);
let editId = null;

const getNextId = () => {
  let currentId = Number(localStorage.getItem("pokemonIdCounter")) || 0;
  currentId++;
  localStorage.setItem("pokemonIdCounter", currentId);
  return currentId;
};

document.getElementById("open-form").addEventListener("click", () => {
  editId = null;
  createCard();
});

const createCard = (pokemon = null) => {
  const data = `
    <div class="flex flex-col border-2 w-96 m-5 bg-yellow-100 p-3">
      <label>PokeDexNumber</label>
      <input id="poke-id" type="number"  value="${pokemon ? pokemon.pokeid : ""}" placeholder="No." class="border p-2 mb-2">

      <label>Name:</label>
      <input id="poke-name" type="text" value="${pokemon ? pokemon.pokeName : ""}" placeholder="Name" class="border p-2 mb-2">

      <label>Type:</label>
      <input id="poke-type" type="text" value="${pokemon ? pokemon.pokeType : ""}" placeholder="Type" class="border p-2 mb-2">

      <button id="save-btn" class="bg-green-500 text-white p-2 mt-2">
        ${pokemon ? "Update" : "Save"}
      </button>


      <button id="close-btn" class="bg-red-500 text-white p-2 mt-2">
        Close
      </button>
    </div>
  `;
  const display = document.getElementById("display-card");
  display.innerHTML = data;
  // display.style.display = "flex";

  document.getElementById("save-btn").addEventListener("click", saveCard);
  document.getElementById("close-btn").addEventListener("click", closeForm);
};


const saveCard = () => {

  const pokeid = document.getElementById("poke-id")?.value;
  const pokeName = document.getElementById("poke-name")?.value;
  const pokeType = document.getElementById("poke-type")?.value;

  if (editId !== null) {
    const index = pokemonData.findIndex((p) => p.id === editId);

    if (index !== -1) {
      pokemonData[index] = {
        ...pokemonData[index],
        pokeid,
        pokeName,
        pokeType,
      };
    }

    editId = null;
  } else {
    pokemonData.push({
      id: getNextId(),
      pokeid,
      pokeName,
      pokeType,
    });
  }

  localStorage.setItem("pokemonData", JSON.stringify(pokemonData));
  console.log(pokemonData);

  closeForm();

  displayCard();
};


const displayCard = () => {
  const container = document.getElementById("card-container");
  console.log("data:", pokemonData);

  if (!container) return;

  container.innerHTML = "";

  pokemonData.forEach((pokemon) => {
    container.innerHTML += `
    <div class="bg-yellow-500 w-full p-1">
    <p>No: ${pokemon.pokeid}</p>
    <p>Name: ${pokemon.pokeName}</p>
    <p>Type: ${pokemon.pokeType}</p>
    <button onclick="updateCard(${pokemon.id})" class="bg-green-700 text-white p-1 mt-1">
    Update
        </button>

        <button onclick="deleteCard(${pokemon.id})" class="bg-red-700 text-white p-1 mt-1">
        Delete
        </button>
        </div>

        
        `;
  });
  

};


const updateCard = (id) => {
  id = Number(id);

  const pokemon = pokemonData.find((p) => p.id === id);
  if (!pokemon) return;

  editId = id;
  createCard(pokemon);
};

const deleteCard = (id) => {
  pokemonData = pokemonData.filter((pokemon) => pokemon.id !== id);

  localStorage.setItem("pokemonData", JSON.stringify(pokemonData));
  displayCard();
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("update-btn")) {
    updateCard(Number(e.target.dataset.id));
  }
  if (e.target.classList.contains("delete-btn")) {
    deleteCard(Number(e.target.dataset.id));
  }
});

const closeForm = () => {
  const display = document.getElementById("display-card");
  display.style.display = "none";
  // display.innerHTML = "";
  displayCard();
};

displayCard();
