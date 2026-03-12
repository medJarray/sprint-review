import React from 'react';
import { useSprint } from '../../context/SprintContext';

const SlideDemo: React.FC = () => {
  const { state } = useSprint();
  const { sprint, demoConfig } = state;
  const { environment, testAccount, version, steps, demoOwner, demoOwnerInitials, videoLink, figmaLink } = demoConfig;

  // Find the first note from steps for the bottom note
  const noteStep = steps.find((s) => s.note);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-12 z-20 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-desktop text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-atlassian-dark">Démonstration</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
              Sprint #{sprint.number} : Parcours Utilisateur
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
            <div className="flex flex-col mr-4 border-r border-gray-300 pr-4">
              <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '10px' }}>Environnement</span>
              <span className="text-sm font-bold text-gray-700 flex items-center">
                <i className="fas fa-server text-purple-500 mr-2 text-xs" /> {environment}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 font-bold uppercase" style={{ fontSize: '10px' }}>Compte Test</span>
              <span className="text-sm font-bold text-gray-700 flex items-center">
                <i className="fas fa-user-circle text-purple-500 mr-2 text-xs" /> {testAccount}
              </span>
            </div>
          </div>
          <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-md border border-purple-200 font-bold text-sm">
            {version || `v${sprint.number}.0.0-rc.1`}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex bg-atlassian-light p-8 gap-8 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Left Column: Scenario Steps */}
        <div style={{ width: '35%' }} className="flex flex-col h-full">
          <div className="bg-white rounded-lg card-shadow p-6 flex-1 flex flex-col">
            <h2 className="text-lg font-bold text-atlassian-dark mb-6 flex items-center border-b border-gray-100 pb-4">
              <i className="fas fa-list-ol text-purple-500 mr-3" />
              Scénario de Démo
            </h2>

            <div className="space-y-6 relative">
              <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gray-200" style={{ zIndex: -1 }} />

              {steps.map((step) => {
                const isActive = step.isActive;
                const circleClass = isActive
                  ? step.stepNumber === 1
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'bg-purple-500 text-white shadow-sm'
                  : 'bg-gray-200 text-gray-600';

                return (
                  <div key={step.id} className="flex items-start group">
                    <div
                      className={`w-6 h-6 rounded-full ${circleClass} flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5`}
                      style={{ boxShadow: '0 0 0 4px white' }}
                    >
                      {step.stepNumber}
                    </div>
                    <div className={`ml-4 flex-1 ${!isActive ? 'opacity-70' : ''}`}>
                      <h3 className="text-sm font-bold text-gray-800">{step.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.description}</p>
                      {step.note && (
                        <div className="mt-2 flex items-center bg-gray-50 w-max px-2 py-0.5 rounded text-gray-500 border border-gray-100" style={{ fontSize: '10px' }}>
                          <i className="fas fa-database mr-1.5 text-gray-400" /> {step.note}
                        </div>
                      )}
                      {step.featureRef && (
                        <div className="mt-2 flex items-center bg-purple-50 w-max px-2 py-0.5 rounded text-purple-700 font-bold border border-purple-100" style={{ fontSize: '10px' }}>
                          <i className="fas fa-bolt mr-1.5" /> {step.featureRef}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {noteStep && (
              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex items-start">
                  <i className="fas fa-lightbulb text-yellow-500 mt-0.5 mr-2 text-xs" />
                  <p className="text-xs text-yellow-800">
                    <span className="font-bold">Note:</span> {noteStep.note}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Demo Area */}
        <div style={{ width: '65%' }} className="flex flex-col gap-6">
          <div className="bg-white rounded-lg card-shadow p-8 flex-1 flex items-center justify-center bg-gray-50 relative border border-gray-200">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#6B7280 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <div className="flex space-x-12 items-center relative z-10">
              {/* Screen 1: Cart */}
              <div className="flex flex-col items-center">
                <div className="device-frame" style={{ width: 200, height: 400 }}>
                  <div className="device-notch" />
                  <div className="w-full h-full flex flex-col pt-6 bg-gray-50">
                    <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 mb-2">
                      <div className="w-4 h-4 rounded-full bg-gray-200" />
                      <div className="h-2 w-20 bg-gray-200 rounded ml-2" />
                    </div>
                    <div className="flex-1 px-4 space-y-3">
                      <div className="h-24 bg-white rounded shadow-sm border border-gray-100" />
                      <div className="h-24 bg-white rounded shadow-sm border border-gray-100" />
                    </div>
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="h-10 bg-atlassian-blue rounded flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        Payer (One-Click)
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-500 mt-3 uppercase tracking-wide">1. Panier</p>
              </div>

              <div className="text-gray-300">
                <i className="fas fa-chevron-right text-3xl" />
              </div>

              {/* Screen 2: Biometric */}
              <div className="flex flex-col items-center">
                <div className="device-frame shadow-2xl transform scale-105" style={{ width: 200, height: 400 }}>
                  <div className="device-notch" />
                  <div className="w-full h-full flex flex-col pt-6 bg-gray-800 bg-opacity-90 items-center justify-center">
                    <div className="bg-white rounded-xl p-4 text-center" style={{ width: '80%' }}>
                      <i className="fas fa-fingerprint text-4xl text-red-500 mb-2" />
                      <div className="h-2 w-24 bg-gray-200 rounded mx-auto mb-2" />
                      <div className="h-1.5 w-16 bg-gray-100 rounded mx-auto" />
                    </div>
                  </div>
                </div>
                <p className="text-xs font-bold text-purple-600 mt-3 uppercase tracking-wide flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
                  2. Validation
                </p>
              </div>

              <div className="text-gray-300">
                <i className="fas fa-chevron-right text-3xl" />
              </div>

              {/* Screen 3: Success */}
              <div className="flex flex-col items-center">
                <div className="device-frame" style={{ width: 200, height: 400 }}>
                  <div className="device-notch" />
                  <div className="w-full h-full flex flex-col pt-6 bg-green-50 items-center justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4">
                      <i className="fas fa-check text-2xl" />
                    </div>
                    <div className="h-3 w-32 bg-green-200 rounded mb-2" />
                    <div className="h-2 w-20 bg-green-100 rounded" />
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-500 mt-3 uppercase tracking-wide">3. Succès</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="h-16 bg-white rounded-lg card-shadow px-6 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {videoLink && (
                <a href={videoLink} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                  <i className="fas fa-video mr-2" />
                  Voir l'enregistrement complet (.mp4)
                </a>
              )}
              {figmaLink && (
                <a href={figmaLink} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                  <i className="fab fa-figma mr-2" />
                  Maquettes Figma
                </a>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-xs font-bold text-gray-400 uppercase mr-3">Responsable Démo:</span>
              <div className="flex items-center bg-gray-100 pl-1 pr-3 py-1 rounded-full">
                <div className="w-6 h-6 rounded-full bg-purple-200 border border-white font-bold text-purple-800 flex items-center justify-center mr-2" style={{ fontSize: '10px' }}>{demoOwnerInitials}</div>
                <span className="text-xs font-bold text-gray-700">{demoOwner}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideDemo;
