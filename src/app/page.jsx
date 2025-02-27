import Image from 'next/image';

export async function getStaticProps() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          height: details.height,
          weight: details.weight,
        };
      })
    );

    return {
      props: {
        pokemon: pokemonDetails,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        pokemon: [],
        error: 'Failed to load data',
      },
    };
  }
}

export default function PokemonPage({ pokemon, error }) {
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pokemon.map((poke) => (
          <div key={poke.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <Image src={poke.image} alt={poke.name} width={100} height={100} />
            <h2 className="text-lg font-semibold mt-2">{poke.name}</h2>
            <p className="text-gray-600">Height: {poke.height}</p>
            <p className="text-gray-600">Weight: {poke.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
