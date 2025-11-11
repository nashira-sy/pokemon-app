export interface Stat {
  name: string;
  value: number;
}

export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
  image: string; 
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  types: string[];
  moves: string[]; 
  stats: Stat[];
  height: number;
  weight: number;
}


export interface CaughtPokemonBase {
  id: number; 
  name: string; 
  nickname: string; 
  image: string; 
}


export interface CaughtPokemon extends CaughtPokemonBase {
  catchId: string; 
  caughtAt: string; 
}