export async function GET() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
    const pokemon = await res.json();
    return Response.json(pokemon);
}
