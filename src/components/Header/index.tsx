import { Link, useLocation } from "react-router-dom";

interface Props {
  myPokemonCount: number;
}

export default function Header({ myPokemonCount }: Props) {
  const loc = useLocation();
    const onPokemonsPage = loc.pathname.startsWith("/pokemons") || loc.pathname.startsWith("/pokemon/");
  const onMyPokemonsPage = loc.pathname === "/my-pokemons";

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/pokemons" className="text-2xl font-bold text-red-600">PokéApp</Link>
        <div className="flex gap-3">
          <Link 
            className={`px-3 py-1 rounded-md font-medium transition ${onPokemonsPage ? "bg-red-600 text-white" : "text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-gray-700"}`} 
            to="/pokemons"
          >
            Pokémons
          </Link>
          <Link 
            className={`px-3 py-1 rounded-md font-medium transition relative ${onMyPokemonsPage ? "bg-red-600 text-white" : "text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-gray-700"}`} 
            to="/my-pokemons"
          >
            My Pokémons
            {/* --- NEW BADGE --- */}
            {myPokemonCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {myPokemonCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}