// app/api/pokemon/route.js (API Route)
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Fetch initial Pokémon list data
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const data = await response.json();
        
        // For each Pokémon in the list, fetch detailed information
        const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
        })
        );
        
        return NextResponse.json({ 
        pokemonList: pokemonDetails 
        });
        
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return NextResponse.json(
        { error: 'Failed to load Pokémon data', pokemonList: [] },
        { status: 500 }
        );
    }
}