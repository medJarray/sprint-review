import React from 'react';
import { useSprint } from '../../context/SprintContext';

const SlideRealisations: React.FC = () => {
  const { state } = useSprint();
  const { sprint, metrics, featureCards, deferredItems, teamNote, valueMetrics } = state;

  const doneCards = featureCards.filter((c) => c.status !== 'blocked');
  const blockedCards = deferredItems;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-12 z-20 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-check-double text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-atlassian-dark">Réalisations Livrées</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Sprint #{sprint.number} — Definition of Done validée
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
          <i className="fas fa-trophy text-green-600 mr-2" />
          <p className="text-sm font-bold text-green-900">
            {metrics.completedPoints} pts livrés · <span className="text-green-600">{metrics.completedPoints}/{metrics.plannedPoints} pts</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex bg-atlassian-light p-8 gap-8 overflow-hidden">
        {/* Left: Done stories — 60% */}
        <div style={{ width: '60%' }} className="flex flex-col gap-5 overflow-y-auto pr-2">
          {doneCards.map((card) => (
            <div key={card.id} className="bg-white p-5 rounded-lg card-shadow border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-bold uppercase flex items-center">
                    <i className="fas fa-check-circle mr-1.5" /> Livré
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
                </div>
                {card.storyId && <span className="story-point-badge">{card.storyId}</span>}
              </div>
              <p className="text-sm text-gray-600 mb-3">{card.description}</p>
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                {card.prLink && (
                  <span className="flex items-center"><i className="fas fa-code-branch mr-1" /> {card.prLink}</span>
                )}
                {card.impact && (
                  <span className="flex items-center"><i className="fas fa-bolt mr-1" /> {card.impact}</span>
                )}
                <span className="flex items-center"><i className="fas fa-check mr-1 text-green-500" /> QA Validé</span>
              </div>
            </div>
          ))}

          {/* Performance summary from valueMetrics */}
          {valueMetrics.length > 0 && (
            <div className="bg-white rounded-lg card-shadow p-5">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center">
                <i className="fas fa-tachometer-alt text-blue-500 mr-2" /> Impact Performance
              </h3>
              {valueMetrics.map((vm) => (
                <div key={vm.id} className="flex items-center justify-between p-3 rounded-lg border mb-2" style={{ backgroundColor: vm.bgColor + '20', borderColor: vm.borderColor }}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mr-3" style={{ color: vm.iconColor }}>
                      <i className={`fas ${vm.icon}`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{vm.label}</p>
                      <p className="text-lg font-bold text-gray-800">{vm.value} {vm.subText && <span className="text-xs font-normal text-gray-500">{vm.subText}</span>}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Summary & Blocked — 40% */}
        <div style={{ width: '40%' }} className="flex flex-col gap-6">
          {/* Summary */}
          <div className="bg-white rounded-lg card-shadow p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center">
              <i className="fas fa-chart-bar text-green-500 mr-2" /> Résumé Sprint
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Vélocité Réalisée</p>
                  <p className="text-2xl font-bold text-gray-800">{metrics.completedPoints} <span className="text-sm text-gray-400">/ {metrics.plannedPoints}</span></p>
                </div>
                <span className="text-xs font-bold text-green-600 bg-white px-2 py-0.5 rounded shadow-sm">
                  <i className="fas fa-arrow-up mr-1" />{metrics.plannedPoints > 0 ? Math.round((metrics.completedPoints / metrics.plannedPoints) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Blocked / Deferred */}
          <div className="bg-white rounded-lg card-shadow p-6 flex-1 flex flex-col border-t-4 border-orange-400">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center justify-between">
              <span><i className="fas fa-exclamation-triangle text-orange-500 mr-2" /> Reporté / À suivre</span>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full" style={{ fontSize: '10px' }}>{blockedCards.length} Story</span>
            </h3>
            <div className="space-y-4 overflow-y-auto flex-1">
              {blockedCards.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded border border-gray-200 opacity-75 hover:opacity-100 transition-opacity">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-500 line-through">{item.storyId}</span>
                    <span className="bg-orange-100 text-orange-800 font-bold px-1.5 py-0.5 rounded border border-orange-200" style={{ fontSize: '10px' }}>BLOCKED</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-2">{item.title}</p>
                  <div className="flex items-start bg-white p-2 rounded border border-dashed border-gray-300">
                    <i className="fas fa-quote-left text-gray-300 text-xs mr-2 mt-0.5" />
                    <p className="text-xs text-gray-500 italic">{item.reason}</p>
                  </div>
                </div>
              ))}
              {blockedCards.length === 0 && (
                <p className="text-sm text-gray-400 italic text-center py-4">Aucun item reporté 🎉</p>
              )}
            </div>

            {teamNote && (
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Note de l'équipe</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  <i className="fas fa-info-circle text-blue-400 mr-1" />
                  {teamNote}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideRealisations;
