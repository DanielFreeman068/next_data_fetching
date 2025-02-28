// app/page.js (Server Component)
import PokemonGrid from './components/PokemonGrid';

// This is a Server Component that fetches data
async function getPokemonData() {
    try {
        // Fetch initial Pokémon list data
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12', { next: { revalidate: 3600 } });
        const data = await response.json();
        
        // For each Pokémon in the list, fetch detailed information
        const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url, { next: { revalidate: 3600 } });
            return await detailResponse.json();
        })
        );
        
        return { pokemonList: pokemonDetails, error: null };
        
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return { error: 'Failed to load Pokémon data', pokemonList: [] };
    }
    }

    export default async function Home() {
    const { pokemonList, error } = await getPokemonData();
    
    return (
        <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Pokémon Explorer</h1>
            
            {/* Error handling */}
            {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
            </div>
            )}
            
            {/* Pass the data to the client component */}
            <PokemonGrid initialPokemonList={pokemonList} />
        </main>
        
        <footer className="py-6 text-center text-gray-500">
            <p>Created with Next.js and PokeAPI</p>
        </footer>
        </div>
    );
}