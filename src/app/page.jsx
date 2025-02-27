"use client"; // Required for fetching in App Router

import { useEffect, useState } from "react";

export default function PokemonPage() {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetch("/api/pokemon")
            .then((res) => res.json())
            .then((data) => setPokemon(data));
    }, []);

    if (!pokemon) return <p>Loading...</p>;

    return (
        <div>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <p>ID: {pokemon.id}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
    );
}
