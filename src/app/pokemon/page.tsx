'use client';

import { useEffect, useState } from 'react';

export default function Pokemon() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarPokemons = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await res.json();

        const promessas = data.results.map(async (p: any) => {
          const resDetalhe = await fetch(p.url);
          return await resDetalhe.json();
        });

        const pokemonsDetalhados = await Promise.all(promessas);
        setPokemons(pokemonsDetalhados);
        setCarregando(false);
      } catch (erro) {
        console.error('Erro ao buscar pokémons:', erro);
      }
    };

    buscarPokemons();
  }, []);

  if (carregando) {
    return <p className="p-4">Carregando pokémons...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Pokémons</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white shadow-md rounded-xl w-1xl p-4 text-center"
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="mx-auto mb-2"
            />
            <h2 className="text-lg capitalize font-semibold">{pokemon.name}</h2>
            <p>Altura: {pokemon.height}</p>
            <p>Peso: {pokemon.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
