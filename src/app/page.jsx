import Image from "next/image";
import { getPokemons } from "@/lib/getPokemons";

export default async function PokemonList() {
    const pokemons = await getPokemons();

    return (
        <div className="text-center mx-4">
            <h1 className="text-4xl text-green-500 my-8">Pokémon List</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {pokemons.map((pokemon, index) => (
                    <li key={index} className="bg-gray-200 p-6 rounded-lg shadow-md hover:scale-105 transform transition duration-300">
                        <Image src={pokemon.image} alt={pokemon.name} width={100} height={100} className="rounded-full mb-4 mx-auto"/>
                        <p className="text-xl font-semibold">{pokemon.name}</p>
                        <div className="mt-4">
                            <strong className="text-lg text-gray-700">Types:</strong>
                            <ul className="list-none pl-5 mt-2">
                                {pokemon.types.map((type, idx) => (
                                    <li key={idx} className="text-gray-600">{type}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-4">
                            <strong className="text-lg text-gray-700">Abilities:</strong>
                            <ul className="list-none pl-5 mt-2">
                                {pokemon.abilities.map((ability, idx) => (
                                    <li key={idx} className="text-gray-600">{ability}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-4">
                            <strong className="text-lg text-gray-700">Stats:</strong>
                            <ul className="list-none pl-5 mt-2">
                                {pokemon.stats.map((stat, idx) => (
                                    <li key={idx} className="text-gray-600">{stat.name}: {stat.base_stat}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}