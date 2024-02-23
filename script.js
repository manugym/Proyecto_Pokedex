const listaPokemon = document.getElementById('contenedor-pokemon');
const pokemonTodos = [];
const pokemonFiltrados = [];

const diccionario = {
  bug: "bicho",
  steel: "acero",
  water: "agua",
  dragon: "dragón",
  electric: "eléctrico",
  ghost: "fantasma",
  fire: "fuego",
  fairy: "hada",
  ice: "hielo",
  fighting: "lucha",
  normal: "normal",
  grass: "planta",
  psychic: "psíquico",
  rock: "roca",
  dark: "siniestro",
  ground: "tierra",
  poison: "veneno",
  flying: "volador"
}

const coloresTipos = {
  bug: "#92A21E",
  steel: "#60A3BA",
  water: "#2481F0",
  dragon: "#4E60E2",
  electric: "#F9C02B",
  ghost: "#703F71",
  fire: "#E72324",
  fairy: "#EF70EF",
  ice: "#3DD9FD",
  fighting: "#FF8121",
  normal: "#A1A2A0",
  grass: "#3DA224",
  psychic: "#EF3F79",
  rock: "#B0AA82",
  dark: "#4F3F3C",
  ground: "#92501B",
  poison: "#8E41CB",
  flying: "#82BAF0"
}


obtenerPokemons();

/* Evento keyup para recoger el texto introducido por teclado y función
search para igualar el texto recogido por teclado a la lista de nuestro pokemons
almacenados en el array pokemonTodos
*/
let inputText = document.getElementById("cuadro-texto");
inputText.addEventListener("keyup", (event) => search());

function search() {
  let inputLowerCase = inputText.value.toLowerCase();
  listaPokemon.innerHTML = " ";
  const pokemonFiltrados = [];
  for (let i = 0; i < 151; i++) {
    const pokemon = pokemonTodos[i];
    if (pokemon.name.includes(inputLowerCase)) {
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
    let tipos = [];
    let tipo;
    let tipoColor = coloresTipos[pokemon.types[0].type.name];
    let tipoColor2;

    if (pokemon.types.length == 2) {
      tipoColor2 = coloresTipos[pokemon.types[1].type.name];
      tipo = pokemon.types[0].type.name;
      let traduccion = diccionario[tipo]
      tipos.push(traduccion);

      tipo = pokemon.types[1].type.name;
      traduccion = diccionario[tipo]
      tipos.push(traduccion);

    } else {
      tipo = pokemon.types[0].type.name;
      const traduccion = diccionario[tipo];
      tipos.push(traduccion);
    }

    // Crear una nueva carta de Pokémon

    let nuevaCarta = document.createElement('a');
    nuevaCarta.href = `statsPokemon.html?id=${pokemon.id}`

    nuevaCarta.className = 'carta-pokemon';

    let contenido = `
      <div class="pokemon-imagen">
        <img src="${pokemon.sprites.other['official-artwork'].front_default}">
      </div>
      <div class="bloque-pokemon">
        <div class="pokemon-nombre">${pokemon.name}</div>
        <div class="pokemon-id">Nº: ${pokemon.id.toString().padStart(3, 0)}</div>`

    contenido += `<div class="contenedor-tipos">

      <div class="pokemon-tipos1" style="border-color: ${tipoColor}; color: ${tipoColor}">${tipos[0]}</div>`;

    if (pokemon.types.length == 2) {
      contenido +=
        `<div class="pokemon-tipos2" style="border-color: ${tipoColor2}; color: ${tipoColor2}">${tipos[1]}</div>`;
    }

    contenido += "</div>"

    nuevaCarta.innerHTML = contenido
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
getEvolutionChain(3); */
