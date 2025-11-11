import { useMyPokemons } from "../../hooks/useMyPokemons";
import PokemonCard from "../../components/PokemonCard";
import { useNavigate } from "react-router-dom";

export default function MyPokemonList() {
  const { list, remove } = useMyPokemons();
  const navigate = useNavigate();

  const sortedList = [...list].sort((a, b) => new Date(b.caughtAt).getTime() - new Date(a.caughtAt).getTime());

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">My Pokémon List</h2>

      {sortedList.length === 0 ? (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <p className="text-gray-500 dark:text-gray-400 text-lg">You haven't caught any Pokémons yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedList.map(p => (
            <PokemonCard
              key={p.catchId}
              name={p.name}
              nickname={p.nickname} 
              image={p.image}
              onClick={() => navigate(`/pokemon/${p.name}`)} 
              onRelease={() => remove(p.catchId)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}