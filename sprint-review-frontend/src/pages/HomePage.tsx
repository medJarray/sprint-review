import React from 'react';
import { useSprint } from '../context/SprintContext';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';

const HomePage: React.FC = () => {
  const { state } = useSprint();
  const { sprint, teams, character, metrics, styles } = state;

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section
        className="text-white p-8 text-center"
        style={{
          borderRadius: `${styles.borderRadius}px`,
          background: `linear-gradient(135deg, ${styles.primaryColor}, ${styles.secondaryColor})`,
        }}
      >
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: styles.headingFontFamily }}
        >
          🏃 Sprint {sprint.number} — {sprint.name}
        </h1>
        <p className="text-lg opacity-90">
          {formatDate(sprint.startDate)} → {formatDate(sprint.endDate)}
        </p>
        <p className="mt-4 text-xl">🎯 {sprint.goal}</p>
      </section>

      {/* Personnage / Mascotte */}
      {character.name && (
        <Card title="Votre guide">
          <div className="flex items-center gap-6">
            {character.imageUrl && (
              <img
                src={character.imageUrl}
                alt={character.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
            <div>
              <h4 className="text-xl font-semibold">{character.name}</h4>
              <p className="opacity-70">{character.description}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Métriques */}
      <section>
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: styles.headingFontFamily, color: styles.primaryColor }}
        >
          📊 Métriques du Sprint
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            label="Vélocité"
            value={metrics.velocity}
            icon="⚡"
            trend="neutral"
          />
          <MetricCard
            label="Points planifiés"
            value={metrics.plannedPoints}
            icon="📋"
          />
          <MetricCard
            label="Points complétés"
            value={metrics.completedPoints}
            icon="✅"
            trend={
              metrics.completedPoints >= metrics.plannedPoints
                ? 'up'
                : metrics.completedPoints > 0
                ? 'down'
                : 'neutral'
            }
          />
        </div>
      </section>

      {/* Équipes */}
      <section>
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: styles.headingFontFamily, color: styles.primaryColor }}
        >
          👥 Équipes
        </h2>
        {teams.length === 0 ? (
          <Card>
            <p className="text-center opacity-60">
              Aucune équipe configurée. Rendez-vous dans l'administration pour en ajouter.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.map((team) => (
              <Card key={team.id} title={team.name}>
                <ul className="space-y-2">
                  {team.members.map((member) => (
                    <li key={member.id} className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                        {member.name.charAt(0)}
                      </span>
                      <span>{member.name}</span>
                      <span className="text-xs opacity-50 ml-auto">{member.role}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
