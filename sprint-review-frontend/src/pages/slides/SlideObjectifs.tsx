import React from 'react';
import { useSprint } from '../../context/SprintContext';

// Couleurs de priorité pour les badges
const priorityStyles: Record<string, { bg: string; text: string }> = {
  'Priorité Haute': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'Priorité Moyenne': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  'Tech Enabler': { bg: 'bg-teal-100', text: 'text-teal-800' },
  'Priorité Basse': { bg: 'bg-gray-100', text: 'text-gray-800' },
};

// Couleurs hover pour les titres basées sur la borderColor
function hoverColorFromBorder(borderColor: string): string {
  if (borderColor.includes('blue')) return 'group-hover:text-blue-700';
  if (borderColor.includes('indigo')) return 'group-hover:text-indigo-700';
  if (borderColor.includes('teal')) return 'group-hover:text-teal-700';
  if (borderColor.includes('green')) return 'group-hover:text-green-700';
  if (borderColor.includes('purple')) return 'group-hover:text-purple-700';
  if (borderColor.includes('red')) return 'group-hover:text-red-700';
  return 'group-hover:text-blue-700';
}

function iconColorFromBorder(borderColor: string): string {
  if (borderColor.includes('blue')) return 'text-blue-400';
  if (borderColor.includes('indigo')) return 'text-indigo-400';
  if (borderColor.includes('teal')) return 'text-teal-400';
  if (borderColor.includes('green')) return 'text-green-400';
  if (borderColor.includes('purple')) return 'text-purple-400';
  return 'text-blue-400';
}

const SlideObjectifs: React.FC = () => {
  const { state } = useSprint();
  const { sprint, metrics, objectives, successCriteria, constraints, dodItems } = state;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-12 z-20 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-atlassian-blue rounded flex items-center justify-center text-white shadow-sm">
            <i className="fab fa-jira text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-atlassian-dark">Objectifs du Sprint</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              Sprint #{sprint.number} : {sprint.goal || sprint.name}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase">Vélocité Cible</p>
            <p className="text-lg font-bold text-atlassian-dark">{metrics.plannedPoints} pts</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase">Jours Ouvrés</p>
            <p className="text-lg font-bold text-atlassian-dark">10 j</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex bg-atlassian-light p-10 space-x-8 overflow-hidden">
        {/* Left: Objectives */}
        <div className="w-2/3 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-atlassian-dark">
              <i className="fas fa-bullseye text-atlassian-blue text-lg" />
              <h2 className="text-lg font-bold uppercase tracking-wide">Objectifs SMART</h2>
            </div>
            <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              {objectives.length} Objectif{objectives.length > 1 ? 's' : ''} Principa{objectives.length > 1 ? 'ux' : 'l'}
            </span>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto pr-2 pb-2">
            {objectives.map((obj) => {
              const pStyle = priorityStyles[obj.priority] || { bg: 'bg-gray-100', text: 'text-gray-800' };
              return (
                <div
                  key={obj.id}
                  className={`bg-white p-6 rounded-lg card-shadow border-l-4 ${obj.borderColor} group hover:shadow-md transition-shadow`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-xl font-bold text-gray-800 ${hoverColorFromBorder(obj.borderColor)} transition-colors`}>
                      {obj.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${pStyle.bg} ${pStyle.text}`}>
                      {obj.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{obj.description}</p>
                  <div className="flex items-center space-x-4 text-sm border-t border-gray-100 pt-3 mt-2">
                    {obj.scope && (
                      <div className="flex items-center text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded">
                        <i className={`fas fa-layer-group mr-2 ${iconColorFromBorder(obj.borderColor)}`} />
                        Portée : {obj.scope}
                      </div>
                    )}
                    {obj.epicLink && (
                      <div className="flex items-center text-gray-500 font-medium">
                        <i className="fas fa-link mr-2 text-gray-400" />
                        Épique: {obj.epicLink}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: KPIs & DoD */}
        <div className="w-1/3 flex flex-col space-y-6">
          {/* Success Criteria */}
          <div className="bg-white rounded-lg card-shadow p-6 flex-1 flex flex-col">
            <div className="flex items-center space-x-2 text-green-700 mb-4 border-b border-gray-100 pb-3">
              <i className="fas fa-flag-checkered text-lg" />
              <h2 className="text-sm font-bold uppercase tracking-wider">Critères de Succès (KPI)</h2>
            </div>
            <ul className="space-y-4 flex-1">
              {successCriteria.map((sc) => (
                <li key={sc.id} className="flex items-start">
                  <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                    <i className="fas fa-check" />
                  </span>
                  <p className="text-sm text-gray-700 font-medium">{sc.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Constraints */}
          <div className="bg-white rounded-lg card-shadow p-6">
            <div className="flex items-center space-x-2 text-orange-600 mb-4 border-b border-gray-100 pb-3">
              <i className="fas fa-exclamation-triangle text-lg" />
              <h2 className="text-sm font-bold uppercase tracking-wider">Hypothèses &amp; Contraintes</h2>
            </div>
            <ul className="space-y-3">
              {constraints.map((c) => (
                <li key={c.id} className="flex items-start bg-orange-50 p-2 rounded border border-orange-100">
                  <i className="fas fa-exclamation-circle text-orange-400 mt-1 mr-2 text-xs" />
                  <p className="text-xs text-orange-900 font-medium">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Definition of Done */}
          <div className="bg-atlassian-dark rounded-lg card-shadow p-6 text-white mt-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 rounded-full filter blur-2xl opacity-20 -mr-10 -mt-10" />
            <div className="flex items-center justify-between space-x-2 text-blue-300 mb-4 relative z-10">
              <div className="flex items-center space-x-2">
                <i className="fas fa-clipboard-check" />
                <h2 className="text-sm font-bold uppercase tracking-wider">Definition of Done</h2>
              </div>
              <i className="fas fa-info-circle opacity-50 text-xs" />
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs relative z-10">
              {dodItems.map((d) => (
                <div key={d.id} className="flex items-center">
                  <i className="far fa-check-square mr-2 text-green-400" /> {d.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideObjectifs;
