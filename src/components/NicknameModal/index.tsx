import React, { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (nickname: string) => void;
  defaultName: string;
}

export default function NicknameModal({ isOpen, onClose, onSave, defaultName }: Props) {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNickname(defaultName.charAt(0).toUpperCase() + defaultName.slice(1));
      setError("");
    }
  }, [isOpen, defaultName]);

  const handleSave = () => {
    const v = nickname.trim();
    if (!v) {
        setError("Nickname is required");
        return;
    }
    onSave(v);
    setNickname("");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Name Your Pokémon!</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">You successfully caught **{defaultName}**! Give it a unique nickname to save it to your list.</p>
        
        <input
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            if (error) setError(""); // Clear error on input
          }}
          placeholder="Enter nickname"
          className={`w-full px-4 py-2 border rounded-lg text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        
        <div className="flex justify-end space-x-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}