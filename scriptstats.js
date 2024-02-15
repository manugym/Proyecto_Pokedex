const detallesPokemon = document.getElementById('contenedor-pokemon');

async function obtenerPokemons() {
  const parametroUrl = new URLSearchParams(window.location.search);
  const id = parametroUrl.get('id');

  if (id) {
    const pokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${id}`);
    draw(pokemon);
  } else {
    console.error('No se encontró el parámetro "id" en la URL');
  }
}

obtenerPokemons();


async function draw(pokemon) {

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
        <div class="pokemon-nombre">${pokemon.name}</div>
        <div class="pokemon-id">${pokemon.id}</div>
        <div class="pokemon-tipos">${tipos}</div>
      </div>`;

  // Agregar la carta de Pokémon al contenedor
  detallesPokemon.appendChild(nuevaCarta);
}









async function getData(url) {
  const response = await fetch(url);
  const json = await response.text();
  return JSON.parse(json);
}