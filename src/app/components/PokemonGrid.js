// app/components/PokemonGrid.js (Client Component)
'use client';

import { useState } from 'react';

export default function PokemonGrid({ initialPokemonList }) {
    const [isLoading, setIsLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState(initialPokemonList || []);

    // Function to get type color based on Pokémon type
    const getTypeColor = (type) => {
        const typeColors = {
        normal: 'bg-gray-400',
        fire: 'bg-red-500',
        water: 'bg-blue-500',
        grass: 'bg-green-500',
        electric: 'bg-yellow-400',
        ice: 'bg-blue-200',
        fighting: 'bg-red-700',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-600',
        flying: 'bg-indigo-300',
        psychic: 'bg-pink-500',
        bug: 'bg-green-400',
        rock: 'bg-yellow-700',
        ghost: 'bg-purple-700',
        dark: 'bg-gray-800',
        dragon: 'bg-indigo-700',
        steel: 'bg-gray-500',
        fairy: 'bg-pink-300',
        };
        
        return typeColors[type] || 'bg-gray-400';
    };

    // Example of a client-side action (could be used for filtering, searching, etc.)
    const refreshData = async () => {
        setIsLoading(true);
        try {
        const response = await fetch('/api/pokemon');
        const data = await response.json();
        setPokemonList(data.pokemonList);
        } catch (error) {
        console.error('Error refreshing data:', error);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <>
        {/* Loading state */}
        {isLoading ? (
            <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pokemonList.map((pokemon) => (
                <div 
                key={pokemon.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                <div className="p-4 bg-blue-50">
                    <img 
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                    alt={pokemon.name}
                    className="w-full h-48 object-contain mx-auto"
                    />
                </div>
                
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold capitalize">
                        {pokemon.name}
                    </h2>
                    <span className="text-gray-500 font-semibold">#{pokemon.id}</span>
                    </div>
                    
                    {/* Display types */}
                    <div className="flex gap-2 mb-3">
                    {pokemon.types.map((typeInfo) => (
                        <span 
                        key={typeInfo.type.name}
                        className={`${getTypeColor(typeInfo.type.name)} text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}
                        >
                        {typeInfo.type.name}
                        </span>
                    ))}
                    </div>
                    
                    {/* Display stats */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                        <span className="font-medium">Height:</span>
                        <span>{pokemon.height / 10} m</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Weight:</span>
                        <span>{pokemon.weight / 10} kg</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Base Exp:</span>
                        <span>{pokemon.base_experience}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Abilities:</span>
                        <span>{pokemon.abilities.length}</span>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
        </>
    );
}