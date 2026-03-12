import React from 'react';
import { useSprint } from '../../context/SprintContext';

const SlideNextSteps: React.FC = () => {
  const { state } = useSprint();
  const { sprint, nextSprintCandidates, decisions, risks, keyDates, nextSprintDate } = state;
  const next = sprint.number + 1;

  const priorityStyles: Record<string, { bg: string; text: string; label: string }> = {
    high: { bg: 'bg-red-50', text: 'text-red-700', label: 'High' },
    medium: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Medium' },
    low: { bg: 'bg-green-50', text: 'text-green-700', label: 'Low' },
  };

  const typeStyles: Record<string, { bg: string; text: string }> = {
    story: { bg: 'bg-blue-100', text: 'text-blue-800' },
    spike: { bg: 'bg-purple-100', text: 'text-purple-800' },
    tech: { bg: 'bg-gray-100', text: 'text-gray-800' },
    bug: { bg: 'bg-red-100', text: 'text-red-800' },
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-12 z-20 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-teal-600 rounded flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-step-forward text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-atlassian-dark">Prochaines Étapes</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-teal-500 rounded-full mr-2" />
              Vers le Sprint #{next}
            </p>
          </div>
        </div>
        <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold flex items-center">
          <i className="far fa-calendar-alt mr-2 text-gray-500" />
          Lancement S{next} : {nextSprintDate || 'À définir'}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex bg-atlassian-light p-8 gap-8 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Left Column */}
        <div style={{ width: '60%' }} className="flex flex-col gap-6">
          {/* Backlog Candidates */}
          <div className="bg-white rounded-lg card-shadow p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-atlassian-dark flex items-center">
                <i className="fas fa-list-ul text-blue-600 mr-2" />
                Candidats Sprint #{next}
              </h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {nextSprintCandidates.reduce((s, c) => s + c.points, 0)} pts
              </span>
            </div>
            <div className="space-y-3 overflow-y-auto pr-2 flex-1">
              {nextSprintCandidates.map((candidate) => {
                const tStyle = typeStyles[candidate.type] || typeStyles.story;
                const pStyle = priorityStyles[candidate.priority] || null;

                return (
                  <div key={candidate.id} className="group flex items-center justify-between p-3 bg-white border border-gray-200 rounded hover:border-blue-400 hover:shadow-sm transition-all">
                    <div className="flex items-center">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded mr-3 ${tStyle.bg} ${tStyle.text}`} style={{ minWidth: 60, textAlign: 'center', display: 'inline-block' }}>{candidate.storyId}</span>
                      <div>
                        <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{candidate.title}</p>
                        <p className="text-xs text-gray-500">{candidate.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {pStyle && (
                        <span className={`${pStyle.bg} ${pStyle.text} font-bold px-2 py-0.5 rounded uppercase`} style={{ fontSize: '10px' }}>{pStyle.label}</span>
                      )}
                      <span className="bg-gray-100 text-gray-700 text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center border border-gray-200">{candidate.points}</span>
                    </div>
                  </div>
                );
              })}
              {nextSprintCandidates.length === 0 && (
                <p className="text-sm text-gray-400 italic text-center py-4">Aucun candidat défini</p>
              )}
            </div>
          </div>

          {/* Decisions */}
          {decisions.length > 0 && (
            <div className="bg-white rounded-lg card-shadow p-6">
              <h2 className="text-lg font-bold text-atlassian-dark mb-4 border-b border-gray-100 pb-2 flex items-center">
                <i className="fas fa-gavel text-purple-600 mr-2" />
                Décisions Requises
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {decisions.map((decision) => (
                  <div key={decision.id} className="bg-purple-50 p-3 rounded border border-purple-100 flex items-start">
                    <i className={`fas ${decision.icon || 'fa-question-circle'} text-purple-500 mt-1 mr-2`} />
                    <div>
                      <p className="text-sm font-bold text-purple-900">{decision.title}</p>
                      <p className="text-xs text-purple-700 mt-1">{decision.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ width: '40%' }} className="flex flex-col gap-6">
          {/* Risks */}
          {risks.length > 0 && (
            <div className="bg-white rounded-lg card-shadow p-6 border-l-4 border-orange-400">
              <h2 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
                <i className="fas fa-exclamation-triangle text-orange-500 mr-2" />
                Risques &amp; Vigilance
              </h2>
              <ul className="space-y-3">
                {risks.map((risk) => (
                  <li key={risk.id} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{risk.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline */}
          {keyDates.length > 0 && (
            <div className="bg-white rounded-lg card-shadow p-6 flex-1">
              <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
                <i className="far fa-calendar-check text-green-600 mr-2" />
                Dates Clés
              </h2>
              <div className="relative pl-4 space-y-6">
                <div className="timeline-line" style={{ left: 22 }} />
                {keyDates.map((kd) => (
                  <div key={kd.id} className="relative flex items-center z-10">
                    <div className={`w-4 h-4 rounded-full ${kd.color || 'bg-gray-300'} border-2 border-white shadow-sm mr-3`} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">{kd.date}</p>
                      <p className="text-sm font-bold text-gray-800">{kd.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Q&A */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg card-shadow p-6 text-white flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-comments text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Questions ?</h2>
                <p className="text-sm text-blue-100 opacity-90">Discussion ouverte</p>
              </div>
            </div>
            <div className="text-right opacity-80">
              <i className="fas fa-ellipsis-h text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideNextSteps;
