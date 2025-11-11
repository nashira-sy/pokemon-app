import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import { useState } from "react";
import { useMyPokemons } from "../../hooks/useMyPokemons";
import NicknameModal from "../../components/NicknameModal"; 

// Color map for styling the card
const POKEMON_TYPE_COLORS: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-orange-700',
  poison: 'bg-purple-600',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-600',
  ghost: 'bg-purple-800',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export default function PokemonDetail() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemonDetail(name!); 
  const { add } = useMyPokemons();

  // State for catch logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catchMessage, setCatchMessage] = useState<string | null>(null);

  // 1. Catch Attempt Logic (50% chance)
  const handleCatchAttempt = () => {
    if (!pokemon) return;
    const success = Math.random() < 0.5;

    if (success) {
      setCatchMessage(`✨ Success! You caught ${pokemon.name}! Give it a nickname.`);
      setIsModalOpen(true);
    } else {
      setCatchMessage(`❌ FAILED! ${pokemon.name} broke free! Try again.`);
      setTimeout(() => setCatchMessage(null), 3000);
    }
  };

  // 2. Save Pokemon Logic (Called from NicknameModal)
  const savePokemon = (nickname: string) => {
    if (!pokemon || !nickname.trim()) return;

    // FIX FOR TYPE ERROR: Explicitly convert and assert that the ID is a number
    // to satisfy the 'add' function's type requirements.
    const pokemonIdAsNumber = Number(pokemon.id);

    if (isNaN(pokemonIdAsNumber)) {
        console.error("Invalid Pokémon ID:", pokemon.id);
        setCatchMessage("Error: Pokémon ID is invalid. Cannot save.");
        setIsModalOpen(false);
        return;
    }

    // Call the 'add' function from useMyPokemons
    add({
      id: pokemonIdAsNumber, // Now correctly passed as number
      name: pokemon.name,
      nickname,
      image: pokemon.image,
    });

    setCatchMessage(`✅ ${pokemon.name} saved as "${nickname}"!`);
    setIsModalOpen(false);
    
    // Navigate to "My Pokemon" list after saving
    setTimeout(() => navigate('/my-pokemons'), 1500);
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading Pokémon details...</div>;
  if (error || !pokemon)
    return <div className="text-center text-red-500 mt-10">{error || "Pokémon not found."}</div>;

  const mainType = pokemon.types[0];
  const bgColor = POKEMON_TYPE_COLORS[mainType] || 'bg-gray-500';

  return (
    <div className="max-w-md mx-auto p-4">
      <button onClick={() => navigate('/pokemons')} className="mb-4 text-red-600 dark:text-red-400 hover:text-red-800 transition flex items-center group">
        <svg className="w-5 h-5 mr-1 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to List
      </button>

      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
        {/* Header Card */}
        <div className={`${bgColor} p-6 text-white relative h-40`}>
            <h1 className="text-4xl font-extrabold capitalize drop-shadow-lg relative z-10">{pokemon.name}</h1>
            <span className="font-bold text-lg text-white/70 absolute top-6 right-6 z-10">#{pokemon.id.toString().padStart(3, '0')}</span>
        </div>

        {/* Image Section */}
        <div className="flex justify-center -mt-16 z-10 relative">
            <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-40 h-40 object-contain drop-shadow-2xl"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/160x160/cccccc/333333?text=No+Image" }}
            />
        </div>
        
        {/* Info Section */}
        <div className="p-6 space-y-6">
          <div className="flex justify-center space-x-3">
            {pokemon.types.map(type => (
              <span key={type} className={`px-4 py-1 text-sm font-semibold rounded-full shadow-md text-white capitalize ${POKEMON_TYPE_COLORS[type] || 'bg-gray-500'}`}>
                {type}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-3">Base Stats</h3>
            <div className="space-y-2">
              {pokemon.stats.map(stat => (
                <div key={stat.name} className="flex items-center">
                  <span className="w-1/3 text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">{stat.name}</span>
                  <span className="w-16 text-sm font-bold text-gray-800 dark:text-gray-100">{stat.value}</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className={`${bgColor} h-2.5 rounded-full`} style={{ width: `${Math.min(stat.value / 1.5, 100)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Moves */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">Moves</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed capitalize">
              {pokemon.moves.join(', ')}...
            </p>
          </div>

          {/* Catch Button Area */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
             <button
                onClick={handleCatchAttempt}
                className="w-full py-3 bg-red-500 text-white font-bold rounded-lg shadow-xl hover:bg-red-600 active:bg-red-700 transition transform hover:scale-[1.02] active:scale-[0.98] duration-150 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m-5-4h4m-9-1h14"></path></svg>
                <span>Catch {pokemon.name} (50%)</span>
              </button>
              {catchMessage && (
                <p className={`mt-3 text-center text-sm font-medium ${catchMessage.includes('FAILED') ? 'text-red-600' : 'text-green-600'}`}>
                  {catchMessage}
                </p>
              )}
          </div>
        </div>
      </div>
      
      {/* Nickname Modal */}
      <NicknameModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={savePokemon}
        defaultName={pokemon.name}
      />
    </div>
  );
}