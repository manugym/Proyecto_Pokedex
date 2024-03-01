/*
@Author: Javier Rico Navarro
@Author: Manuel José Muñoz Marín
 */
const detallesPokemon = document.getElementById('contenedor-pokemon');

const modoNocturnoBoton = document.getElementById('modo-nocturno');
const cuerpo = document.body;

if (localStorage.getItem('modoNocturno') === 'true') {
  cuerpo.classList.add('dark-mode');
}
// acción botón de modo nocturno
modoNocturnoBoton.addEventListener('click', () => {
  cuerpo.classList.toggle('dark-mode');

  if (cuerpo.classList.contains('dark-mode')) {
    localStorage.setItem('modoNocturno', 'true');
  } else {
    localStorage.setItem('modoNocturno', 'false');
  }
});

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

async function obtenerPokemons() {
  const parametroUrl = new URLSearchParams(window.location.search);
  const id = parametroUrl.get('id');


  if (id) {
    const pokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const species = await getData(pokemon.species.url);
    const puntosBase = await getData(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const evolutionChain = await getData(species.evolution_chain.url);


    // Filtrar para obtener la descripción en español
    let textoEspañol = species.flavor_text_entries.filter(entry => entry.language.name === 'es');

    // Devolver la descripción
    let description;
    if (textoEspañol.length > 0) {
      description = textoEspañol[0].flavor_text;
    } else {
      description = 'No se encontró descripción en español para este Pokémon.';
    }

    draw(pokemon, species, description, puntosBase, evolutionChain);
  } else {
    console.error('No se encontró el parámetro "id" en la URL');
  }
}

obtenerPokemons();


async function draw(pokemon, species, description, puntosBase, evolutionChain, obtenerImagenPokemon) {

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
  let nuevaCarta = document.createElement('div');
  nuevaCarta.className = 'carta-pokemon';
  nuevaCarta.innerHTML = `
      <div class="pokemon-imagen">
        <img src="${pokemon.sprites.other['official-artwork'].front_default}">
      </div>`;

  detallesPokemon.appendChild(nuevaCarta);

  let descripcionPokemon = document.createElement('div');
  descripcionPokemon.className = 'descripcion-pokemon';
  descripcionPokemon.innerHTML = `
      <h1 class="nombre-pokemon">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      <h3 class="numero-pokemon">Nº: ${pokemon.id.toString().padStart(3, 0)}</h3>`;

  // descripcionPokemon.innerHTML += `<div class="contenedor-tipos">
  //   <div class="pokemon-tipos1" style="border-color: ${tipoColor}; color: ${tipoColor}">${tipos[0]}</div>`;

  // if (pokemon.types.length == 2) {
  //   descripcionPokemon.innerHTML +=
  //     `<div class="pokemon-tipos2" style = "border-color: ${tipoColor2}; color: ${tipoColor2}" > ${tipos[1]}</div > `;
  // }

  // descripcionPokemon.innerHTML += "</div>"

  let html = `<div class="contenedor-tipos">
    <div class="pokemon-tipos1" style="border-color: ${tipoColor}; color: ${tipoColor}">${tipos[0]}</div>`;

  if (pokemon.types.length == 2) {
    html += `<div class="pokemon-tipos2" style="border-color: ${tipoColor2}; color: ${tipoColor2}">${tipos[1]}</div>`;
  }

  html += "</div>";

  descripcionPokemon.innerHTML += html;

  descripcionPokemon.innerHTML += `
    <p class="parrafo-pokemon" > ${description}</p>
      <div class="contenedor-datos">
        <p><b>Altura</b>: ${pokemon.height / 10} m</p>
        <p><b>Peso</b>: ${pokemon.weight / 10} kg</p>
      </div>`;

  detallesPokemon.appendChild(descripcionPokemon);

  const valorMaximo = 255;
  let puntosBaseContainer = document.createElement('div');
  puntosBaseContainer.className = 'puntos-base';
  puntosBaseContainer.innerHTML = `
        <h3> Puntos Base</h3>
          <div class="puntos-base-stats">

            <div class="stats-name">Vida: </div>
            <div class="out" style="width:${valorMaximo}px">
              <div class="in" style="width:${pokemon.stats[0].base_stat / valorMaximo * 100}%">
                <div class="puntos-vida">${pokemon.stats[0].base_stat}</div>
              </div>
            </div>

            <div class="stats-name">Ataque: </div>
            <div class="out" style="width:${valorMaximo}px">
              <div class="in" style="width:${pokemon.stats[1].base_stat / valorMaximo * 100}%">
                <div class="puntos-ataque">${pokemon.stats[1].base_stat}</div>
              </div>
            </div>

            <div class="stats-name">Defensa: </div>
            <div class="out" style="width:${valorMaximo}px">
              <div class="in" style="width:${pokemon.stats[2].base_stat / valorMaximo * 100}%">
                <div class="puntos-defensa">${pokemon.stats[2].base_stat}</div>
              </div>
            </div>

            <div class="stats-name">Ataque Especial: </div>
            <div class="out" style="width:${valorMaximo}px">
              <div class="in" style="width:${pokemon.stats[3].base_stat / valorMaximo * 100}%">
                <div class="puntos-ataque-">${pokemon.stats[3].base_stat}</div>
              </div>
            </div>

            <div class="stats-name">Defensa Especial: </div>
            <div class="out" style="width:${valorMaximo}px">
              <div class="in" style="width:${pokemon.stats[4].base_stat / valorMaximo * 100}%">
                <div class="puntos-vida">${pokemon.stats[4].base_stat}</div>
              </div>
            </div>

            <div class="stats-name">Velocidad: </div>
            <div class="out" style="width:${valorMaximo}px">
              <div class="in" style="width:${pokemon.stats[5].base_stat / valorMaximo * 100}%">
                <div class="puntos-vida">${pokemon.stats[5].base_stat}</div>
              </div>
            </div>

          </div>

  `;

  detallesPokemon.appendChild(puntosBaseContainer);


  let cadenaEvolutiva = document.createElement('div');
  cadenaEvolutiva.className = 'cadena-evolutiva';
  cadenaEvolutiva.innerHTML = `
    <h1> Cadena Evolutiva</h1>
      `;

  let contenedorEvoluciones = document.createElement('div');
  contenedorEvoluciones.className = 'contenedor-evoluciones';

  const evoluciones = await obtenerCadenaEvolutiva(evolutionChain.chain);
  for (const evolucion of evoluciones) {
    contenedorEvoluciones.innerHTML += `
      <div>
        <p class="nombre-cadena-evolutiva">${evolucion.nombre}</p>
        <p>${evolucion.nivel}</p>
        <a href="${evolucion.urlDetalles}"><img src="${evolucion.url}"></a>
      </div>
    `;
  }

  cadenaEvolutiva.appendChild(contenedorEvoluciones);
  detallesPokemon.appendChild(cadenaEvolutiva);

}

let idPokemonActual = new URLSearchParams(window.location.search).get('id');

async function obtenerCadenaEvolutiva(chain) {
  let evoluciones = [];
  let estadoActual = chain;

  while (estadoActual && estadoActual.species) {
    const nombrePokemon = estadoActual.species.name;
    const urlSpecies = estadoActual.species.url;
    const urlPokemon = urlSpecies.replace('pokemon-species', 'pokemon');
    const idPokemon = urlSpecies.split('/')[urlSpecies.split('/').length - 2];

    const pokemonData = await getData(urlPokemon);
    const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;

    for (const evolucion of estadoActual.evolves_to) {
      let nivelEvolucion = null;
      if (evolucion.evolution_details.length > 0) {
        nivelEvolucion = evolucion.evolution_details[0].min_level;
      }
      evoluciones.push({ nombre: nombrePokemon, nivel: nivelEvolucion, url: imageUrl, urlDetalles: `statsPokemon.html?id=${idPokemon}` });
    }

    // Si el Pokémon no tiene evoluciones, también lo agregamos a la lista
    if (estadoActual.evolves_to.length === 0) {
      evoluciones.push({ nombre: nombrePokemon, nivel: null, url: imageUrl, urlDetalles: `statsPokemon.html?id=${idPokemon}` });
    }

    if (estadoActual.evolves_to.length > 0) {
      estadoActual = estadoActual.evolves_to[0];
    } else {
      estadoActual = null;
    }
  }

  return evoluciones;
}


async function getData(url) {
  const response = await fetch(url);
  const json = await response.text();
  return JSON.parse(json);
}