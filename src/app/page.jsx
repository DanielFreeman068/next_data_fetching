"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getPokemons } from "@/lib/getPokemons";

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPokemons();
                setPokemons(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load data");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-200 to-green-400">
                <div className="text-2xl font-bold text-white animate-pulse">Loading Pokémon...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-100">
                <div className="text-xl text-red-700 font-semibold">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-white px-6 py-10">
            <h1 className="text-5xl font-extrabold text-green-600 text-center mb-10 drop-shadow-lg">Pokémon Gallery</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {pokemons.map((pokemon, index) => (
                    <li
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transform transition duration-300 cursor-pointer"
                        onClick={() => setSelectedPokemon(pokemon)}
                    >
                        <Image
                            src={pokemon.image}
                            alt={pokemon.name}
                            width={120}
                            height={120}
                            className="rounded-full mb-4 mx-auto border-4 border-green-300"
                        />
                        <p className="text-xl font-bold text-green-700 capitalize text-center">{pokemon.name}</p>
                        <div className="mt-2 text-center">
                            <p className="text-gray-700 font-medium">Types:</p>
                            <ul className="flex flex-wrap justify-center gap-2 mt-1">
                                {pokemon.types.map((type, idx) => (
                                    <li key={idx} className="bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full shadow-sm">
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal */}
            {selectedPokemon && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
                        <button
                            className="absolute top-4 right-5 text-gray-700 text-3xl hover:text-red-600 transition"
                            onClick={() => setSelectedPokemon(null)}
                        >
                            &times;
                        </button>
                        <h2 className="text-3xl font-bold text-center text-green-700 mb-6 capitalize">
                            {selectedPokemon.name}
                        </h2>
                        <Image
                            src={selectedPokemon.image}
                            alt={selectedPokemon.name}
                            width={150}
                            height={150}
                            className="rounded-full mx-auto mb-4 border-4 border-green-300"
                        />
                        <div className="text-center mb-4">
                            <p className="text-lg font-medium">Types: <span className="text-gray-600">{selectedPokemon.types.join(", ")}</span></p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-green-700">Abilities</h3>
                            <ul className="mt-2 list-disc list-inside text-gray-700">
                                {selectedPokemon.abilities.map((ability, idx) => (
                                    <li key={idx}>{ability}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-green-700">Stats</h3>
                            <ul className="mt-2 list-disc list-inside text-gray-700">
                                {selectedPokemon.stats.map((stat, idx) => (
                                    <li key={idx}>
                                        {stat.name}: {stat.base_stat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
