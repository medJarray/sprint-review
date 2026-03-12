import React from 'react';
import { useSprint } from '../../context/SprintContext';

const CharacterAdmin: React.FC = () => {
  const { state, updateCharacter } = useSprint();
  const { character } = state;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">🎭 Personnage / Mascotte</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            value={character.name}
            onChange={(e) => updateCharacter({ name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL de l'image</label>
          <input
            type="url"
            value={character.imageUrl}
            onChange={(e) => updateCharacter({ imageUrl: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="https://..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={character.description}
            onChange={(e) => updateCharacter({ description: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          />
        </div>
      </div>

      {/* Prévisualisation */}
      {character.name && (
        <div className="border rounded-lg p-4 flex items-center gap-4">
          {character.imageUrl ? (
            <img
              src={character.imageUrl}
              alt={character.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
              🎭
            </div>
          )}
          <div>
            <p className="font-semibold">{character.name}</p>
            <p className="text-sm opacity-60">{character.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterAdmin;
