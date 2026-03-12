import React, { useState } from 'react';
import { useSprint } from '../context/SprintContext';
import Card from '../components/common/Card';

const DemoPage: React.FC = () => {
  const { state } = useSprint();
  const { sprint, userStories, teams, styles } = state;

  const doneStories = userStories.filter((s) => s.status === 'done');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const getTeamName = (teamId: string): string =>
    teams.find((t) => t.id === teamId)?.name ?? 'Équipe inconnue';

  return (
    <div className="space-y-8">
      <h1
        className="text-3xl font-bold"
        style={{ fontFamily: styles.headingFontFamily, color: styles.primaryColor }}
      >
        🎬 Démo — Sprint {sprint.number}
      </h1>

      {doneStories.length === 0 ? (
        <Card>
          <p className="text-center py-8 opacity-60">
            Aucune story terminée à présenter. Ajoutez des user stories depuis l'administration.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Liste des stories */}
          <div className="space-y-2">
            <h3 className="font-semibold mb-2">Stories à présenter</h3>
            {doneStories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeIndex === index
                    ? 'text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                style={
                  activeIndex === index
                    ? { backgroundColor: styles.primaryColor }
                    : undefined
                }
              >
                <span className="text-sm font-medium">{story.title}</span>
                <span className="block text-xs opacity-70 mt-1">
                  {story.points} pts — {getTeamName(story.teamId)}
                </span>
              </button>
            ))}
          </div>

          {/* Détail de la story */}
          <div className="md:col-span-3">
            {doneStories[activeIndex] && (
              <Card title={doneStories[activeIndex].title}>
                <div className="space-y-4">
                  <p>{doneStories[activeIndex].description}</p>
                  <div className="flex gap-4 text-sm">
                    <span
                      className="px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: styles.accentColor }}
                    >
                      {doneStories[activeIndex].points} points
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">
                      ✅ Terminé
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100">
                      {getTeamName(doneStories[activeIndex].teamId)}
                    </span>
                  </div>
                  <div
                    className="mt-6 p-8 border-2 border-dashed rounded-lg text-center opacity-50"
                    style={{ borderColor: styles.primaryColor }}
                  >
                    📺 Zone de démonstration
                    <br />
                    <span className="text-sm">
                      Présentez votre fonctionnalité ici
                    </span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeIndex === 0}
                    className="px-4 py-2 rounded-lg disabled:opacity-30 text-white"
                    style={{ backgroundColor: styles.primaryColor }}
                  >
                    ← Précédent
                  </button>
                  <span className="self-center text-sm opacity-50">
                    {activeIndex + 1} / {doneStories.length}
                  </span>
                  <button
                    onClick={() =>
                      setActiveIndex((prev) =>
                        Math.min(doneStories.length - 1, prev + 1)
                      )
                    }
                    disabled={activeIndex === doneStories.length - 1}
                    className="px-4 py-2 rounded-lg disabled:opacity-30 text-white"
                    style={{ backgroundColor: styles.primaryColor }}
                  >
                    Suivant →
                  </button>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoPage;
