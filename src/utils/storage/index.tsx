import { CaughtPokemon, CaughtPokemonBase } from "../../types";

const POKEMON_STORAGE_KEY = "myCaughtPokemons";

export const loadPokemons = (): CaughtPokemon[] => {
  try {
    const data = localStorage.getItem(POKEMON_STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as CaughtPokemon[];
    }
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
  }
  return [];
};

export const savePokemons = (pokemons: CaughtPokemon[]): void => {
  try {
    localStorage.setItem(POKEMON_STORAGE_KEY, JSON.stringify(pokemons));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};


export const createCaughtPokemon = (pokemonData: CaughtPokemonBase): CaughtPokemon => {
  const catchId = Date.now().toString() + "-" + Math.random().toString(36).substr(2, 9);

  return {
    ...pokemonData,
    catchId: catchId,
    caughtAt: new Date().toISOString(),
  };
};