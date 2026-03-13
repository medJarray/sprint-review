import React from 'react';
import { useSprint } from '../context/SprintContext';
import Card from '../components/common/Card';
import type { UserStory } from '../types';

const statusLabels: Record<UserStory['status'], string> = {
  done: '✅ Terminé',
  'in-progress': '🔄 En cours',
  'not-started': '⏳ Non démarré',
  blocked: '🚫 Bloqué',
};

const statusColors: Record<UserStory['status'], string> = {
  done: '#10B981',
  'in-progress': '#3B82F6',
  'not-started': '#9CA3AF',
  blocked: '#EF4444',
};

const ReviewPage: React.FC = () => {
  const { state } = useSprint();
  const { sprint, userStories, teams, styles } = state;

  const storiesByStatus = (status: UserStory['status']): UserStory[] =>
    userStories.filter((s) => s.status === status);

  const getTeamName = (teamId: string): string =>
    teams.find((t) => t.id === teamId)?.name ?? 'Équipe inconnue';

  return (
    <div className="space-y-8">
      <h1
        className="text-3xl font-bold"
        style={{ fontFamily: styles.headingFontFamily, color: styles.primaryColor }}
      >
        📝 Revue — Sprint {sprint.number}
      </h1>
      <p className="text-lg opacity-70">🎯 Objectif : {sprint.goal}</p>

      {/* Colonnes Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(['done', 'in-progress', 'not-started', 'blocked'] as const).map((status) => (
          <div key={status}>
            <h3
              className="font-semibold mb-3 px-2 py-1 rounded text-white text-center"
              style={{ backgroundColor: statusColors[status] }}
            >
              {statusLabels[status]} ({storiesByStatus(status).length})
            </h3>
            <div className="space-y-2">
              {storiesByStatus(status).map((story) => (
                <Card key={story.id} className="!p-4">
                  <h4 className="font-medium text-sm">{story.title}</h4>
                  <p className="text-xs opacity-60 mt-1">{story.description}</p>
                  <div className="flex justify-between items-center mt-3 text-xs">
                    <span
                      className="px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: styles.accentColor }}
                    >
                      {story.points} pts
                    </span>
                    <span className="opacity-50">{getTeamName(story.teamId)}</span>
                  </div>
                </Card>
              ))}
              {storiesByStatus(status).length === 0 && (
                <p className="text-center text-sm opacity-40 py-4">Aucune story</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
