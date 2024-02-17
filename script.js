const listaPokemon = document.getElementById('contenedor-pokemon');
const pokemonTodos = [];
const pokemonFiltrados = [];

obtenerPokemons();

/* Evento keyup para recoger el texto introducido por teclado y función
search para igualar el texto recogido por teclado a la lista de nuestro pokemons
almacenados en el array pokemonTodos
*/
let inputText = document.getElementById("cuadro-texto");
inputText.addEventListener("keyup", (event) => search());

async function search() {
  let inputLowerCase = inputText.value.toLowerCase();
  listaPokemon.innerHTML = " ";
  const pokemonFiltrados = [];
  for (let i = 1; i <= 151; i++) {
    const pokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${i}`);
    if (pokemon.name.includes(inputLowerCase)) {
      console.log("es verdad")
      pokemonFiltrados.push(pokemon);
    }
  }
  draw(pokemonFiltrados);
}

async function obtenerPokemons() {
  for (let i = 1; i <= 151; i++) {
    const pokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${i}`);
    pokemonTodos.push(pokemon);
  }
  draw(pokemonTodos);
}

async function draw(pokemons) {
  for (let pokemon of pokemons) {
    let tipos = '';
    if (pokemon.types.length == 2) {
      tipos += pokemon.types[0].type.name + ' ' + pokemon.types[1].type.name;
    } else {
      tipos += pokemon.types[0].type.name;
    }

    // Crear una nueva carta de Pokémon
    let nuevaCarta = document.createElement('div');
    nuevaCarta.className = 'carta-pokemon';
    nuevaCarta.innerHTML = `
      <div class="pokemon-imagen">
        <img src="${pokemon.sprites.other['official-artwork'].front_default}">
      </div>
      <div class="bloque-pokemon">
        <div class="pokemon-nombre">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
        <div class="pokemon-id">Nº: ${pokemon.id.toString().padStart(3, 0)}</div>
        <div class="pokemon-tipos">${tipos.charAt(0).toUpperCase() + tipos.slice(1)}</div>
      </div>`;

    // Agregar el evento de clic al div "carta-pokemon"
    nuevaCarta.addEventListener('click', () => {
      window.location.href = `statsPokemon.html?id=${pokemon.id}`;
    });

    listaPokemon.appendChild(nuevaCarta);
  }
}

async function getData(url) {
  const response = await fetch(url);
  const json = await response.text();
  return JSON.parse(json);
}





/*
document.getElementById9('ability').innerText = pokemon.abilities[0].ability.name;*
}
async function getEvolutionChain(id) {
  const pokemon = await getPokemonData(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const EvolutionChainURL = ojb.evolution_chain.url;
  const EvolutionChain = await getData(EvolutionChainURL);
  console.log(EvolutionChain);
}
getPokemonData(3);
getEvolutionChain(3);*/
