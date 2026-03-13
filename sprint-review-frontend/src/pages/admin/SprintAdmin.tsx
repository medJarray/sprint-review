import React from 'react';
import { useSprint } from '../../context/SprintContext';

const SprintAdmin: React.FC = () => {
  const { state, updateSprint, updateMetrics } = useSprint();
  const { sprint, metrics } = state;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">🏃 Informations du Sprint</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Numéro du sprint</label>
          <input
            type="number"
            value={sprint.number}
            onChange={(e) => updateSprint({ number: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nom du sprint</label>
          <input
            type="text"
            value={sprint.name}
            onChange={(e) => updateSprint({ name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date de début</label>
          <input
            type="date"
            value={sprint.startDate.split('T')[0]}
            onChange={(e) => updateSprint({ startDate: new Date(e.target.value).toISOString() })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date de fin</label>
          <input
            type="date"
            value={sprint.endDate.split('T')[0]}
            onChange={(e) => updateSprint({ endDate: new Date(e.target.value).toISOString() })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Objectif du sprint</label>
          <textarea
            value={sprint.goal}
            onChange={(e) => updateSprint({ goal: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8">📊 Métriques</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Vélocité</label>
          <input
            type="number"
            value={metrics.velocity}
            onChange={(e) => updateMetrics({ velocity: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Points planifiés</label>
          <input
            type="number"
            value={metrics.plannedPoints}
            onChange={(e) => updateMetrics({ plannedPoints: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Points complétés</label>
          <input
            type="number"
            value={metrics.completedPoints}
            onChange={(e) => updateMetrics({ completedPoints: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Satisfaction (1-5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={metrics.satisfaction ?? ''}
            onChange={(e) =>
              updateMetrics({
                satisfaction: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SprintAdmin;
