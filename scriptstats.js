const detallesPokemon = document.getElementById('contenedor-pokemon');

async function obtenerPokemons() {
  const parametroUrl = new URLSearchParams(window.location.search);
  const id = parametroUrl.get('id');


  if (id) {
    const pokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const species = await getData(pokemon.species.url);
    const puntosBase = await getData(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    // Filtrar para obtener la descripción en español
    let textoEspañol = species.flavor_text_entries.filter(entry => entry.language.name === 'es');

    // Devolver la descripción
    let description;
    if (textoEspañol.length > 0) {
      description = textoEspañol[0].flavor_text;
    } else { 
      description = 'No se encontró descripción en español para este Pokémon.';
    } 

    draw(pokemon, species, description, puntosBase);
  } else {
    console.error('No se encontró el parámetro "id" en la URL');
  }
}

obtenerPokemons();


async function draw(pokemon, species, description, puntosBase) {

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
      <h3 class="numero-pokemon">Nº: ${pokemon.id.toString().padStart(3, 0)}</h3>
      <p class="parrafo-pokemon">${description}</p>
      <div class="contenedor-datos">
        <p><b>Altura</b>: ${pokemon.height}</p>
        <p><b>Peso</b>: ${pokemon.weight}</p>
      </div>`;

  detallesPokemon.appendChild(descripcionPokemon);

  const valorMaximo = 255;
  let puntosBaseContainer = document.createElement('div');
  puntosBaseContainer.className = 'puntos-base';
  puntosBaseContainer.innerHTML = `
        <h3>Puntos Base</h3>
        <div class="puntos-base-stats">

          <div class="stats-name">Vida: </div>
          <div class="out" style = "width:${valorMaximo}px">
            <div class="in" style = "width:${pokemon.stats[0].base_stat / valorMaximo * 100}%">
              <div class="puntos-vida">${pokemon.stats[0].base_stat}</div>
            </div>
          </div>
  
          <div class="stats-name">Ataque: </div>
            <div class="out" style = "width:${valorMaximo}px">
              <div class="in" style = "width:${pokemon.stats[1].base_stat / valorMaximo * 100}%">
                <div class="puntos-ataque">${pokemon.stats[1].base_stat}</div>
              </div>
          </div>

          <div class="stats-name">Defensa: </div>
            <div class="out" style = "width:${valorMaximo}px">
              <div class="in" style = "width:${pokemon.stats[2].base_stat / valorMaximo * 100}%">
                <div class="puntos-defensa">${pokemon.stats[2].base_stat}</div>
              </div>
          </div>

          <div class="stats-name">Ataque Especial: </div>
            <div class="out" style = "width:${valorMaximo}px">
              <div class="in" style = "width:${pokemon.stats[3].base_stat / valorMaximo * 100}%">
                <div class="puntos-ataque-">${pokemon.stats[3].base_stat}</div>
              </div>
          </div>

          <div class="stats-name">Defensa Especial: </div>
            <div class="out" style = "width:${valorMaximo}px">
              <div class="in" style = "width:${pokemon.stats[4].base_stat / valorMaximo * 100}%">
                <div class="puntos-vida">${pokemon.stats[4].base_stat}</div>
              </div>
          </div>

          <div class="stats-name">Velocidad: </div>
            <div class="out" style = "width:${valorMaximo}px">
              <div class="in" style = "width:${pokemon.stats[5].base_stat / valorMaximo * 100}%">
                <div class="puntos-vida">${pokemon.stats[5].base_stat}</div>
              </div>
          </div>
          
        </div>
      
    
        
          
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