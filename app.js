const pokemonData = JSON.parse(localStorage.getItem("pokemonData")) || [];
let editId = null;

const formContainer = document.querySelector("#form-container");
const container = document.querySelector("#card-container");
const openBtn = document.querySelector("#open-form");

const getTypeColor = (type) => {
  const t = type.toLowerCase();

  switch (t) {
    case "grass":
      return "bg-green-500";
    case "fire":
      return "bg-red-500";
    case "water":
      return "bg-blue-500";
    case "electric":
      return "bg-yellow-400 text-black";
    case "poison":
      return "bg-purple-500";
    case "normal":
      return "bg-gray-400 text-black";
    case "flying":
      return "bg-sky-400";
    case "bug":
      return "bg-lime-500";
    case "rock":
      return "bg-yellow-700";
    case "ground":
      return "bg-amber-600";
    case "psychic":
      return "bg-pink-500";
    case "ice":
      return "bg-cyan-300 text-black";
    case "dragon":
      return "bg-indigo-600";
    case "dark":
      return "bg-gray-900";
    case "fairy":
      return "bg-pink-300 text-black";
    default:
      return "bg-gray-600";
  }
};

const getNextId = () => {
  let id = Number(localStorage.getItem("pokemonIdCounter")) || 0;
  id++;
  localStorage.setItem("pokemonIdCounter", id);
  return id;
};

openBtn.addEventListener("click", () => {
  editId = null;
  pokemonForm();
});

const pokemonForm = (pokemon = {}) => {
  formContainer.innerHTML = `
    <div class="bg-gray-800 text-white rounded-xl p-6 w-80 shadow">

      <input id="poke-id" type="number"
        value="${pokemon.pokeid || ""}"
        placeholder="Dex No."
        class="w-full p-2 mb-2 rounded bg-gray-700">

      <input id="poke-name" type="text"
        value="${pokemon.pokeName || ""}"
        placeholder="Name"
        class="w-full p-2 mb-2 rounded bg-gray-700">

      <input id="poke-type" type="text"
        value="${pokemon.pokeType ? pokemon.pokeType.join(", ") : ""}"
        placeholder="grass, poison"
        class="w-full p-2 mb-3 rounded bg-gray-700">

      <button id="save-btn" class="bg-green-500 w-full p-2 rounded mb-2">
        ${editId ? "Update" : "Save"}
      </button>

      <button id="close-btn" class="bg-red-500 w-full p-2 rounded">
        Close
      </button>
    </div>
  `;

  document.querySelector("#save-btn").addEventListener("click", saveCard);
  document.querySelector("#close-btn").addEventListener("click", closeForm);
};

const saveCard = () => {
  const pokeid = document.querySelector("#poke-id").value;
  const pokeName = document.querySelector("#poke-name").value;

  const pokeType = document
    .querySelector("#poke-type")
    .value.split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const existing = pokemonData.find(
    (p) => Number(p.pokeid) === Number(pokeid) && p.id !== editId,
  );

  if (existing) {
    alert("Pokédex number already exists!");
    return;
  }

  if (!pokeid || !pokeName || pokeType.length === 0) return;

  if (editId !== null) {
    const index = pokemonData.findIndex((p) => p.id === editId);

    if (index !== -1) {
      pokemonData[index] = {
        ...pokemonData[index],
        pokeid: Number(pokeid),
        pokeName,
        pokeType,
      };
    }

    editId = null;
  } else {
    pokemonData.push({
      id: getNextId(),
      pokeid: Number(pokeid),
      pokeName,
      pokeType,
    });
  }

  localStorage.setItem("pokemonData", JSON.stringify(pokemonData));

  closeForm();
  renderCards();
};

const renderCards = () => {
  container.innerHTML = pokemonData
    .map(
      (pokemon) => `
    <div class="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow w-40">

      <p class="text-sm text-gray-400">#${pokemon.pokeid}</p>

      <h3 class="font-bold capitalize">${pokemon.pokeName}</h3>

      <div class="flex gap-1 flex-wrap mt-2">
        ${(Array.isArray(pokemon.pokeType) ?
          pokemon.pokeType
        : [pokemon.pokeType]
        )
          .filter(Boolean)
          .map(
            (type) => `
    <span class="text-xs px-2 py-1 rounded ${getTypeColor(type)}">
      ${type}
    </span>
  `,
          )
          .join("")}
      </div>

      <button data-id="${pokemon.id}"
        class="update-btn bg-blue-500 w-full mt-3 p-1 rounded">
        Edit
      </button>

      <button data-id="${pokemon.id}"
        class="delete-btn bg-red-500 w-full mt-1 p-1 rounded">
        Delete
      </button>
    </div>
  `,
    )
    .join("");

  console.log("Hello", pokemonData);
};

const updateCard = (id) => {
  const pokemon = pokemonData.find((p) => p.id === id);
  if (!pokemon) return;

  editId = id;
  pokemonForm(pokemon);
};

const deleteCard = (id) => {
  pokemonData = pokemonData.filter((p) => p.id !== id);
  localStorage.setItem("pokemonData", JSON.stringify(pokemonData));
  renderCards();
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".update-btn")) {
    updateCard(Number(e.target.dataset.id));
  }

  if (e.target.matches(".delete-btn")) {
    deleteCard(Number(e.target.dataset.id));
  }
});

const closeForm = () => {
  formContainer.innerHTML = "";
};

renderCards();
