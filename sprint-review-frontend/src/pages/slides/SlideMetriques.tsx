import React from 'react';
import { useSprint } from '../../context/SprintContext';

const SlideMetriques: React.FC = () => {
  const { state } = useSprint();
  const { sprint, metrics, kpiCards, burndownIdeal, burndownReal, velocityHistory, insightsGood, insightsBad, qualityGate } = state;

  const maxBurndown = Math.max(...burndownIdeal, ...burndownReal, 1);

  const badgeIconMap: Record<string, string> = {
    up: 'fa-arrow-up',
    down: 'fa-arrow-down',
    stable: 'fa-minus',
    check: 'fa-check',
    smile: 'fa-smile',
  };

  const borderColorMap: Record<string, string> = {
    'border-blue-500': 'border-blue-500',
    'border-indigo-500': 'border-indigo-500',
    'border-green-500': 'border-green-500',
    'border-purple-500': 'border-purple-500',
    'border-orange-500': 'border-orange-500',
    'border-red-500': 'border-red-500',
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-12 z-20 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-chart-line text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-atlassian-dark">Métriques du Sprint</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2" />
              Sprint #{sprint.number} : Performance &amp; Qualité
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
          <i className="fas fa-check-double text-green-600 mr-2" />
          <p className="text-sm font-bold text-green-900">Santé du Sprint : <span className="text-green-600">Excellente</span></p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 bg-atlassian-light p-6 overflow-hidden" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', gap: '16px' }}>
        {/* KPI Cards — dynamically rendered */}
        {kpiCards.slice(0, 4).map((kpi) => {
          const badgeIcon = badgeIconMap[kpi.badgeType] || 'fa-minus';
          const badgeBgColor = kpi.badgeType === 'up' || kpi.badgeType === 'check'
            ? 'bg-green-100 text-green-700'
            : kpi.badgeType === 'down'
            ? 'bg-red-100 text-red-700'
            : kpi.badgeType === 'smile'
            ? 'bg-purple-100 text-purple-700'
            : 'bg-blue-100 text-blue-700';

          return (
            <div key={kpi.id} className={`bg-white rounded-lg card-shadow p-4 flex items-center justify-between kpi-card border-l-4 ${borderColorMap[kpi.borderColor] || kpi.borderColor}`} style={{ gridColumn: 'span 3' }}>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{kpi.label}</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-800">{kpi.value}</span>
                  <span className="text-sm text-gray-400">{kpi.unit}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className={`${badgeBgColor} text-xs font-bold px-2 py-0.5 rounded flex items-center`}>
                  <i className={`fas ${badgeIcon} mr-1`} style={{ fontSize: '10px' }} /> {kpi.badgeText}
                </div>
                <span className="text-gray-400 mt-1" style={{ fontSize: '10px' }}>{kpi.subText}</span>
              </div>
            </div>
          );
        })}

        {/* Burndown */}
        <div className="bg-white rounded-lg card-shadow p-6 flex flex-col" style={{ gridColumn: 'span 8', gridRow: 'span 3' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase flex items-center">
              <i className="fas fa-fire-alt text-orange-500 mr-2" /> Sprint Burndown
            </h3>
            <div className="flex space-x-4 text-xs">
              <div className="flex items-center"><span className="inline-block w-3 h-1 bg-gray-300 mr-1.5" /> Idéal</div>
              <div className="flex items-center"><span className="inline-block w-3 h-1 bg-blue-600 mr-1.5" /> Réel</div>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-between px-2 gap-1">
            {burndownReal.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center gap-0.5" style={{ height: 180 }}>
                  <div className="bg-gray-200 rounded-t" style={{ width: 8, height: `${((burndownIdeal[i] ?? 0) / maxBurndown) * 100}%` }} />
                  <div className="bg-blue-600 rounded-t" style={{ width: 12, height: `${(val / maxBurndown) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-400">J{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Velocity trend */}
        <div className="bg-white rounded-lg card-shadow p-6 flex flex-col" style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
          <h3 className="text-sm font-bold text-gray-700 uppercase flex items-center mb-4">
            <i className="fas fa-history text-blue-500 mr-2" /> Tendance Vélocité
          </h3>
          <div className="flex-1 flex items-end justify-between px-2 gap-2">
            {velocityHistory.map((bar, i) => {
              const isCurrent = i === velocityHistory.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex justify-center" style={{ height: 160 }}>
                    <div
                      className={`rounded-t ${isCurrent ? 'bg-atlassian-blue' : 'bg-gray-200'}`}
                      style={{ width: 32, height: `${(bar.value / 50) * 100}%`, marginTop: 'auto' }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{bar.label}</span>
                </div>
              );
            })}
          </div>
          {velocityHistory.length > 0 && (
            <p className="mt-2 text-center text-xs text-gray-400 italic">
              Moyenne ({velocityHistory.length} derniers sprints) : {(velocityHistory.reduce((s, b) => s + b.value, 0) / velocityHistory.length).toFixed(1)} pts
            </p>
          )}
        </div>

        {/* Insights */}
        <div className="bg-white rounded-lg card-shadow p-5 flex flex-col" style={{ gridColumn: 'span 8', gridRow: 'span 2' }}>
          <h3 className="text-sm font-bold text-gray-700 uppercase mb-2 flex items-center">
            <i className="fas fa-lightbulb text-yellow-500 mr-2" /> Insights &amp; Analyse
          </h3>
          <div className="grid grid-cols-2 gap-6 flex-1">
            <div className="bg-blue-50 rounded border border-blue-100 p-3">
              <p className="text-xs font-bold text-blue-800 mb-1">✅ Ce qui a bien fonctionné</p>
              <ul className="text-xs text-blue-900 space-y-1 ml-1 list-disc list-inside opacity-80">
                {insightsGood.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-50 rounded border border-orange-100 p-3">
              <p className="text-xs font-bold text-orange-800 mb-1">⚠️ Points d'attention</p>
              <ul className="text-xs text-orange-900 space-y-1 ml-1 list-disc list-inside opacity-80">
                {insightsBad.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quality Gate */}
        <div className="bg-atlassian-dark rounded-lg card-shadow p-5 text-white flex flex-col" style={{ gridColumn: 'span 4', gridRow: 'span 2' }}>
          <h3 className="text-sm font-bold text-blue-200 uppercase mb-4 flex items-center">
            <i className="fas fa-shield-alt mr-2" /> Quality Gate
          </h3>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xs text-blue-300 font-medium">Unit Tests</span>
                <span className="text-lg font-bold">{qualityGate.unitTests}%</span>
              </div>
              <div className="w-24 bg-blue-900 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: `${qualityGate.unitTests}%` }} />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xs text-blue-300 font-medium">SonarQube</span>
                <span className="text-lg font-bold text-green-400">{qualityGate.sonarGrade}</span>
              </div>
              <div className="flex items-center text-xs text-green-400 bg-blue-900 px-2 py-1 rounded">Passed</div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-blue-800">
              <div className="flex flex-col">
                <span className="text-xs text-blue-300 font-medium">E2E Tests</span>
                <span className="text-lg font-bold">{qualityGate.e2eTests}%</span>
              </div>
              <i className="fas fa-check-circle text-green-400 text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideMetriques;
