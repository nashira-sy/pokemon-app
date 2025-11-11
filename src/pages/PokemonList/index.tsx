import { useNavigate } from "react-router-dom";
import PokemonCard from "../../components/PokemonCard";
import { usePokemonList } from "../../hooks/usePokemonList";

export default function PokemonList() {
  const { pokemons, loading, error } = usePokemonList(10000);
  const navigate = useNavigate();

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading Pokémons...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Pokémon List</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemons.map((p) => (
          <PokemonCard
            key={p.id}
            name={p.name}
            image={p.image}
            id={p.id}
            // Navigation to the detail page
            onClick={() => navigate(`/pokemon/${p.name}`)}
          />
        ))}
      </div>
    </div>
  );
}