const detallesPokemon = document.getElementById('contenedor-pokemon');

async function obtenerPokemons() {
  const parametroUrl = new URLSearchParams(window.location.search);
  const id = parametroUrl.get('id');


  if (id) {
    const pokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const species = await getData(pokemon.species.url); // NUEVO @JAVI
    const puntosBase = await getData(`https://pokeapi.co/api/v2/pokemon-species/${id}`); // NUEVO @JAVI

    // Filtrar para obtener la descripción en español
    let textoEspañol = species.flavor_text_entries.filter(entry => entry.language.name === 'es'); // NUEVO @JAVI

    // Devolver la descripción
    let description; // NUEVO @JAVI
    if (textoEspañol.length > 0) { // NUEVO @JAVI 
      description = textoEspañol[0].flavor_text; // NUEVO @JAVI
    } else { // NUEVO @JAVI
      description = 'No se encontró descripción en español para este Pokémon.'; // NUEVO @JAVI
    } // NUEVO @JAVI

    draw(pokemon, species, description, puntosBase);
  } else {
    console.error('No se encontró el parámetro "id" en la URL');
  }
}

obtenerPokemons();


async function draw(pokemon, species, description, puntosBase) { // NUEVO @JAVI

  // Crear una nueva carta de Pokémon
  let nuevaCarta = document.createElement('div');
  nuevaCarta.className = 'carta-pokemon';
  nuevaCarta.innerHTML = `
      <div class="pokemon-imagen">
        <img src="${pokemon.sprites.other['official-artwork'].front_default}">
      </div>`;

  // Agregar la carta de Pokémon al contenedor
  detallesPokemon.appendChild(nuevaCarta);

  // A PARTIR DE AQUÍ ES TODO LO QUE HE HECHO @Javi

  let categoria = species.genera && species.genera.filter(g => g.language.name === 'es')[0] ? species.genera.filter(g => g.language.name === 'es')[0].genus : 'No disponible';

  let descripcionPokemon = document.createElement('div');
  descripcionPokemon.className = 'descripcion-pokemon';
  descripcionPokemon.innerHTML = `
      <h1 class="nombre-pokemon">${pokemon.name}</h1>
      <h3 class="numero-pokemon">Nº: ${pokemon.id}</h3>
      <p class="parrafo-pokemon">${description}</p>
      <div class="contenedor-datos">
        <p><b>Altura</b>: ${pokemon.height}</p>
        <p><b>Peso</b>: ${pokemon.weight}</p>
      </div>`;

  detallesPokemon.appendChild(descripcionPokemon);

  let puntosBaseContainer = document.createElement('div');
  puntosBaseContainer.className = 'puntos-base';
  puntosBaseContainer.innerHTML = `
        <h3>Puntos Base</h3>
        <div class="puntos-vida">Vida: ${pokemon.stats[0].base_stat}</div>
        <div class="puntos-ataque">Ataque: ${pokemon.stats[1].base_stat}</div>
        <div class="puntos-defensa">Defensa: ${pokemon.stats[2].base_stat}</div>
        <div class="puntos-ataque-especial">Ataque Especial: ${pokemon.stats[3].base_stat}</div>
        <div class="puntos-defensa-especial">Defensa Especial: ${pokemon.stats[4].base_stat}</div>
        <div class="puntos-velocidad">Velocidad: ${pokemon.stats[5].base_stat}</div>
        `;

  detallesPokemon.appendChild(puntosBaseContainer);

}

// let tipos = '';
//   if (pokemon.types.length == 2) {
//     tipos += pokemon.types[0].type.name + ' ' + pokemon.types[1].type.name;
//   } else {
//     tipos += pokemon.types[0].type.name;
//   }









async function getData(url) {
  const response = await fetch(url);
  const json = await response.text();
  return JSON.parse(json);
}