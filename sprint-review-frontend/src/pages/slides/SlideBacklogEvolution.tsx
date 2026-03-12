import React from 'react';
import { useSprint } from '../../context/SprintContext';

const SlideBacklogEvolution: React.FC = () => {
  const { state } = useSprint();
  const { sprint, backlogHealth, epicsProgress, backlogChanges, prioritizationMatrix } = state;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-12 z-20" style={{ flexShrink: 0 }}>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-stream text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-atlassian-dark">Évolution du Product Backlog</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
              Santé &amp; Priorisation
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded border border-indigo-200 text-xs font-bold uppercase tracking-wide">
            <i className="fas fa-chart-line mr-2" />
            Sprint #{sprint.number}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex bg-atlassian-light p-6 gap-6 overflow-hidden" style={{ minHeight: 0 }}>

        {/* ═══ Left Column (60%) — scrollable ═══ */}
        <div style={{ width: '60%' }} className="flex flex-col gap-5 overflow-y-auto pr-2">

          {/* Backlog Health Metrics */}
          <div className="bg-white rounded-lg card-shadow p-5 border-t-4 border-indigo-600 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-atlassian-dark flex items-center">
                <i className="fas fa-heartbeat text-indigo-600 mr-2" />
                Santé du Backlog
              </h2>
              <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${backlogHealth.readyPercent >= 60 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                {backlogHealth.readyPercent >= 60 ? 'Bonne Santé' : 'À Améliorer'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-center">
                <div className="flex items-center justify-center mb-1">
                  <i className="fas fa-list text-blue-600 text-xl" />
                </div>
                <p className="text-2xl font-extrabold text-blue-900 mb-0.5">{backlogHealth.totalItems}</p>
                <p className="text-xs text-gray-600 font-bold uppercase" style={{ fontSize: 9 }}>Items Totaux</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-center">
                <div className="flex items-center justify-center mb-1">
                  <i className="fas fa-check-circle text-green-600 text-xl" />
                </div>
                <p className="text-2xl font-extrabold text-green-900 mb-0.5">{backlogHealth.readyPercent}%</p>
                <p className="text-xs text-gray-600 font-bold uppercase" style={{ fontSize: 9 }}>Ready pour Sprint</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-center">
                <div className="flex items-center justify-center mb-1">
                  <i className="fas fa-clock text-orange-600 text-xl" />
                </div>
                <p className="text-2xl font-extrabold text-orange-900 mb-0.5">{backlogHealth.avgAge}</p>
                <p className="text-xs text-gray-600 font-bold uppercase" style={{ fontSize: 9 }}>Âge Moyen</p>
              </div>
            </div>
            {backlogHealth.distribution.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600 font-medium mb-2">Distribution par statut</p>
                <div className="space-y-1.5">
                  {backlogHealth.distribution.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.color} mr-2`} />
                        <span className="text-xs text-gray-700 font-medium">{item.label}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-800">{item.count} items ({item.pct}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Epics in Progress */}
          {epicsProgress.length > 0 && (
            <div className="bg-white rounded-lg card-shadow p-5 flex-shrink-0">
              <h2 className="text-base font-bold text-atlassian-dark mb-4 flex items-center border-b border-gray-100 pb-3">
                <i className="fas fa-layer-group text-purple-600 mr-2" />
                Enablers en Cours
              </h2>
              <div className="space-y-3">
                {epicsProgress.map((epic) => (
                  <div key={epic.id} className={`${epic.bgColor} p-3 rounded-lg border ${epic.borderColor}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-0.5">
                          <span className={`${epic.badgeBg} ${epic.badgeText} font-bold px-2 py-0.5 rounded uppercase`} style={{ fontSize: 10 }}>{epic.epicId}</span>
                          <span className="text-sm font-bold text-gray-800">{epic.name}</span>
                        </div>
                        <p className="text-xs text-gray-600">{epic.description}</p>
                      </div>
                      <div className="text-right ml-3">
                        <p className={`text-xl font-bold ${epic.pctColor}`}>{epic.pct}%</p>
                        <p className="text-gray-500 uppercase font-bold" style={{ fontSize: 9 }}>Complété</p>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div className={`h-full rounded-full ${epic.barColor}`} style={{ width: `${epic.pct}%` }} />
                    </div>
                    <div className="flex items-center justify-between mt-1.5 text-xs text-gray-600">
                      <span>{epic.done}/{epic.total} stories complétées</span>
                      <span className={`font-bold ${epic.targetColor}`}>Sprint #{epic.targetSprint} target</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Backlog Changes */}
          <div className="bg-white rounded-lg card-shadow p-5 flex-shrink-0">
            <h2 className="text-base font-bold text-atlassian-dark mb-3 flex items-center border-b border-gray-100 pb-3">
              <i className="fas fa-exchange-alt text-orange-600 mr-2" />
              Changements depuis Sprint #{sprint.number - 1}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 p-3 rounded border border-green-200 text-center">
                <i className="fas fa-plus-circle text-green-600 text-lg mb-1" />
                <p className="text-xl font-bold text-green-900">+{backlogChanges.added}</p>
                <p className="text-xs text-gray-600 font-bold">Items Ajoutés</p>
              </div>
              <div className="bg-red-50 p-3 rounded border border-red-200 text-center">
                <i className="fas fa-minus-circle text-red-600 text-lg mb-1" />
                <p className="text-xl font-bold text-red-900">-{backlogChanges.removed}</p>
                <p className="text-xs text-gray-600 font-bold">Items Retirés</p>
              </div>
              <div className="bg-blue-50 p-3 rounded border border-blue-200 text-center">
                <i className="fas fa-sync-alt text-blue-600 text-lg mb-1" />
                <p className="text-xl font-bold text-blue-900">{backlogChanges.reprioritized}</p>
                <p className="text-xs text-gray-600 font-bold">Repriorisés</p>
              </div>
            </div>
            {backlogChanges.reasons.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Raisons principales</p>
                <div className="space-y-1.5">
                  {backlogChanges.reasons.map((reason, i) => (
                    <div key={i} className="flex items-start text-xs">
                      <i className="fas fa-circle text-gray-400 mt-1.5 mr-2" style={{ fontSize: 6 }} />
                      <span className="text-gray-700">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ═══ Right Column (40%) ═══ */}
        <div style={{ width: '40%' }} className="flex flex-col gap-5">

          {/* Prioritization Matrix */}
          <div className="bg-white rounded-lg card-shadow p-5 flex-1 flex flex-col" style={{ minHeight: 0 }}>
            <h2 className="text-base font-bold text-atlassian-dark mb-3 flex items-center border-b border-gray-100 pb-3 flex-shrink-0">
              <i className="fas fa-th text-indigo-600 mr-2" />
              Matrice Valeur vs Effort
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase mb-3 flex-shrink-0">Top Candidats Prochain Sprint</p>
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2.5 overflow-hidden" style={{ minHeight: 0 }}>
              {/* Quick Wins */}
              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-2.5 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-green-900 uppercase">Quick Wins</span>
                  <span className="text-green-600 text-xs"><i className="fas fa-arrow-up mr-0.5" /><i className="fas fa-arrow-down" /></span>
                </div>
                <div className="flex-1 space-y-1.5 overflow-y-auto">
                  {prioritizationMatrix.quickWins.map((item) => (
                    <div key={item.id} className="bg-white p-2 rounded border border-green-200">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-gray-800">{item.storyId}</span>
                        <span className="bg-green-200 text-green-900 font-bold px-1.5 py-0.5 rounded" style={{ fontSize: 9 }}>{item.points} pts</span>
                      </div>
                      <p className="text-gray-600 leading-tight" style={{ fontSize: 10 }}>{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Projects */}
              <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-2.5 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-900 uppercase">Projets Majeurs</span>
                  <span className="text-blue-600 text-xs"><i className="fas fa-arrow-up mr-0.5" /><i className="fas fa-arrow-up" /></span>
                </div>
                <div className="flex-1 space-y-1.5 overflow-y-auto">
                  {prioritizationMatrix.majorProjects.map((item) => (
                    <div key={item.id} className="bg-white p-2 rounded border border-blue-200">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-gray-800">{item.storyId}</span>
                        <span className="bg-blue-200 text-blue-900 font-bold px-1.5 py-0.5 rounded" style={{ fontSize: 9 }}>{item.points} pts</span>
                      </div>
                      <p className="text-gray-600 leading-tight" style={{ fontSize: 10 }}>{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fill-ins */}
              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-2.5 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-700 uppercase">Fill-ins</span>
                  <span className="text-gray-500 text-xs"><i className="fas fa-arrow-down mr-0.5" /><i className="fas fa-arrow-down" /></span>
                </div>
                <div className="flex-1 space-y-1.5 overflow-y-auto">
                  {prioritizationMatrix.fillIns.map((item) => (
                    <div key={item.id} className="bg-white p-2 rounded border border-gray-200">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-gray-800">{item.storyId}</span>
                        <span className="bg-gray-200 text-gray-700 font-bold px-1.5 py-0.5 rounded" style={{ fontSize: 9 }}>{item.points} pts</span>
                      </div>
                      <p className="text-gray-600 leading-tight" style={{ fontSize: 10 }}>{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Sinks */}
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-2.5 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-red-900 uppercase">Time Sinks</span>
                  <span className="text-red-600 text-xs"><i className="fas fa-arrow-down mr-0.5" /><i className="fas fa-arrow-up" /></span>
                </div>
                <div className="flex-1 space-y-1.5 overflow-y-auto">
                  {prioritizationMatrix.timeSinks.map((item) => (
                    <div key={item.id} className="bg-white p-2 rounded border border-red-200">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-gray-800">{item.storyId}</span>
                        <span className="bg-red-200 text-red-900 font-bold px-1.5 py-0.5 rounded" style={{ fontSize: 9 }}>{item.points} pts</span>
                      </div>
                      <p className="text-gray-600 leading-tight" style={{ fontSize: 10 }}>{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Axes labels */}
            <div className="flex justify-between items-center mt-2 text-gray-500 uppercase font-bold flex-shrink-0" style={{ fontSize: 9 }}>
              <span className="flex items-center"><i className="fas fa-arrow-left mr-1" />Faible Effort</span>
              <span className="flex items-center">Effort Élevé<i className="fas fa-arrow-right ml-1" /></span>
            </div>
          </div>

          {/* Insights */}
          {prioritizationMatrix.insights.length > 0 && (
            <div className="bg-atlassian-dark rounded-lg p-4 text-white flex-shrink-0">
              <div className="flex items-center mb-2">
                <i className="fas fa-lightbulb text-yellow-400 mr-2 text-sm" />
                <span className="text-xs font-bold uppercase tracking-wider">Insights Priorisation</span>
              </div>
              <div className="space-y-1.5 text-xs">
                {prioritizationMatrix.insights.map((insight, i) => {
                  const icons = ['fa-check-circle text-green-400', 'fa-exclamation-circle text-orange-400', 'fa-ban text-red-400'];
                  return (
                    <div key={i} className="flex items-start">
                      <i className={`fas ${icons[i % icons.length]} mr-2 mt-0.5 text-xs`} />
                      <span className="text-gray-200 leading-relaxed">{insight}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideBacklogEvolution;
