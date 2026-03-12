import React from 'react';
import { useSprint } from '../../context/SprintContext';

interface SlideCoverProps {
  activeAgendaIndex?: number; // -1 or undefined = nothing highlighted, 0-5 = that item
}

const agendaItems = [
  { num: 1, title: 'Objectifs du Sprint', desc: 'Revue des engagements initiaux (SMART)', numBg: 'bg-blue-100', numText: 'text-blue-700', icon: 'fa-bullseye', iconClass: 'text-blue-200' },
  { num: 2, title: 'Backlog & User Stories', desc: 'État du backlog prévu vs réalisé', numBg: 'bg-indigo-100', numText: 'text-indigo-700', icon: 'fa-tasks', iconClass: 'text-indigo-200' },
  { num: 3, title: 'Réalisations Livrées', desc: 'Fonctionnalités complétées (DoD OK)', numBg: 'bg-green-100', numText: 'text-green-700', icon: 'fa-check-circle', iconClass: 'text-green-500' },
  { num: 4, title: 'Démonstration', desc: 'Présentation visuelle & Interactive', numBg: 'bg-purple-100', numText: 'text-purple-700', icon: 'fa-desktop', iconClass: 'text-purple-200' },
  { num: 5, title: 'Métriques du Sprint', desc: 'Vélocité, Burndown & Qualité', numBg: 'bg-orange-100', numText: 'text-orange-700', icon: 'fa-chart-line', iconClass: 'text-orange-200' },
  { num: 6, title: 'Prochaines Étapes & Q/R', desc: 'Planning & Feedback stakeholders', numBg: 'bg-gray-100', numText: 'text-gray-700', icon: 'fa-comments', iconClass: 'text-gray-200' },
];

const SlideCover: React.FC<SlideCoverProps> = ({ activeAgendaIndex = -1 }) => {
  const { state } = useSprint();
  const { sprint, teams, character } = state;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="w-full h-full flex relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-atlassian-light z-0 skew-x-12 transform origin-top-right translate-x-20" />

      {/* Left Column */}
      <div className="w-5/12 bg-atlassian-blue text-white p-12 flex flex-col justify-between relative z-10">
        <div className="flex items-center space-x-3 opacity-90">
          <i className="fab fa-jira text-3xl" />
          <span className="text-lg font-medium tracking-wide border-l border-blue-400 pl-3 uppercase">
            {sprint.name || 'Projet Alpha'}
          </span>
        </div>

        <div className="mt-8">
          <div className="inline-flex items-center px-3 py-1 bg-blue-800 rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-blue-200">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2" />
            Sprint Review
          </div>
          <h1 className="text-6xl font-extrabold leading-tight mb-4 tracking-tight">
            Sprint Review <br />&amp; Démo
          </h1>
          <p className="text-2xl text-blue-100 font-light border-l-4 border-blue-400 pl-4 mt-6">
            Sprint #{sprint.number} : {sprint.goal || sprint.name}
          </p>
        </div>

        <div className="bg-blue-900 bg-opacity-30 rounded-xl p-6 mt-8 backdrop-filter backdrop-blur-sm border border-blue-700 border-opacity-50">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <p className="text-blue-300 text-xs uppercase font-bold mb-1 tracking-wider">Période du Sprint</p>
              <p className="font-semibold text-white flex items-center">
                <i className="far fa-calendar-alt mr-2 opacity-70" />
                {formatDate(sprint.startDate)} – {formatDate(sprint.endDate)}
              </p>
            </div>
            <div>
              <p className="text-blue-300 text-xs uppercase font-bold mb-1 tracking-wider">Version Livrée</p>
              <p className="font-semibold text-white flex items-center">
                <i className="fas fa-tag mr-2 opacity-70" />
                v{sprint.number}.0.0 (Staging)
              </p>
            </div>
            <div className="col-span-2 border-t border-blue-700 pt-4 mt-2">
              <p className="text-blue-300 text-xs uppercase font-bold mb-2 tracking-wider">Squad &amp; Rôles</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {teams.length > 0 ? (
                      <>
                        {teams.slice(0, 2).map((team) => (
                          <div key={team.id} className="w-8 h-8 rounded-full bg-blue-200 border-2 border-blue-800 flex items-center justify-center text-xs font-bold text-blue-900">
                            {team.name.substring(0, 2).toUpperCase()}
                          </div>
                        ))}
                        {teams.length > 2 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-blue-800 flex items-center justify-center text-xs font-bold text-gray-700">+{teams.length - 2}</div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-blue-800 flex items-center justify-center text-xs font-bold text-blue-900">AM</div>
                        <div className="w-8 h-8 rounded-full bg-indigo-200 border-2 border-blue-800 flex items-center justify-center text-xs font-bold text-indigo-900">LD</div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-blue-800 flex items-center justify-center text-xs font-bold text-gray-700">+4</div>
                      </>
                    )}
                  </div>
                  <span className="text-sm font-medium ml-2">{teams.length > 0 ? teams[0].name : 'Squad Alpha'}</span>
                </div>
                <div className="text-xs text-blue-200 text-right">
                  {character.name ? (
                    <>
                      <p>PO: {character.name}</p>
                      <p>{character.description}</p>
                    </>
                  ) : (
                    <>
                      <p>PO: Alice Martin</p>
                      <p>SM: Lucas Dubois</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Agenda */}
      <div className="w-7/12 p-12 pl-16 flex flex-col justify-center relative z-20">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-atlassian-dark mb-2">Ordre du jour</h2>
          <div className="h-1 w-20 bg-atlassian-blue rounded-full" />
        </div>

        <div className="space-y-3">
          {agendaItems.map((item, index) => {
            const isActive = activeAgendaIndex >= 0 && index === activeAgendaIndex;

            return (
              <div
                key={item.num}
                className={`p-4 rounded-lg flex items-center transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-50 shadow-md border-l-4 border-blue-600 transform translate-x-2'
                    : 'bg-white shadow-sm border border-gray-100 hover:shadow-md'
                }`}
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : `${item.numBg} ${item.numText}`
                  }`}
                >
                  {item.num}
                </span>
                <div className="flex-1">
                  <h3 className={`text-base font-bold transition-colors duration-300 ${isActive ? 'text-blue-800' : 'text-gray-800'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <i className={`fas ${item.icon} text-lg transition-colors duration-300 ${isActive ? 'text-blue-500' : item.iconClass}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SlideCover;
