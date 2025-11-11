import axios from 'axios';
import { PokemonListItem, PokemonDetail, Stat } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';


const cleanName = (name: string): string => {
  return name
    .replace('-', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const fetchPokemonList = async (limit: number): Promise<PokemonListItem[]> => {
  const url = `${BASE_URL}/pokemon?limit=${limit}`;
  const response = await axios.get(url);
  
  const results = response.data.results.map((p: any) => {
    const id = p.url.split('/').filter(Boolean).pop();

    return {
      name: p.name,
      id: Number(id),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    } as PokemonListItem;
  });

  return results;
};

export const fetchPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const url = `${BASE_URL}/pokemon/${name}`;
  const response = await axios.get(url);
  const data = response.data;

  const stats: Stat[] = data.stats.map((s: any) => ({
    name: cleanName(s.stat.name),
    value: s.base_stat,
  }));

  const moves: string[] = data.moves
    .slice(0, 8)
    .map((m: any) => cleanName(m.move.name));

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default,
    types: data.types.map((t: any) => t.type.name),
    moves: moves,
    stats: stats,
    height: data.height,
    weight: data.weight,
  } as PokemonDetail;
};