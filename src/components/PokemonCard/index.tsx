import React from "react";

interface Props {
  name: string; 
  image: string;
  onClick: () => void;
  id?: number; 
  nickname?: string;
  onRelease?: () => void;
}

export default function PokemonCard({ name, image, id, nickname, onRelease, onClick }: Props) {
  const displayId = id?.toString().padStart(3, '0') || '';
  
  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col items-center text-center transition-all duration-200 cursor-pointer hover:shadow-xl hover:scale-[1.03]"
    >
      <div 
        onClick={onClick}
        className="flex flex-col items-center text-center w-full"
      >
        <img 
          src={image} 
          alt={name} 
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain mb-2 transition-transform duration-300 group-hover:scale-110" 
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/128x128/cccccc/333333?text=N/A" }}
        />
        <div className="font-semibold text-lg capitalize text-gray-800 dark:text-gray-100">
          {nickname || name}
        </div>
        <div className="text-sm text-gray-500">
          {nickname ? `(${name})` : `#${displayId}`}
        </div>
      </div>

      {onRelease && (
        <button
          onClick={onRelease}
          className="mt-3 w-full px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition"
        >
          Release
        </button>
      )}
    </div>
  );
}