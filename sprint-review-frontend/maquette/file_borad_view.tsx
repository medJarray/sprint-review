import React from 'react';
import { useSprint } from '../src/context/SprintContext';

const SlideBacklog2: React.FC = () => {
  const { state } = useSprint();
  const { sprint } = state;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-12 z-20" style={{ flexShrink: 0 }}>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-columns text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-atlassian-dark">Backlog — Vue Board</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
              Sprint #{sprint.number} : Avancement par Statut
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 text-sm">
            <i className="fas fa-filter text-gray-400 mr-2 text-xs" />
            <span className="font-bold text-gray-700">Tous les types</span>
          </div>
          <div className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100 text-sm font-bold">
            <i className="fas fa-th-large mr-1" /> Board View
          </div>
        </div>
      </div>

      {/* Content — Kanban Board */}
      <div className="flex-1 flex bg-atlassian-light p-6 gap-5 overflow-hidden" style={{ minHeight: 0 }}>

        {/* Column: À Faire */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-gray-400" />
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">À Faire</h3>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">2</span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            <div className="bg-white p-4 rounded-lg card-shadow border-l-4 border-gray-300 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="us-tag px-1.5 py-0.5 rounded font-bold uppercase flex items-center" style={{ fontSize: 10 }}>
                  <i className="fas fa-bookmark mr-1" /> US-103
                </span>
                <span className="story-point-badge">3</span>
              </div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">Tracking Abandons Panier</h4>
              <p className="text-xs text-gray-500 mb-3">Capturer les données précises sur l'étape d'abandon.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="bg-orange-100 text-orange-700 font-bold px-1.5 py-0.5 rounded" style={{ fontSize: 9 }}>DÉPENDANCE</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-teal-200 border border-white flex items-center justify-center font-bold text-teal-800" style={{ fontSize: 9 }}>JD</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg card-shadow border-l-4 border-blue-400 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="task-tag px-1.5 py-0.5 rounded font-bold uppercase flex items-center" style={{ fontSize: 10 }}>
                  TECH-45
                </span>
                <span className="story-point-badge">3</span>
              </div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">Upgrade React Native 0.72</h4>
              <p className="text-xs text-gray-500 mb-3">Mise à jour du framework avec migration des APIs dépréciées.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded" style={{ fontSize: 9 }}>TECH DEBT</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-200 border border-white flex items-center justify-center font-bold text-blue-800" style={{ fontSize: 9 }}>AM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Column: En Cours */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-blue-500" />
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">En Cours</h3>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">2</span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            <div className="bg-white p-4 rounded-lg card-shadow border-l-4 border-blue-500 hover:shadow-md transition-shadow ring-2 ring-blue-100">
              <div className="flex justify-between items-start mb-2">
                <span className="us-tag px-1.5 py-0.5 rounded font-bold uppercase flex items-center" style={{ fontSize: 10 }}>
                  <i className="fas fa-bookmark mr-1" /> US-102
                </span>
                <span className="story-point-badge">5</span>
              </div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">Optimisation Assets Home</h4>
              <p className="text-xs text-gray-500 mb-2">Conversion WebP et lazy-loading pour la page d'accueil.</p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '65%' }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span className="flex items-center"><i className="fas fa-code-branch mr-1" /> 5 commits</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-indigo-200 border border-white flex items-center justify-center font-bold text-indigo-800" style={{ fontSize: 9 }}>LD</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg card-shadow border-l-4 border-red-400 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="bug-tag px-1.5 py-0.5 rounded font-bold uppercase flex items-center" style={{ fontSize: 10 }}>
                  <i className="fas fa-bug mr-1" /> BUG-89
                </span>
                <span className="story-point-badge">2</span>
              </div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">Fix Login Spinner iOS</h4>
              <p className="text-xs text-gray-500 mb-2">Le spinner tourne indéfiniment sur iOS 17.</p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                <div className="bg-red-400 h-1.5 rounded-full" style={{ width: '40%' }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span className="flex items-center"><i className="fas fa-code-branch mr-1" /> 2 commits</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-red-200 border border-white flex items-center justify-center font-bold text-red-800" style={{ fontSize: 9 }}>SM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Column: En Review */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-purple-500" />
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">En Review</h3>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">1</span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            <div className="bg-white p-4 rounded-lg card-shadow border-l-4 border-purple-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="us-tag px-1.5 py-0.5 rounded font-bold uppercase flex items-center" style={{ fontSize: 10 }}>
                  <i className="fas fa-bookmark mr-1" /> US-101
                </span>
                <span className="story-point-badge">8</span>
              </div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">Paiement One-Click Mobile</h4>
              <p className="text-xs text-gray-500 mb-2">Flux complet avec confirmation biométrique.</p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '90%' }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span className="flex items-center"><i className="fas fa-code-branch mr-1" /> 12 commits</span>
                  <span className="flex items-center"><i className="fas fa-vial mr-1" /> 94%</span>
                </div>
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-blue-200 border border-white flex items-center justify-center font-bold text-blue-800" style={{ fontSize: 9 }}>AM</div>
                  <div className="w-6 h-6 rounded-full bg-green-200 border border-white flex items-center justify-center font-bold text-green-800" style={{ fontSize: 9 }}>PL</div>
                </div>
              </div>
              {/* Review comment */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-start">
                  <i className="fas fa-comment-dots text-purple-300 text-xs mr-2 mt-0.5" />
                  <p className="text-xs text-gray-500 italic">"PR approuvée, en attente du merge après validation QA finale."</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column: Terminé */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-green-500" />
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Terminé</h3>
            </div>
            <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">3</span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {[
              { id: 'US-100', title: 'Login Biométrique', pts: 5, assignee: 'LD', color: 'indigo' },
              { id: 'US-099', title: 'Refonte Header Mobile', pts: 3, assignee: 'SM', color: 'purple' },
              { id: 'TECH-44', title: 'CI Pipeline Optimisation', pts: 2, assignee: 'AM', color: 'blue', isTask: true },
            ].map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg card-shadow border-l-4 border-green-500 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-start mb-2">
                  <span className={`${item.isTask ? 'task-tag' : 'us-tag'} px-1.5 py-0.5 rounded font-bold uppercase flex items-center`} style={{ fontSize: 10 }}>
                    {!item.isTask && <i className="fas fa-bookmark mr-1" />}
                    {item.id}
                  </span>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-check-circle text-green-500 text-sm" />
                    <span className="story-point-badge">{item.pts}</span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-gray-800 mb-2 line-through opacity-70">{item.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 font-bold flex items-center">
                    <i className="fas fa-check mr-1" /> DoD Validé
                  </span>
                  <div className={`w-6 h-6 rounded-full bg-${item.color}-200 border border-white flex items-center justify-center font-bold text-${item.color}-800`} style={{ fontSize: 9 }}>{item.assignee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="h-12 bg-white border-t border-gray-200 flex items-center justify-between px-8" style={{ flexShrink: 0 }}>
        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded bg-gray-400" />
            <span className="text-gray-500 font-medium">À Faire: <span className="font-bold text-gray-700">6 pts</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded bg-blue-500" />
            <span className="text-gray-500 font-medium">En Cours: <span className="font-bold text-gray-700">7 pts</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded bg-purple-500" />
            <span className="text-gray-500 font-medium">Review: <span className="font-bold text-gray-700">8 pts</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded bg-green-500" />
            <span className="text-gray-500 font-medium">Terminé: <span className="font-bold text-gray-700">10 pts</span></span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <span className="text-gray-400 font-bold mr-2">WIP Limit:</span>
            <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-100">3 max / dev</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center text-gray-500 font-medium">
            <i className="fas fa-clock mr-1.5 text-gray-400" />
            Mis à jour il y a 2 min
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideBacklog2;
