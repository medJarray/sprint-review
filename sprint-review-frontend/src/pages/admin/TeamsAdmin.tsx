import React, { useState } from 'react';
import { useSprint } from '../../context/SprintContext';
import type { Team, TeamMember } from '../../types';

const TeamsAdmin: React.FC = () => {
  const { state, addTeam, removeTeam, updateTeams } = useSprint();
  const { teams, styles } = state;

  const [newTeamName, setNewTeamName] = useState('');
  const [newMember, setNewMember] = useState<Record<string, { name: string; role: string }>>({});

  const handleAddTeam = () => {
    if (!newTeamName.trim()) return;
    addTeam({
      id: crypto.randomUUID(),
      name: newTeamName.trim(),
      members: [],
    });
    setNewTeamName('');
  };

  const handleAddMember = (teamId: string) => {
    const member = newMember[teamId];
    if (!member?.name.trim()) return;
    const updated = teams.map((t) =>
      t.id === teamId
        ? {
            ...t,
            members: [
              ...t.members,
              {
                id: crypto.randomUUID(),
                name: member.name.trim(),
                role: member.role.trim() || 'Développeur',
              },
            ],
          }
        : t
    );
    updateTeams(updated);
    setNewMember((prev) => ({ ...prev, [teamId]: { name: '', role: '' } }));
  };

  const handleRemoveMember = (teamId: string, memberId: string) => {
    const updated = teams.map((t) =>
      t.id === teamId
        ? { ...t, members: t.members.filter((m) => m.id !== memberId) }
        : t
    );
    updateTeams(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">👥 Gestion des équipes</h2>

      {/* Ajouter une équipe */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTeam()}
          placeholder="Nom de l'équipe"
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleAddTeam}
          className="px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: styles.primaryColor }}
        >
          Ajouter
        </button>
      </div>

      {/* Liste des équipes */}
      {teams.map((team) => (
        <div key={team.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">{team.name}</h3>
            <button
              onClick={() => removeTeam(team.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Supprimer l'équipe
            </button>
          </div>

          {/* Membres */}
          <ul className="space-y-2 mb-3">
            {team.members.map((member) => (
              <li key={member.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>
                  {member.name} — <span className="text-sm opacity-60">{member.role}</span>
                </span>
                <button
                  onClick={() => handleRemoveMember(team.id, member.id)}
                  className="text-red-400 hover:text-red-600 text-xs"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          {/* Ajouter un membre */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newMember[team.id]?.name ?? ''}
              onChange={(e) =>
                setNewMember((prev) => ({
                  ...prev,
                  [team.id]: { ...prev[team.id], name: e.target.value },
                }))
              }
              placeholder="Nom"
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <input
              type="text"
              value={newMember[team.id]?.role ?? ''}
              onChange={(e) =>
                setNewMember((prev) => ({
                  ...prev,
                  [team.id]: { ...prev[team.id], role: e.target.value },
                }))
              }
              placeholder="Rôle"
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <button
              onClick={() => handleAddMember(team.id)}
              className="px-3 py-2 text-white rounded-lg text-sm"
              style={{ backgroundColor: styles.primaryColor }}
            >
              +
            </button>
          </div>
        </div>
      ))}

      {teams.length === 0 && (
        <p className="text-center opacity-50 py-4">Aucune équipe pour le moment.</p>
      )}
    </div>
  );
};

export default TeamsAdmin;
