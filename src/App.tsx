import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useMyPokemons } from './hooks/useMyPokemons';
import Header from './components/Header';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import MyPokemonList from './pages/MyPokemonList';

const App = () => {
  const { list } = useMyPokemons();
  const myPokemonCount = list.length;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
        <Header myPokemonCount={myPokemonCount} />
        <main className="pt-20 pb-8"> 
          <Routes>
            <Route path="/pokemons" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
            <Route path="/my-pokemons" element={<MyPokemonList />} />
\            <Route path="/" element={<Navigate to="/pokemons" replace />} />
\            {/* 404/Not Found Route */}
            <Route 
              path="*" 
              element={
                <div className="text-center mt-10 text-xl font-semibold text-gray-700 dark:text-gray-300">
                  404: Page Not Found
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;