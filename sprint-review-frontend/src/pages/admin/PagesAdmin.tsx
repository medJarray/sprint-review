import React, { useState } from 'react';
import { useSprint } from '../../context/SprintContext';
import type { SprintPage } from '../../types';

const PagesAdmin: React.FC = () => {
  const { state, addPage, removePage, updatePage, updatePages } = useSprint();
  const { pages, styles } = state;

  const [newTitle, setNewTitle] = useState('');

  const sortedPages = [...pages].sort((a, b) => a.order - b.order);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const slug = newTitle
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    addPage({
      id: crypto.randomUUID(),
      title: newTitle.trim(),
      slug,
      order: pages.length,
      type: 'custom',
      content: { sections: [] },
      visible: true,
    });
    setNewTitle('');
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const reordered = [...sortedPages];
    [reordered[index - 1], reordered[index]] = [reordered[index], reordered[index - 1]];
    updatePages(reordered.map((p, i) => ({ ...p, order: i })));
  };

  const moveDown = (index: number) => {
    if (index === sortedPages.length - 1) return;
    const reordered = [...sortedPages];
    [reordered[index], reordered[index + 1]] = [reordered[index + 1], reordered[index]];
    updatePages(reordered.map((p, i) => ({ ...p, order: i })));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">📄 Gestion des pages</h2>

      {/* Ajouter */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Titre de la nouvelle page"
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: styles.primaryColor }}
        >
          Ajouter
        </button>
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {sortedPages.map((page, index) => (
          <div
            key={page.id}
            className="border rounded-lg p-3 flex items-center gap-3"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="text-xs disabled:opacity-20"
              >
                ▲
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === sortedPages.length - 1}
                className="text-xs disabled:opacity-20"
              >
                ▼
              </button>
            </div>
            <div className="flex-1">
              <p className="font-medium">{page.title}</p>
              <p className="text-xs opacity-50">/{page.slug || '(accueil)'}</p>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{page.type}</span>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={page.visible}
                onChange={(e) => updatePage(page.id, { visible: e.target.checked })}
              />
              Visible
            </label>
            {page.type === 'custom' && (
              <button
                onClick={() => removePage(page.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Supprimer
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagesAdmin;
