'use client';

import { useEffect, useState } from 'react';
import { getListaPokemons } from '@/api/pokemonService'; // Importando a função da API

export default function Pokemon() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getListaPokemons()
      .then(setPokemons)
      .catch((err) => console.error('Erro ao buscar pokémons:', err))
      .finally(() => setCarregando(false));
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
            className="bg-white shadow-md rounded-xl p-4 text-center"
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
