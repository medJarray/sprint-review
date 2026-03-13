import React, { useState } from 'react';
import { useSprint } from '../context/SprintContext';
import Card from '../components/common/Card';

interface RetroItem {
  id: string;
  text: string;
}

const RetroPage: React.FC = () => {
  const { state } = useSprint();
  const { sprint, styles } = state;

  const [positives, setPositives] = useState<RetroItem[]>([]);
  const [negatives, setNegatives] = useState<RetroItem[]>([]);
  const [actions, setActions] = useState<RetroItem[]>([]);

  const [newPositive, setNewPositive] = useState('');
  const [newNegative, setNewNegative] = useState('');
  const [newAction, setNewAction] = useState('');

  const addItem = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<RetroItem[]>>,
    clearInput: () => void
  ) => {
    if (!text.trim()) return;
    setter((prev) => [...prev, { id: crypto.randomUUID(), text: text.trim() }]);
    clearInput();
  };

  const removeItem = (
    id: string,
    setter: React.Dispatch<React.SetStateAction<RetroItem[]>>
  ) => {
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const renderColumn = (
    title: string,
    emoji: string,
    color: string,
    items: RetroItem[],
    setter: React.Dispatch<React.SetStateAction<RetroItem[]>>,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <div>
      <h3
        className="font-semibold text-lg mb-3 p-2 rounded text-white text-center"
        style={{ backgroundColor: color }}
      >
        {emoji} {title}
      </h3>
      <div className="space-y-2 mb-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow p-3 rounded-lg flex justify-between items-start"
          >
            <span className="text-sm">{item.text}</span>
            <button
              onClick={() => removeItem(item.id, setter)}
              className="text-red-400 hover:text-red-600 ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) =>
            e.key === 'Enter' && addItem(inputValue, setter, () => setInputValue(''))
          }
          placeholder="Ajouter..."
          className="flex-1 px-3 py-2 border rounded-lg text-sm"
        />
        <button
          onClick={() => addItem(inputValue, setter, () => setInputValue(''))}
          className="px-3 py-2 text-white rounded-lg text-sm"
          style={{ backgroundColor: color }}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1
        className="text-3xl font-bold"
        style={{ fontFamily: styles.headingFontFamily, color: styles.primaryColor }}
      >
        🔄 Rétrospective — Sprint {sprint.number}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderColumn(
          'Ce qui a bien marché',
          '😊',
          '#10B981',
          positives,
          setPositives,
          newPositive,
          setNewPositive
        )}
        {renderColumn(
          'Ce qui peut être amélioré',
          '😕',
          '#EF4444',
          negatives,
          setNegatives,
          newNegative,
          setNewNegative
        )}
        {renderColumn(
          'Actions à entreprendre',
          '🎯',
          '#3B82F6',
          actions,
          setActions,
          newAction,
          setNewAction
        )}
      </div>

      {state.metrics.satisfaction !== undefined && (
        <Card title="Satisfaction de l'équipe">
          <div className="text-center">
            <span className="text-5xl">
              {state.metrics.satisfaction >= 4
                ? '😄'
                : state.metrics.satisfaction >= 3
                ? '🙂'
                : state.metrics.satisfaction >= 2
                ? '😐'
                : '😞'}
            </span>
            <p className="text-2xl font-bold mt-2">
              {state.metrics.satisfaction}/5
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RetroPage;
