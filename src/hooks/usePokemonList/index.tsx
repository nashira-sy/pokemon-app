import { useEffect, useState } from "react";
import axios from "axios";

export interface PokemonListItem {
  name: string;
  url: string;
  id: number;
  image: string;
}

export function usePokemonList(limit: number = 10000, offset: number = 0) {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = res.data.results.map((p: any) => {
          const id = p.url.split("/").filter(Boolean).pop();
          return {
            name: p.name,
            url: p.url,
            id: Number(id),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });
        setPokemons(data);
      } catch (err) {
        setError("Failed to fetch Pokémon list.");
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, [limit, offset]);

  return { pokemons, loading, error };
}