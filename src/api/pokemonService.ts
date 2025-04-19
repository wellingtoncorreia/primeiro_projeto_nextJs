// src/api/pokemonService.ts
export async function getListaPokemons(limit = 40) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await res.json();
  
    // Cria as requisições paralelas para pegar os detalhes de cada Pokémon
    const promises = data.results.map((pokemon: any) => fetch(pokemon.url).then(res => res.json()));
  
    // Espera todas as promessas terminarem
    const pokemonsDetalhados = await Promise.all(promises);
    
    return pokemonsDetalhados;
  }
  