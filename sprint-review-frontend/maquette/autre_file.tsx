import React from 'react';
import { useSprint } from '../src/context/SprintContext';

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
  const { sprint } = state;

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
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total: 13 pts</span>
          </div>

          {/* ────── US-101 : Déployé ────── */}
          <div className="bg-white rounded-lg card-shadow border-l-4 border-green-500 p-5 flex-shrink-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">US-101</span>
                <h3 className="text-lg font-bold text-gray-800">Paiement One-Click Mobile</h3>
              </div>
              <StatusBadge status="deployed" />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Implémentation complète du flux de paiement simplifié pour les utilisateurs connectés. Intégration biométrique (FaceID/TouchID) pour validation rapide.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex space-x-3">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium text-xs">
                  <i className="fas fa-stopwatch mr-1" /> Impact : Checkout -30s
                </span>
                <span className="text-xs text-blue-600 flex items-center">
                  <i className="fab fa-github mr-1" /> PR #452 Merged
                </span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-sm bg-blue-500" style={{ fontSize: 10 }}>LD</div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-sm bg-purple-500" style={{ fontSize: 10 }}>SM</div>
              </div>
            </div>
          </div>

          {/* ────── US-102 : Validé QA ────── */}
          <div className="bg-white rounded-lg card-shadow border-l-4 border-green-500 p-5 flex-shrink-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">US-102</span>
                <h3 className="text-lg font-bold text-gray-800">Optimisation Assets Home</h3>
              </div>
              <StatusBadge status="validated" />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Migration de tous les assets image vers WebP et mise en place du lazy-loading natif. Réduction drastique du poids de la page d'accueil.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex space-x-3">
                <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded font-medium text-xs">
                  <i className="fas fa-bolt mr-1" /> TTI &lt; 1.5s
                </span>
                <span className="text-xs text-blue-600 flex items-center">
                  <i className="fas fa-file-alt mr-1" /> Doc Tech Mise à jour
                </span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-sm bg-red-500" style={{ fontSize: 10 }}>TR</div>
              </div>
            </div>
          </div>

          {/* ────── TECH-45 : En Test ────── */}
          <div className="bg-white rounded-lg card-shadow border-l-4 border-yellow-400 p-5 flex-shrink-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">TECH-45</span>
                <h3 className="text-lg font-bold text-gray-800">Upgrade React Native 0.72</h3>
              </div>
              <StatusBadge status="testing" />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Mise à jour du framework avec migration des APIs dépréciées. Tests de non-régression en cours sur les fonctionnalités critiques.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex space-x-3">
                <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded font-medium text-xs">
                  <i className="fas fa-sync-alt mr-1" /> 80% des tests passés
                </span>
                <span className="text-xs text-blue-600 flex items-center">
                  <i className="fab fa-github mr-1" /> PR #467 Open
                </span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-sm bg-blue-500" style={{ fontSize: 10 }}>AM</div>
              </div>
            </div>
          </div>

          {/* ────── Minor Grid ────── */}
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {/* Refactor API Client — Done */}
            <div className="bg-white p-3 rounded-lg card-shadow border-l-2 border-green-500">
              <div className="flex justify-between mb-1.5">
                <span className="font-bold text-gray-400 uppercase" style={{ fontSize: 10 }}>Tech Debt</span>
                <SmallBadge status="done" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-0.5">Refactor API Client</h4>
              <p className="text-xs text-gray-500">Standardisation des retours d'erreur</p>
            </div>

            {/* Login Spinner iOS — Fixed */}
            <div className="bg-white p-3 rounded-lg card-shadow border-l-2 border-green-500">
              <div className="flex justify-between mb-1.5">
                <span className="font-bold text-gray-400 uppercase" style={{ fontSize: 10 }}>Fix Bug</span>
                <SmallBadge status="fixed" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-0.5">Login Spinner iOS</h4>
              <p className="text-xs text-gray-500">Correction boucle infinie iPhone 14</p>
            </div>

            {/* Crash WebView Android — Blocked */}
            <div className="bg-white p-3 rounded-lg card-shadow border-l-2 border-red-500">
              <div className="flex justify-between mb-1.5">
                <span className="font-bold text-gray-400 uppercase" style={{ fontSize: 10 }}>Fix Bug</span>
                <SmallBadge status="blocked" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-0.5">Crash WebView Android</h4>
              <p className="text-xs text-gray-500">Reproductible sur Android 12. Attente fix upstream.</p>
            </div>

            {/* Cache API Produits — En Test */}
            <div className="bg-white p-3 rounded-lg card-shadow border-l-2 border-yellow-400">
              <div className="flex justify-between mb-1.5">
                <span className="font-bold text-gray-400 uppercase" style={{ fontSize: 10 }}>Amélioration</span>
                <SmallBadge status="testing" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-0.5">Cache API Produits</h4>
              <p className="text-xs text-gray-500">Réduction des appels réseau de 40%</p>
            </div>
          </div>
        </div>

        {/* ═══ Right Column (35%) ═══ */}
        <div style={{ width: '35%' }} className="flex flex-col gap-4">

          {/* Valeur Délivrée */}
          <div className="bg-white rounded-lg card-shadow p-5 relative overflow-hidden flex-shrink-0">
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50" style={{ marginRight: -56, marginTop: -56 }} />
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 flex items-center">
              <i className="fas fa-chart-line text-blue-500 mr-2" /> Valeur Délivrée
            </h3>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between p-2.5 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm mr-3">
                    <i className="fas fa-shopping-cart text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold" style={{ fontSize: 10 }}>Conv. Mobile</p>
                    <p className="text-base font-bold text-gray-800">+12% <span className="text-xs font-normal text-gray-500">(Proj.)</span></p>
                  </div>
                </div>
                <i className="fas fa-arrow-up text-green-500" />
              </div>
              <div className="flex items-center justify-between p-2.5 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm mr-3">
                    <i className="fas fa-tachometer-alt text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold" style={{ fontSize: 10 }}>Lighthouse</p>
                    <p className="text-base font-bold text-gray-800">92 <span className="text-xs font-normal text-gray-500">/ 100</span></p>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-600 bg-white px-1.5 py-0.5 rounded shadow-sm">+15 pts</span>
              </div>
            </div>
          </div>

          {/* Reporté / À suivre */}
          <div className="bg-white rounded-lg card-shadow p-5 flex flex-col border-t-4 border-orange-400 flex-1" style={{ minHeight: 0 }}>
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center justify-between flex-shrink-0">
              <span><i className="fas fa-exclamation-triangle text-orange-500 mr-2" /> Reporté / À suivre</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full" style={{ fontSize: 10 }}>1 Story</span>
            </h3>
            <div className="overflow-y-auto flex-1" style={{ minHeight: 0 }}>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-gray-500 line-through">US-103 Tracking</span>
                  <SmallBadge status="blocked" />
                </div>
                <p className="text-sm text-gray-600 font-medium mb-2">Tracking Abandons Panier</p>
                <div className="flex items-start bg-white p-2 rounded border border-dashed border-gray-300">
                  <i className="fas fa-quote-left text-gray-300 text-xs mr-2 mt-0.5" />
                  <p className="text-xs text-gray-500 italic">
                    Dépendance data non livrée. Reprogrammé Sprint #{sprint.number + 1}.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 mt-3 flex-shrink-0">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Note de l'équipe</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <i className="fas fa-info-circle text-blue-400 mr-1" />
                La mise en place de WebP a nécessité plus de tests QA que prévu sur Safari iOS.
              </p>
            </div>
          </div>

          {/* Légende — identique aux badges */}
          <div className="bg-white rounded-lg card-shadow p-4 flex-shrink-0">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center">
              <i className="fas fa-info-circle text-blue-400 mr-2" /> Légende
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 bg-green-500"><i className="fas fa-rocket text-white" style={{ fontSize: 8 }} /></span>
                <span className="text-xs text-gray-600">Déployé</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 bg-green-500"><i className="fas fa-clipboard-check text-white" style={{ fontSize: 8 }} /></span>
                <span className="text-xs text-gray-600">Validé QA</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 bg-green-500"><i className="fas fa-check-circle text-white" style={{ fontSize: 8 }} /></span>
                <span className="text-xs text-gray-600">Done</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 bg-green-500"><i className="fas fa-wrench text-white" style={{ fontSize: 8 }} /></span>
                <span className="text-xs text-gray-600">Fixed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 bg-yellow-400"><i className="fas fa-vial text-white" style={{ fontSize: 8 }} /></span>
                <span className="text-xs text-gray-600">En Test</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 bg-red-500"><i className="fas fa-ban text-white" style={{ fontSize: 8 }} /></span>
                <span className="text-xs text-gray-600">Blocked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideBacklog2;
