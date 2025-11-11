import { useEffect, useState } from "react";
import axios from "axios";

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  types: string[];
  moves: string[];
  stats: { name: string; value: number }[];
  height: number;
  weight: number;
}

export function usePokemonDetail(name: string) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    async function fetchPokemonDetail() {
      try {
        setLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
 
        const data = res.data;
        const shapedDetail: PokemonDetail = {
          id: data.id,
          name: data.name,
          image: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default,
          types: data.types.map((t: any) => t.type.name),
          moves: data.moves.slice(0, 8).map((m: any) => m.move.name.replace('-', ' ')),
          stats: data.stats.map((s: any) => ({
            name: s.stat.name.replace('-', ' '),
            value: s.base_stat,
          })),
          height: data.height,
          weight: data.weight,
        };

        setPokemon(shapedDetail);
      } catch (err) {
        setError("Failed to fetch Pokémon details.");
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonDetail();
  }, [name]);

  return { pokemon, loading, error };
}