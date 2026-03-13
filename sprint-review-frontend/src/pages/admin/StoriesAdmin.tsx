import React, { useState } from 'react';
import { useSprint } from '../../context/SprintContext';
import type { UserStory } from '../../types';

const StoriesAdmin: React.FC = () => {
  const { state, addUserStory, removeUserStory, updateUserStories } = useSprint();
  const { userStories, teams, styles } = state;

  const [form, setForm] = useState<Omit<UserStory, 'id'>>({
    title: '',
    description: '',
    points: 0,
    status: 'not-started',
    teamId: teams[0]?.id ?? '',
    assignee: '',
  });

  const handleAdd = () => {
    if (!form.title.trim()) return;
    addUserStory({ ...form, id: crypto.randomUUID() });
    setForm({
      title: '',
      description: '',
      points: 0,
      status: 'not-started',
      teamId: teams[0]?.id ?? '',
      assignee: '',
    });
  };

  const handleStatusChange = (id: string, status: UserStory['status']) => {
    const updated = userStories.map((s) => (s.id === id ? { ...s, status } : s));
    updateUserStories(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">📝 User Stories</h2>

      {/* Formulaire */}
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-medium">Ajouter une user story</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Titre"
            className="px-3 py-2 border rounded-lg"
          />
          <select
            value={form.status}
            onChange={(e) =>
              setForm((f) => ({ ...f, status: e.target.value as UserStory['status'] }))
            }
            className="px-3 py-2 border rounded-lg"
          >
            <option value="not-started">Non démarré</option>
            <option value="in-progress">En cours</option>
            <option value="done">Terminé</option>
            <option value="blocked">Bloqué</option>
          </select>
          <input
            type="number"
            value={form.points}
            onChange={(e) => setForm((f) => ({ ...f, points: parseInt(e.target.value) || 0 }))}
            placeholder="Points"
            className="px-3 py-2 border rounded-lg"
          />
          <select
            value={form.teamId}
            onChange={(e) => setForm((f) => ({ ...f, teamId: e.target.value }))}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">— Sélectionner une équipe —</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Description"
            className="px-3 py-2 border rounded-lg md:col-span-2"
            rows={2}
          />
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: styles.primaryColor }}
        >
          Ajouter la story
        </button>
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {userStories.map((story) => (
          <div key={story.id} className="border rounded-lg p-3 flex items-center gap-4">
            <select
              value={story.status}
              onChange={(e) =>
                handleStatusChange(story.id, e.target.value as UserStory['status'])
              }
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="not-started">⏳ Non démarré</option>
              <option value="in-progress">🔄 En cours</option>
              <option value="done">✅ Terminé</option>
              <option value="blocked">🚫 Bloqué</option>
            </select>
            <div className="flex-1">
              <p className="font-medium text-sm">{story.title}</p>
              <p className="text-xs opacity-60">{story.description}</p>
            </div>
            <span className="text-sm font-semibold">{story.points} pts</span>
            <button
              onClick={() => removeUserStory(story.id)}
              className="text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
        {userStories.length === 0 && (
          <p className="text-center opacity-50 py-4">Aucune user story.</p>
        )}
      </div>
    </div>
  );
};

export default StoriesAdmin;
