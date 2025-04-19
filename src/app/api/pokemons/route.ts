// Define o tempo de revalidação da rota em segundos (3600 segundos = 1 hora).
// Isso informa ao Next.js que ele pode armazenar em cache a resposta dessa rota por esse período.
export const revalidate = 3600;

// Função que será executada quando uma requisição GET for feita para esta rota da API.
// Exemplo: GET http://localhost:3000/api/pokemons
export async function GET() {
  // Faz uma requisição para a PokéAPI para obter uma lista de 40 pokémons.
  // A opção `next: { revalidate: 3600 }` indica que essa resposta também deve ser armazenada em cache por 1 hora.
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40', {
    next: { revalidate: 3600 }, // caching da chamada externa
  });

  // Converte a resposta da requisição anterior em JSON.
  // O resultado terá um array de pokémons com nome e URL de detalhes.
  const data = await res.json();

  // Para cada pokémon na lista, cria uma promessa para buscar seus detalhes completos.
  // Cada item de `data.results` contém uma URL individual para os dados completos do pokémon.
  const promises = data.results.map((pokemon: any) =>
    // Para cada URL, faz um fetch e transforma em JSON.
    fetch(pokemon.url).then((res) => res.json())
  );

  // Aguarda todas as promessas de detalhes de pokémons serem resolvidas.
  // Isso garante que temos todos os dados antes de retornar.
  const pokemonsDetalhados = await Promise.all(promises);

  // Retorna a resposta da API no formato JSON com os dados completos de todos os pokémons.
  // Essa será a resposta visível ao acessar /api/pokemons.
  return Response.json(pokemonsDetalhados);
}
