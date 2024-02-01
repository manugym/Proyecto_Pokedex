const listaPokemon = document.getElementById('contenedor-pokemon');

obtenerPokemon();

async function obtenerPokemon() {
for (let i = 1; i <= 151; i++) {
  await getPokemonData(i);
}
}

async function getPokemonData(id) {
  console.log(3)
  const obj = await getData(`https://pokeapi.co/api/v2/pokemon/${id}`);
  console.log(obj);


  
  listaPokemon.innerHTML += `<div class="carta-pokemon">
                            <h1>${obj.name}</h1>
                            <h2>${id}</h2>
                            <img src =${obj.sprites.other['official-artwork'].front_default}>
                            
                            </div>`

}

async function getData(url) {
  const response = await fetch (url);
  const json = await response.text();
  return JSON.parse(json);
}

/*

  console.log()
document.createElement(id)

document.getElementById('imagen').src = obj.sprites.other['official-artwork'].front_default;
document.getElementById('name').innerText = obj.name;
document.getElementById9('ability').innerText = obj.abilities[0].ability.name;*
}

async function getEvolutionChain(id) {
  const obj = await getPokemonData(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const EvolutionChainURL = ojb.evolution_chain.url;
  const EvolutionChain = await getData(EvolutionChainURL);
  console.log(EvolutionChain);
}



getPokemonData(3);
getEvolutionChain(3);*/