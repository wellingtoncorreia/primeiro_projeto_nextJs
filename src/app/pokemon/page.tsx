'use client';

import { useEffect, useState } from 'react';

export default function Pokemon() {
// Cria um estado chamado `pokemons` para armazenar os dados recebidos da API.
// Inicialmente é um array vazio ([]). O tipo `any[]` indica que é um array com elementos de qualquer tipo.
const [pokemons, setPokemons] = useState<any[]>([]);

// Cria um estado booleano chamado `carregando` que indica se os dados ainda estão sendo carregados.
// Começa como `true` (pois os dados ainda não foram buscados).
const [carregando, setCarregando] = useState(true);

// Hook useEffect que será executado uma única vez após o componente ser montado na tela.
// O array vazio `[]` no final indica que esse efeito não será reexecutado (comportamento semelhante ao componentDidMount).
useEffect(() => {
  // Faz uma requisição GET para a rota da API local `/api/pokemons`.
  fetch('/api/pokemons')
    // Converte a resposta em JSON.
    .then((res) => res.json())

    // Atualiza o estado `pokemons` com os dados recebidos da API.
    .then(setPokemons)

    // Em caso de erro (ex: a API não responde), imprime o erro no console.
    .catch((err) => console.error('Erro ao buscar pokémons:', err))

    // Independentemente de sucesso ou erro, atualiza o estado `carregando` para `false`,
    // indicando que o carregamento foi concluído.
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
