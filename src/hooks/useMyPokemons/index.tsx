import { useState, useEffect, useCallback } from "react";
import { CaughtPokemon, CaughtPokemonBase } from "../../types";
import { loadPokemons, savePokemons, createCaughtPokemon } from "../../utils/storage";

interface UseMyPokemonsResult {
  list: CaughtPokemon[];
  add: (pokemonData: CaughtPokemonBase) => void;
  remove: (catchId: string) => void;
}

export const useMyPokemons = (): UseMyPokemonsResult => {
  const [list, setList] = useState<CaughtPokemon[]>(loadPokemons());

  useEffect(() => {
    savePokemons(list);
  }, [list]);

  const add = useCallback((pokemonData: CaughtPokemonBase) => {
    const newPokemon = createCaughtPokemon(pokemonData);

    setList(prevList => [...prevList, newPokemon]);
  }, []);

  const remove = useCallback((catchId: string) => {
    setList(prevList => prevList.filter(p => p.catchId !== catchId));
  }, []);

  return {
    list,
    add,
    remove,
  };
};