import React from 'react';
import { useSprint } from '../../context/SprintContext';

/*
  Légende unique (icône + label) utilisée partout :
  ─────────────────────────────────────────────────
  ✅ Déployé    → fa-rocket         → vert
  ✅ Validé QA  → fa-clipboard-check → vert
  ✅ Done       → fa-check-circle   → vert
  ✅ Fixed      → fa-wrench         → vert
  🟠 En Test    → fa-vial           → orange (bg-yellow-100 / text-yellow-800)
  🔴 Blocked   → fa-ban            → rouge
*/

/* ── Composant badge réutilisable ── */
const StatusBadge: React.FC<{ status: 'deployed' | 'validated' | 'done' | 'fixed' | 'testing' | 'blocked' }> = ({ status }) => {
  const map = {
    deployed:  { icon: 'fa-rocket',          label: 'Déployé',   bg: 'bg-green-100',  text: 'text-green-800' },
    validated: { icon: 'fa-clipboard-check', label: 'Validé QA', bg: 'bg-green-100',  text: 'text-green-800' },
    done:      { icon: 'fa-check-circle',    label: 'Done',      bg: 'bg-green-100',  text: 'text-green-700' },
    fixed:     { icon: 'fa-wrench',          label: 'Fixed',     bg: 'bg-green-100',  text: 'text-green-700' },
    testing:   { icon: 'fa-vial',            label: 'En Test',   bg: 'bg-yellow-100', text: 'text-yellow-800' },
    blocked:   { icon: 'fa-ban',             label: 'Blocked',   bg: 'bg-red-100',    text: 'text-red-700' },
  };
  const s = map[status];
  return (
    <span className={`${s.bg} ${s.text} font-bold uppercase px-2 py-0.5 rounded tracking-wide flex items-center flex-shrink-0`} style={{ fontSize: 10 }}>
      <i className={`fas ${s.icon} mr-1`} /> {s.label}
    </span>
  );
};

const SmallBadge: React.FC<{ status: 'deployed' | 'validated' | 'done' | 'fixed' | 'testing' | 'blocked' }> = ({ status }) => {
  const map = {
    deployed:  { icon: 'fa-rocket',          label: 'Déployé',   bg: 'bg-green-100',  text: 'text-green-700' },
    validated: { icon: 'fa-clipboard-check', label: 'Validé QA', bg: 'bg-green-100',  text: 'text-green-700' },
    done:      { icon: 'fa-check-circle',    label: 'Done',      bg: 'bg-green-100',  text: 'text-green-700' },
    fixed:     { icon: 'fa-wrench',          label: 'Fixed',     bg: 'bg-green-100',  text: 'text-green-700' },
    testing:   { icon: 'fa-vial',            label: 'En Test',   bg: 'bg-yellow-100', text: 'text-yellow-800' },
    blocked:   { icon: 'fa-ban',             label: 'Blocked',   bg: 'bg-red-100',    text: 'text-red-700' },
  };
  const s = map[status];
  return (
    <span className={`${s.bg} ${s.text} font-bold px-1.5 py-0.5 rounded flex items-center`} style={{ fontSize: 9 }}>
      <i className={`fas ${s.icon} mr-1`} /> {s.label}
    </span>
  );
};

const SlideBacklog2: React.FC = () => {
  const { state } = useSprint();
  const { sprint, metrics, featureCards, smallCards, deferredItems, teamNote, valueMetrics } = state;

  const completionPercent = metrics.plannedPoints > 0
    ? Math.round((metrics.completedPoints / metrics.plannedPoints) * 100)
    : 0;

  const credibility = completionPercent >= 90
    ? { label: 'Excellente', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', icon: 'fa-trophy' }
    : completionPercent >= 75
    ? { label: 'Bonne', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: 'fa-thumbs-up' }
    : completionPercent >= 50
    ? { label: 'Moyenne', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100', icon: 'fa-minus-circle' }
    : { label: 'À améliorer', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', icon: 'fa-exclamation-circle' };

  const borderColorForStatus = (status: string) => {
    if (status === 'blocked') return 'border-red-500';
    if (status === 'testing') return 'border-yellow-400';
    return 'border-green-500';
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-12 z-20" style={{ flexShrink: 0 }}>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-gift text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-atlassian-dark">Réalisations &amp; Incréments</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Sprint #{sprint.number} : Valeur Livrée
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 bg-green-50 text-green-700 rounded border border-green-200 text-xs font-bold uppercase tracking-wide">
            <i className="fas fa-check-circle mr-2" /> Version v{sprint.number}.0.0 Ready
          </div>
          <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200 text-xs font-bold">
            <i className="fas fa-trophy mr-1" /> {metrics.completedPoints} pts livrés · {metrics.completedPoints}/{metrics.plannedPoints} pts
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex bg-atlassian-light p-6 gap-6" style={{ minHeight: 0, overflow: 'hidden' }}>

        {/* ═══ Left Column (65%) — scrollable ═══ */}
        <div style={{ width: '65%' }} className="flex flex-col gap-4 overflow-y-auto pr-2">
          <div className="flex items-center justify-between mb-1 flex-shrink-0">
            <h2 className="text-base font-bold text-gray-700 flex items-center">
              <i className="fas fa-layer-group text-blue-500 mr-2" />
              Fonctionnalités Terminées (DoD OK)
            </h2>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total: {metrics.completedPoints} pts</span>
          </div>

          {/* Feature Cards from state */}
          {featureCards.map((card) => (
            <div key={card.id} className={`bg-white rounded-lg card-shadow border-l-4 ${borderColorForStatus(card.status)} p-5 flex-shrink-0`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">{card.storyId}</span>
                  <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
                </div>
                <StatusBadge status={card.status} />
              </div>
              <p className="text-sm text-gray-600 mb-3">{card.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex space-x-3">
                  {card.impact && (
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium text-xs">
                      <i className="fas fa-stopwatch mr-1" /> {card.impact}
                    </span>
                  )}
                  {card.prLink && (
                    <span className="text-xs text-blue-600 flex items-center">
                      <i className="fab fa-github mr-1" /> {card.prLink}
                    </span>
                  )}
                </div>
                {card.assignees.length > 0 && (
                  <div className="flex -space-x-2">
                    {card.assignees.map((a, i) => (
                      <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-sm bg-blue-500" style={{ fontSize: 10 }}>{a}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Small Cards Grid */}
          {smallCards.length > 0 && (
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {smallCards.map((card) => (
                <div key={card.id} className={`bg-white p-3 rounded-lg card-shadow border-l-2 ${borderColorForStatus(card.status)}`}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-bold text-gray-400 uppercase" style={{ fontSize: 10 }}>{card.type}</span>
                    <SmallBadge status={card.status} />
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5">{card.title}</h4>
                  <p className="text-xs text-gray-500">{card.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══ Right Column (35%) ═══ */}
        <div style={{ width: '35%' }} className="flex flex-col gap-4">

          {/* Top row: Valeur Délivrée + Résumé Sprint side by side */}
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {/* Valeur Délivrée */}
            <div className="bg-white rounded-lg card-shadow p-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center" style={{ fontSize: 9 }}>
                <i className="fas fa-chart-line text-blue-500 mr-1.5" /> Valeur Délivrée
              </h3>
              <div className="space-y-2">
                {valueMetrics.slice(0, 2).map((vm) => (
                  <div key={vm.id} className="flex items-center justify-between p-2 rounded border" style={{ backgroundColor: vm.bgColor + '20', borderColor: vm.borderColor }}>
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm mr-2" style={{ color: vm.iconColor }}>
                        <i className={`fas ${vm.icon}`} style={{ fontSize: 10 }} />
                      </div>
                      <div>
                        <p className="text-gray-500 uppercase font-bold" style={{ fontSize: 8 }}>{vm.label}</p>
                        <p className="text-sm font-bold text-gray-800">{vm.value}{vm.subText && <span className="text-xs text-gray-400">{vm.subText}</span>}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Résumé Sprint */}
            <div className="bg-white rounded-lg card-shadow p-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center" style={{ fontSize: 9 }}>
                <i className="fas fa-chart-bar text-green-500 mr-1.5" /> Résumé Sprint
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-100">
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm mr-2">
                      <i className="fas fa-running" style={{ fontSize: 10 }} />
                    </div>
                    <div>
                      <p className="text-gray-500 uppercase font-bold" style={{ fontSize: 8 }}>Vélocité</p>
                      <p className="text-sm font-bold text-gray-800">{metrics.completedPoints}<span className="text-xs text-gray-400">/{metrics.plannedPoints}</span></p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600">
                    <i className="fas fa-arrow-up mr-0.5" style={{ fontSize: 7 }} />{completionPercent}%
                  </span>
                </div>
                <div className={`flex items-center justify-between p-2 ${credibility.bg} rounded border ${credibility.border}`}>
                  <div className="flex items-center">
                    <div className={`w-7 h-7 rounded-full bg-white flex items-center justify-center ${credibility.color} shadow-sm mr-2`}>
                      <i className={`fas ${credibility.icon}`} style={{ fontSize: 10 }} />
                    </div>
                    <div>
                      <p className="text-gray-500 uppercase font-bold" style={{ fontSize: 8 }}>Crédibilité</p>
                      <p className={`text-sm font-bold ${credibility.color}`}>{credibility.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reporté / À suivre */}
          <div className="bg-white rounded-lg card-shadow p-5 flex flex-col border-t-4 border-orange-400 flex-1" style={{ minHeight: 0 }}>
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center justify-between flex-shrink-0">
              <span><i className="fas fa-exclamation-triangle text-orange-500 mr-2" /> Reporté / À suivre</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full" style={{ fontSize: 10 }}>{deferredItems.length} Story</span>
            </h3>
            <div className="overflow-y-auto flex-1" style={{ minHeight: 0 }}>
              {deferredItems.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded border border-gray-200 mb-2">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-500 line-through">{item.storyId}</span>
                    <SmallBadge status="blocked" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-2">{item.title}</p>
                  <div className="flex items-start bg-white p-2 rounded border border-dashed border-gray-300">
                    <i className="fas fa-quote-left text-gray-300 text-xs mr-2 mt-0.5" />
                    <p className="text-xs text-gray-500 italic">{item.reason}</p>
                  </div>
                </div>
              ))}
              {deferredItems.length === 0 && (
                <p className="text-sm text-gray-400 italic text-center py-4">Aucun item reporté 🎉</p>
              )}
            </div>
            {teamNote && (
              <div className="pt-3 border-t border-gray-100 mt-3 flex-shrink-0">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Note de l'équipe</p>
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

export default SlideBacklog2;
