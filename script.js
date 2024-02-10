const listaPokemon = document.getElementById('contenedor-pokemon');
const pokemonTodos = [];
const pokemonFiltrados = [];

obtenerPokemons();


let inputText =  document.getElementById("cuadro-texto");
inputText.addEventListener("keyup", (event) => search());

function search() {
  let inputLowerCase = inputText.value.toLowerCase();
  console.log(inputLowerCase);

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
<<<<<<< Updated upstream
    
=======
>>>>>>> Stashed changes
    listaPokemon.innerHTML += `<div class="carta-pokemon">
                                <div class="pokemon-imagen">
                                  <img src =${pokemon.sprites.other['official-artwork'].front_default}>
                                </div>
                                <div class="bloque-pokemon">
                                  <div class="pokemon-nombre">${pokemon.name}</div>
                                  <div class="pokemon-id">${pokemon.id}</div>
                                  <div class="pokemon-tipos">${tipos}</div>
                                </div>
                              </div>`;
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
