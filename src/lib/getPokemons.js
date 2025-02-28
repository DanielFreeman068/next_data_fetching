// this javascript file uses a regular fetch async function to call an api and return the data. the reason i chose this one is because i spent hours trying to get the other ones to work and miserable failed
export async function getPokemons() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100", {
        next: { revalidate: 60 }
    });
    const data = await res.json();

    const pokemons = await Promise.all(
        data.results.map(async (pokemon) => {
            const detailsRes = await fetch(pokemon.url, {
                next: { revalidate: 60 }
            });
            const details = await detailsRes.json();
            return {
                name: pokemon.name,
                image: details.sprites.front_default,
                types: details.types.map(type => type.type.name),
                abilities: details.abilities.map(ability => ability.ability.name),
                stats: details.stats.map(stat => ({
                    name: stat.stat.name,
                    base_stat: stat.base_stat
                }))
            };
        })
    );

    return pokemons;
}
