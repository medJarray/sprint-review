import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSprint } from '../context/SprintContext';
import { useSprintApi } from '../hooks/useSprintApi';

const tabs = [
  { id: 'sprints', label: 'Sprints', icon: 'fa-layer-group' },
  { id: 'general', label: 'Général', icon: 'fa-cog' },
  { id: 'objectifs', label: 'Objectifs', icon: 'fa-bullseye' },
  { id: 'backlog', label: 'Backlog & US', icon: 'fa-list-check' },
  { id: 'realisations', label: 'Réalisations', icon: 'fa-gift' },
  { id: 'demo', label: 'Démo', icon: 'fa-desktop' },
  { id: 'metriques', label: 'Métriques', icon: 'fa-chart-line' },
  { id: 'evolution', label: 'Évolution Backlog', icon: 'fa-stream' },
  { id: 'nextsteps', label: 'Prochaines Étapes', icon: 'fa-step-forward' },
  { id: 'presentation', label: 'Présentation', icon: 'fa-sliders-h' },
];

const AdminPage: React.FC = () => {
  const { state, dispatch, multiSprintState } = useSprint();
  const [activeTab, setActiveTab] = useState('sprints');
  const [newSprintName, setNewSprintName] = useState('');
  const [newSprintNumber, setNewSprintNumber] = useState(1);

  // ── Hook API Backend ──
  const sprintId = multiSprintState.activeSprintId;
  const {
    loading: apiLoading,
    loadFromApi,
    saveSprint,
    saveObjectives,
    saveBacklog,
    saveRealizations,
    saveDemoConfig,
    saveMetrics,
    saveBacklogEvolution,
    saveNextSteps,
    saveStyles,
    savePages,
    saveAll,
    saveStates,
  } = useSprintApi(sprintId);

  const update = (key: string, value: any) => {
    dispatch({ type: 'UPDATE_SLIDE_DATA', payload: { key, value } });
  };

  // ── Bouton de sauvegarde avec état ──
  const SaveButton: React.FC<{ label: string; stateKey: string; onSave: () => Promise<void> }> = ({ label, stateKey, onSave }) => {
    const s = saveStates[stateKey];
    const isSaving = s?.status === 'saving';
    const isSuccess = s?.status === 'success';
    const isError = s?.status === 'error';
    return (
      <button
        onClick={onSave}
        disabled={isSaving}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          isSuccess ? 'bg-green-100 text-green-700' :
          isError ? 'bg-red-100 text-red-700' :
          isSaving ? 'bg-yellow-100 text-yellow-700 animate-pulse' :
          'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }`}
        title={isError ? s?.error : isSuccess ? 'Sauvegardé !' : `Sauvegarder ${label} dans l'API`}
      >
        <i className={`fas ${isSuccess ? 'fa-check' : isError ? 'fa-exclamation-triangle' : isSaving ? 'fa-spinner fa-spin' : 'fa-cloud-upload-alt'} mr-1`} />
        {isSaving ? 'Envoi...' : isSuccess ? 'OK !' : isError ? 'Erreur' : label}
      </button>
    );
  };

  // ── Bouton de sauvegarde pour chaque section ──
  const getSaveFunctionForTab = (): { label: string; key: string; fn: () => Promise<void> } | null => {
    switch (activeTab) {
      case 'general': return { label: 'Sprint', key: 'sprint', fn: saveSprint };
      case 'objectifs': return { label: 'Objectifs', key: 'objectives', fn: saveObjectives };
      case 'backlog': return { label: 'Backlog', key: 'backlog', fn: saveBacklog };
      case 'realisations': return { label: 'Réalisations', key: 'realizations', fn: saveRealizations };
      case 'demo': return { label: 'Démo', key: 'demoConfig', fn: saveDemoConfig };
      case 'metriques': return { label: 'Métriques', key: 'metrics', fn: saveMetrics };
      case 'evolution': return { label: 'Évolution', key: 'backlogEvolution', fn: saveBacklogEvolution };
      case 'nextsteps': return { label: 'Prochaines Étapes', key: 'nextSteps', fn: saveNextSteps };
      case 'presentation': return { label: 'Présentation', key: 'styles', fn: async () => { await saveStyles(); await savePages(); } };
      default: return null;
    }
  };

  const renderInput = (label: string, value: string | number, onChange: (v: string) => void, type = 'text') => (
    <div className="mb-3">
      <label className="block text-xs font-bold text-gray-600 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    </div>
  );

  const renderTextarea = (label: string, value: string, onChange: (v: string) => void, rows = 2) => (
    <div className="mb-3">
      <label className="block text-xs font-bold text-gray-600 mb-1">{label}</label>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    </div>
  );

  const renderListEditor = (label: string, items: { id: string; text: string }[], stateKey: string) => (
    <div className="mb-4">
      <p className="text-sm font-bold text-gray-700 mb-2">{label}</p>
      {items.map((item, i) => (
        <div key={item.id} className="flex items-center gap-2 mb-2">
          <input value={item.text} onChange={(e) => { const arr = [...items]; arr[i] = { ...arr[i], text: e.target.value }; update(stateKey, arr); }} className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm" />
          <button onClick={() => update(stateKey, items.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 text-sm px-2"><i className="fas fa-times" /></button>
        </div>
      ))}
      <button onClick={() => update(stateKey, [...items, { id: Date.now().toString(), text: '' }])} className="text-xs text-blue-600 hover:text-blue-800 mt-1"><i className="fas fa-plus mr-1" />Ajouter</button>
    </div>
  );

  // ── SPRINTS ──
  const renderSprints = () => (
    <div className="space-y-6">
      {/* Current Sprint Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-80 font-medium">Sprint actif</p>
            <h2 className="text-2xl font-bold mt-1">
              Sprint {state.sprint.number} — {state.sprint.name}
            </h2>
            <p className="text-sm opacity-80 mt-1">{state.sprint.goal || 'Aucun objectif défini'}</p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-black">
              {state.sprint.number}
            </div>
          </div>
        </div>
      </div>

      {/* Create New Sprint */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          <i className="fas fa-plus-circle text-green-500 mr-2" />Créer un nouveau Sprint
        </h3>
        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Nom du Sprint</label>
            <input
              type="text"
              placeholder="Ex: Refonte UX Mobile"
              value={newSprintName}
              onChange={(e) => setNewSprintName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Numéro</label>
            <input
              type="number"
              value={newSprintNumber}
              onChange={(e) => setNewSprintNumber(parseInt(e.target.value) || 1)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => {
              if (newSprintName.trim()) {
                dispatch({ type: 'ADD_SPRINT', payload: { name: newSprintName.trim(), number: newSprintNumber } });
                setNewSprintName('');
                setNewSprintNumber(newSprintNumber + 1);
              }
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
          >
            <i className="fas fa-plus mr-2" />Créer le Sprint
          </button>
        </div>
      </div>

      {/* Sprint List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          <i className="fas fa-list text-blue-500 mr-2" />Tous les Sprints ({multiSprintState.sprints.length})
        </h3>
        <div className="space-y-3">
          {multiSprintState.sprints.map((entry) => {
            const isActive = entry.id === multiSprintState.activeSprintId;
            return (
              <div
                key={entry.id}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {entry.data.sprint.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`font-bold ${isActive ? 'text-blue-800' : 'text-gray-800'}`}>
                        Sprint {entry.data.sprint.number} — {entry.data.sprint.name}
                      </h4>
                      {isActive && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">Actif</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {entry.data.sprint.startDate && entry.data.sprint.endDate
                        ? `${entry.data.sprint.startDate} → ${entry.data.sprint.endDate}`
                        : 'Dates non définies'}
                      {entry.data.sprint.goal ? ` • ${entry.data.sprint.goal}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isActive && (
                    <button
                      onClick={() => dispatch({ type: 'SWITCH_SPRINT', payload: { sprintId: entry.id } })}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
                    >
                      <i className="fas fa-arrow-right mr-1" />Basculer
                    </button>
                  )}
                  <button
                    onClick={() => dispatch({ type: 'DUPLICATE_SPRINT', payload: { sourceId: entry.id } })}
                    className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-200 transition-colors"
                    title="Dupliquer ce sprint"
                  >
                    <i className="fas fa-copy mr-1" />Dupliquer
                  </button>
                  {multiSprintState.sprints.length > 1 && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Supprimer le Sprint ${entry.data.sprint.number} — ${entry.data.sprint.name} ?`)) {
                          dispatch({ type: 'DELETE_SPRINT', payload: { sprintId: entry.id } });
                        }
                      }}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors"
                      title="Supprimer ce sprint"
                    >
                      <i className="fas fa-trash" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── GENERAL ──
  const renderGeneral = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-info-circle text-blue-500 mr-2" />Informations Sprint</h3>
        <div className="grid grid-cols-2 gap-4">
          {renderInput('Nom du projet', state.sprint.name, (v) => dispatch({ type: 'SET_SPRINT', payload: { name: v } }))}
          {renderInput('Numéro de Sprint', state.sprint.number, (v) => dispatch({ type: 'SET_SPRINT', payload: { number: parseInt(v) || 0 } }), 'number')}
          {renderInput('Objectif Sprint', state.sprint.goal, (v) => dispatch({ type: 'SET_SPRINT', payload: { goal: v } }))}
          {renderInput('Date début', state.sprint.startDate, (v) => dispatch({ type: 'SET_SPRINT', payload: { startDate: v } }), 'date')}
          {renderInput('Date fin', state.sprint.endDate, (v) => dispatch({ type: 'SET_SPRINT', payload: { endDate: v } }), 'date')}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-chart-bar text-green-500 mr-2" />Métriques Globales</h3>
        <div className="grid grid-cols-2 gap-4">
          {renderInput('Points planifiés', state.metrics.plannedPoints, (v) => dispatch({ type: 'SET_METRICS', payload: { plannedPoints: parseInt(v) || 0 } }), 'number')}
          {renderInput('Points complétés', state.metrics.completedPoints, (v) => dispatch({ type: 'SET_METRICS', payload: { completedPoints: parseInt(v) || 0 } }), 'number')}
        </div>
      </div>
    </div>
  );

  // ── OBJECTIFS ──
  const renderObjectifs = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800"><i className="fas fa-bullseye text-blue-500 mr-2" />Objectifs SMART</h3>
          <button onClick={() => update('objectives', [...state.objectives, { id: Date.now().toString(), title: '', description: '', priority: '', scope: '', epicLink: '', borderColor: 'border-blue-600' }])} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"><i className="fas fa-plus mr-1" />Ajouter</button>
        </div>
        {state.objectives.map((obj, i) => (
          <div key={obj.id} className="border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-500">Objectif #{i + 1}</span>
              <button onClick={() => update('objectives', state.objectives.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 text-xs"><i className="fas fa-trash" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {renderInput('Titre', obj.title, (v) => { const arr = [...state.objectives]; arr[i] = { ...arr[i], title: v }; update('objectives', arr); })}
              {renderInput('Priorité', obj.priority, (v) => { const arr = [...state.objectives]; arr[i] = { ...arr[i], priority: v }; update('objectives', arr); })}
            </div>
            {renderTextarea('Description', obj.description, (v) => { const arr = [...state.objectives]; arr[i] = { ...arr[i], description: v }; update('objectives', arr); })}
            <div className="grid grid-cols-2 gap-3">
              {renderInput('Portée', obj.scope, (v) => { const arr = [...state.objectives]; arr[i] = { ...arr[i], scope: v }; update('objectives', arr); })}
              {renderInput('Lien Épique', obj.epicLink || '', (v) => { const arr = [...state.objectives]; arr[i] = { ...arr[i], epicLink: v }; update('objectives', arr); })}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {renderListEditor('Critères de Succès', state.successCriteria, 'successCriteria')}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {renderListEditor('Contraintes', state.constraints, 'constraints')}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {renderListEditor('Definition of Done', state.dodItems, 'dodItems')}
      </div>
    </div>
  );

  // ── BACKLOG ──
  const renderBacklog = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800"><i className="fas fa-stream text-indigo-500 mr-2" />Enablers</h3>
          <button onClick={() => update('enablers', [...state.enablers, { id: Date.now().toString(), epicId: '', name: '', bgColor: 'bg-blue-50', textColor: 'text-blue-800', iconColor: 'text-blue-500', stories: [] }])} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"><i className="fas fa-plus mr-1" />Ajouter Enabler</button>
        </div>
        {state.enablers.map((enabler, ei) => (
          <div key={enabler.id} className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-indigo-700">Enabler #{ei + 1}</span>
              <button onClick={() => update('enablers', state.enablers.filter((_, idx) => idx !== ei))} className="text-red-500 text-xs"><i className="fas fa-trash" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {renderInput('ID Épique', enabler.epicId, (v) => { const arr = [...state.enablers]; arr[ei] = { ...arr[ei], epicId: v }; update('enablers', arr); })}
              {renderInput('Nom', enabler.name, (v) => { const arr = [...state.enablers]; arr[ei] = { ...arr[ei], name: v }; update('enablers', arr); })}
            </div>
            <div className="ml-4 border-l-2 border-indigo-200 pl-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500">User Stories</span>
                <button onClick={() => { const arr = [...state.enablers]; arr[ei] = { ...arr[ei], stories: [...arr[ei].stories, { id: Date.now().toString(), storyId: '', title: '', points: 0, asA: '', iWant: '', soThat: '', ac: '' }] }; update('enablers', arr); }} className="text-xs text-blue-600"><i className="fas fa-plus mr-1" />Ajouter US</button>
              </div>
              {enabler.stories.map((story, si) => (
                <div key={story.id} className="bg-gray-50 rounded p-3 mb-2 border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">Story #{si + 1}</span>
                    <button onClick={() => { const arr = [...state.enablers]; arr[ei] = { ...arr[ei], stories: arr[ei].stories.filter((_, idx) => idx !== si) }; update('enablers', arr); }} className="text-red-400 text-xs"><i className="fas fa-times" /></button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {renderInput('ID', story.storyId, (v) => { const arr = [...state.enablers]; arr[ei].stories[si] = { ...arr[ei].stories[si], storyId: v }; update('enablers', arr); })}
                    {renderInput('Titre', story.title, (v) => { const arr = [...state.enablers]; arr[ei].stories[si] = { ...arr[ei].stories[si], title: v }; update('enablers', arr); })}
                    {renderInput('Points', story.points, (v) => { const arr = [...state.enablers]; arr[ei].stories[si] = { ...arr[ei].stories[si], points: parseInt(v) || 0 }; update('enablers', arr); }, 'number')}
                  </div>
                  {renderInput('En tant que', story.asA, (v) => { const arr = [...state.enablers]; arr[ei].stories[si] = { ...arr[ei].stories[si], asA: v }; update('enablers', arr); })}
                  {renderInput('Je veux', story.iWant, (v) => { const arr = [...state.enablers]; arr[ei].stories[si] = { ...arr[ei].stories[si], iWant: v }; update('enablers', arr); })}
                  {renderInput('Afin de', story.soThat, (v) => { const arr = [...state.enablers]; arr[ei].stories[si] = { ...arr[ei].stories[si], soThat: v }; update('enablers', arr); })}
                  {renderInput('Critères d\'acceptation', story.ac || '', (v) => { const arr = [...state.enablers]; arr[ei].stories[si] = { ...arr[ei].stories[si], ac: v }; update('enablers', arr); })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800"><i className="fas fa-cogs text-gray-500 mr-2" />Tâches Techniques & Bugs</h3>
          <button onClick={() => update('techTasks', [...state.techTasks, { id: Date.now().toString(), taskId: '', title: '', points: 0, type: 'tech' as const }])} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"><i className="fas fa-plus mr-1" />Ajouter</button>
        </div>
        {state.techTasks.map((task, i) => (
          <div key={task.id} className="flex items-center gap-3 mb-2 border border-gray-200 rounded p-3">
            {renderInput('ID', task.taskId, (v) => { const arr = [...state.techTasks]; arr[i] = { ...arr[i], taskId: v }; update('techTasks', arr); })}
            {renderInput('Titre', task.title, (v) => { const arr = [...state.techTasks]; arr[i] = { ...arr[i], title: v }; update('techTasks', arr); })}
            {renderInput('Points', task.points, (v) => { const arr = [...state.techTasks]; arr[i] = { ...arr[i], points: parseInt(v) || 0 }; update('techTasks', arr); }, 'number')}
            <div className="mb-3">
              <label className="block text-xs font-bold text-gray-600 mb-1">Type</label>
              <select value={task.type} onChange={(e) => { const arr = [...state.techTasks]; arr[i] = { ...arr[i], type: e.target.value as 'tech' | 'bug' }; update('techTasks', arr); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="tech">Tech</option>
                <option value="bug">Bug</option>
              </select>
            </div>
            <button onClick={() => update('techTasks', state.techTasks.filter((_, idx) => idx !== i))} className="text-red-400 text-sm mt-2"><i className="fas fa-trash" /></button>
          </div>
        ))}
      </div>
    </div>
  );

  // ── RÉALISATIONS ──
  const renderRealisations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800"><i className="fas fa-gift text-green-500 mr-2" />Features Principales</h3>
          <button onClick={() => update('featureCards', [...state.featureCards, { id: Date.now().toString(), storyId: '', title: '', description: '', status: 'done' as const, impact: '', prLink: '', assignees: [] }])} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"><i className="fas fa-plus mr-1" />Ajouter</button>
        </div>
        {state.featureCards.map((card, i) => (
          <div key={card.id} className="border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-gray-500">Feature #{i + 1}</span>
              <button onClick={() => update('featureCards', state.featureCards.filter((_, idx) => idx !== i))} className="text-red-500 text-xs"><i className="fas fa-trash" /></button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {renderInput('Story ID', card.storyId, (v) => { const arr = [...state.featureCards]; arr[i] = { ...arr[i], storyId: v }; update('featureCards', arr); })}
              {renderInput('Titre', card.title, (v) => { const arr = [...state.featureCards]; arr[i] = { ...arr[i], title: v }; update('featureCards', arr); })}
              <div className="mb-3">
                <label className="block text-xs font-bold text-gray-600 mb-1">Statut</label>
                <select value={card.status} onChange={(e) => { const arr = [...state.featureCards]; arr[i] = { ...arr[i], status: e.target.value as any }; update('featureCards', arr); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="deployed">Déployé</option>
                  <option value="validated">Validé QA</option>
                  <option value="done">Done</option>
                  <option value="fixed">Fixed</option>
                  <option value="testing">En Test</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
            {renderTextarea('Description', card.description, (v) => { const arr = [...state.featureCards]; arr[i] = { ...arr[i], description: v }; update('featureCards', arr); })}
            <div className="grid grid-cols-2 gap-3">
              {renderInput('Impact', card.impact || '', (v) => { const arr = [...state.featureCards]; arr[i] = { ...arr[i], impact: v }; update('featureCards', arr); })}
              {renderInput('PR / Lien', card.prLink || '', (v) => { const arr = [...state.featureCards]; arr[i] = { ...arr[i], prLink: v }; update('featureCards', arr); })}
            </div>
            {renderInput('Assignés (séparés par virgule)', card.assignees.join(', '), (v) => { const arr = [...state.featureCards]; arr[i] = { ...arr[i], assignees: v.split(',').map(s => s.trim()).filter(Boolean) }; update('featureCards', arr); })}
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800"><i className="fas fa-th-large text-blue-500 mr-2" />Petites Cartes</h3>
          <button onClick={() => update('smallCards', [...state.smallCards, { id: Date.now().toString(), type: '', title: '', description: '', status: 'done' as const }])} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"><i className="fas fa-plus mr-1" />Ajouter</button>
        </div>
        {state.smallCards.map((card, i) => (
          <div key={card.id} className="grid grid-cols-5 gap-2 mb-2 items-end">
            {renderInput('Type', card.type, (v) => { const arr = [...state.smallCards]; arr[i] = { ...arr[i], type: v }; update('smallCards', arr); })}
            {renderInput('Titre', card.title, (v) => { const arr = [...state.smallCards]; arr[i] = { ...arr[i], title: v }; update('smallCards', arr); })}
            {renderInput('Description', card.description, (v) => { const arr = [...state.smallCards]; arr[i] = { ...arr[i], description: v }; update('smallCards', arr); })}
            <div className="mb-3">
              <label className="block text-xs font-bold text-gray-600 mb-1">Statut</label>
              <select value={card.status} onChange={(e) => { const arr = [...state.smallCards]; arr[i] = { ...arr[i], status: e.target.value as any }; update('smallCards', arr); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="done">Done</option><option value="fixed">Fixed</option><option value="testing">En Test</option><option value="blocked">Blocked</option>
              </select>
            </div>
            <button onClick={() => update('smallCards', state.smallCards.filter((_, idx) => idx !== i))} className="text-red-400 text-sm mb-4"><i className="fas fa-trash" /></button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-sticky-note text-yellow-500 mr-2" />Éléments Reportés & Note</h3>
        <div className="mb-4">
          {state.deferredItems.map((item, i) => (
            <div key={item.id} className="grid grid-cols-4 gap-2 mb-2 items-end">
              {renderInput('Story ID', item.storyId, (v) => { const arr = [...state.deferredItems]; arr[i] = { ...arr[i], storyId: v }; update('deferredItems', arr); })}
              {renderInput('Titre', item.title, (v) => { const arr = [...state.deferredItems]; arr[i] = { ...arr[i], title: v }; update('deferredItems', arr); })}
              {renderInput('Raison', item.reason, (v) => { const arr = [...state.deferredItems]; arr[i] = { ...arr[i], reason: v }; update('deferredItems', arr); })}
              <button onClick={() => update('deferredItems', state.deferredItems.filter((_, idx) => idx !== i))} className="text-red-400 text-sm mb-4"><i className="fas fa-trash" /></button>
            </div>
          ))}
          <button onClick={() => update('deferredItems', [...state.deferredItems, { id: Date.now().toString(), storyId: '', title: '', reason: '' }])} className="text-xs text-blue-600"><i className="fas fa-plus mr-1" />Ajouter</button>
        </div>
        {renderTextarea('Note de l\'équipe', state.teamNote, (v) => update('teamNote', v))}
      </div>
    </div>
  );

  // ── DEMO ──
  const renderDemo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-desktop text-purple-500 mr-2" />Configuration Démo</h3>
        <div className="grid grid-cols-3 gap-4">
          {renderInput('Environnement', state.demoConfig.environment, (v) => update('demoConfig', { ...state.demoConfig, environment: v }))}
          {renderInput('Compte Test', state.demoConfig.testAccount, (v) => update('demoConfig', { ...state.demoConfig, testAccount: v }))}
          {renderInput('Version', state.demoConfig.version, (v) => update('demoConfig', { ...state.demoConfig, version: v }))}
          {renderInput('Responsable', state.demoConfig.demoOwner, (v) => update('demoConfig', { ...state.demoConfig, demoOwner: v }))}
          {renderInput('Initiales', state.demoConfig.demoOwnerInitials, (v) => update('demoConfig', { ...state.demoConfig, demoOwnerInitials: v }))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800"><i className="fas fa-list-ol text-purple-500 mr-2" />Étapes de Démo</h3>
          <button onClick={() => update('demoConfig', { ...state.demoConfig, steps: [...state.demoConfig.steps, { id: Date.now().toString(), stepNumber: state.demoConfig.steps.length + 1, title: '', description: '', isActive: false }] })} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"><i className="fas fa-plus mr-1" />Ajouter</button>
        </div>
        {state.demoConfig.steps.map((step, i) => (
          <div key={step.id} className="border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-500">Étape {step.stepNumber}</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-xs">
                  <input type="checkbox" checked={step.isActive} onChange={(e) => { const steps = [...state.demoConfig.steps]; steps[i] = { ...steps[i], isActive: e.target.checked }; update('demoConfig', { ...state.demoConfig, steps }); }} />
                  Active
                </label>
                <button onClick={() => update('demoConfig', { ...state.demoConfig, steps: state.demoConfig.steps.filter((_, idx) => idx !== i) })} className="text-red-500 text-xs"><i className="fas fa-trash" /></button>
              </div>
            </div>
            {renderInput('Titre', step.title, (v) => { const steps = [...state.demoConfig.steps]; steps[i] = { ...steps[i], title: v }; update('demoConfig', { ...state.demoConfig, steps }); })}
            {renderTextarea('Description', step.description, (v) => { const steps = [...state.demoConfig.steps]; steps[i] = { ...steps[i], description: v }; update('demoConfig', { ...state.demoConfig, steps }); })}
            {renderInput('Note / Ref Feature', step.note || step.featureRef || '', (v) => { const steps = [...state.demoConfig.steps]; steps[i] = { ...steps[i], note: v }; update('demoConfig', { ...state.demoConfig, steps }); })}
          </div>
        ))}
      </div>
    </div>
  );

  // ── MÉTRIQUES ──
  const renderMetriques = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-tachometer-alt text-blue-500 mr-2" />KPIs</h3>
        {state.kpiCards.map((kpi, i) => (
          <div key={kpi.id} className="grid grid-cols-5 gap-2 mb-2 items-end border border-gray-100 rounded p-2">
            {renderInput('Label', kpi.label, (v) => { const arr = [...state.kpiCards]; arr[i] = { ...arr[i], label: v }; update('kpiCards', arr); })}
            {renderInput('Valeur', kpi.value, (v) => { const arr = [...state.kpiCards]; arr[i] = { ...arr[i], value: v }; update('kpiCards', arr); })}
            {renderInput('Unité', kpi.unit, (v) => { const arr = [...state.kpiCards]; arr[i] = { ...arr[i], unit: v }; update('kpiCards', arr); })}
            {renderInput('Badge', kpi.badgeText, (v) => { const arr = [...state.kpiCards]; arr[i] = { ...arr[i], badgeText: v }; update('kpiCards', arr); })}
            {renderInput('Sous-texte', kpi.subText, (v) => { const arr = [...state.kpiCards]; arr[i] = { ...arr[i], subText: v }; update('kpiCards', arr); })}
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-fire-alt text-orange-500 mr-2" />Burndown</h3>
        {renderInput('Idéal (valeurs séparées par virgule)', state.burndownIdeal.join(', '), (v) => update('burndownIdeal', v.split(',').map(x => parseFloat(x.trim()) || 0)))}
        {renderInput('Réel (valeurs séparées par virgule)', state.burndownReal.join(', '), (v) => update('burndownReal', v.split(',').map(x => parseFloat(x.trim()) || 0)))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-history text-blue-500 mr-2" />Historique Vélocité</h3>
        {state.velocityHistory.map((v, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2 items-end">
            {renderInput('Sprint', v.label, (val) => { const arr = [...state.velocityHistory]; arr[i] = { ...arr[i], label: val }; update('velocityHistory', arr); })}
            {renderInput('Points', v.value, (val) => { const arr = [...state.velocityHistory]; arr[i] = { ...arr[i], value: parseInt(val) || 0 }; update('velocityHistory', arr); }, 'number')}
            <button onClick={() => update('velocityHistory', state.velocityHistory.filter((_, idx) => idx !== i))} className="text-red-400 text-sm mb-4"><i className="fas fa-trash" /></button>
          </div>
        ))}
        <button onClick={() => update('velocityHistory', [...state.velocityHistory, { label: '', value: 0 }])} className="text-xs text-blue-600"><i className="fas fa-plus mr-1" />Ajouter</button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-lightbulb text-yellow-500 mr-2" />Insights</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-bold text-green-700 mb-2">✅ Bien fonctionné</p>
            {renderListEditor('', state.insightsGood, 'insightsGood')}
          </div>
          <div>
            <p className="text-sm font-bold text-orange-700 mb-2">⚠️ Points d'attention</p>
            {renderListEditor('', state.insightsBad, 'insightsBad')}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-shield-alt text-green-500 mr-2" />Quality Gate</h3>
        <div className="grid grid-cols-3 gap-4">
          {renderInput('Unit Tests (%)', state.qualityGate.unitTests, (v) => update('qualityGate', { ...state.qualityGate, unitTests: parseInt(v) || 0 }), 'number')}
          {renderInput('Sonar Grade', state.qualityGate.sonarGrade, (v) => update('qualityGate', { ...state.qualityGate, sonarGrade: v }))}
          {renderInput('E2E Tests (%)', state.qualityGate.e2eTests, (v) => update('qualityGate', { ...state.qualityGate, e2eTests: parseInt(v) || 0 }), 'number')}
        </div>
      </div>
    </div>
  );

  // ── EVOLUTION ──
  const renderEvolution = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-heartbeat text-indigo-500 mr-2" />Santé du Backlog</h3>
        <div className="grid grid-cols-3 gap-4">
          {renderInput('Items Totaux', state.backlogHealth.totalItems, (v) => update('backlogHealth', { ...state.backlogHealth, totalItems: parseInt(v) || 0 }), 'number')}
          {renderInput('% Ready', state.backlogHealth.readyPercent, (v) => update('backlogHealth', { ...state.backlogHealth, readyPercent: parseInt(v) || 0 }), 'number')}
          {renderInput('Âge Moyen', state.backlogHealth.avgAge, (v) => update('backlogHealth', { ...state.backlogHealth, avgAge: v }))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-exchange-alt text-orange-500 mr-2" />Changements Backlog</h3>
        <div className="grid grid-cols-3 gap-4">
          {renderInput('Ajoutés', state.backlogChanges.added, (v) => update('backlogChanges', { ...state.backlogChanges, added: parseInt(v) || 0 }), 'number')}
          {renderInput('Retirés', state.backlogChanges.removed, (v) => update('backlogChanges', { ...state.backlogChanges, removed: parseInt(v) || 0 }), 'number')}
          {renderInput('Repriorisés', state.backlogChanges.reprioritized, (v) => update('backlogChanges', { ...state.backlogChanges, reprioritized: parseInt(v) || 0 }), 'number')}
        </div>
      </div>
    </div>
  );

  // ── PROCHAINES ÉTAPES ──
  const renderNextSteps = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800"><i className="fas fa-list-ul text-blue-500 mr-2" />Candidats Sprint #{state.sprint.number + 1}</h3>
          <button onClick={() => update('nextSprintCandidates', [...state.nextSprintCandidates, { id: Date.now().toString(), storyId: '', title: '', description: '', priority: '' as const, points: 0, type: 'us' }])} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"><i className="fas fa-plus mr-1" />Ajouter</button>
        </div>
        {renderInput('Date lancement', state.nextSprintDate, (v) => update('nextSprintDate', v))}
        {state.nextSprintCandidates.map((c, i) => (
          <div key={c.id} className="border border-gray-200 rounded-lg p-3 mb-3">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold text-gray-500">#{i + 1}</span>
              <button onClick={() => update('nextSprintCandidates', state.nextSprintCandidates.filter((_, idx) => idx !== i))} className="text-red-500 text-xs"><i className="fas fa-trash" /></button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {renderInput('ID', c.storyId, (v) => { const arr = [...state.nextSprintCandidates]; arr[i] = { ...arr[i], storyId: v }; update('nextSprintCandidates', arr); })}
              {renderInput('Titre', c.title, (v) => { const arr = [...state.nextSprintCandidates]; arr[i] = { ...arr[i], title: v }; update('nextSprintCandidates', arr); })}
              {renderInput('Points', c.points, (v) => { const arr = [...state.nextSprintCandidates]; arr[i] = { ...arr[i], points: parseInt(v) || 0 }; update('nextSprintCandidates', arr); }, 'number')}
              <div className="mb-3">
                <label className="block text-xs font-bold text-gray-600 mb-1">Priorité</label>
                <select value={c.priority} onChange={(e) => { const arr = [...state.nextSprintCandidates]; arr[i] = { ...arr[i], priority: e.target.value as any }; update('nextSprintCandidates', arr); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option><option value="">—</option>
                </select>
              </div>
            </div>
            {renderInput('Description', c.description, (v) => { const arr = [...state.nextSprintCandidates]; arr[i] = { ...arr[i], description: v }; update('nextSprintCandidates', arr); })}
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-exclamation-triangle text-orange-500 mr-2" />Risques</h3>
        {renderListEditor('', state.risks, 'risks')}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="far fa-calendar-check text-green-500 mr-2" />Dates Clés</h3>
        {state.keyDates.map((d, i) => (
          <div key={d.id} className="grid grid-cols-3 gap-3 mb-2 items-end">
            {renderInput('Date', d.date, (v) => { const arr = [...state.keyDates]; arr[i] = { ...arr[i], date: v }; update('keyDates', arr); })}
            {renderInput('Titre', d.title, (v) => { const arr = [...state.keyDates]; arr[i] = { ...arr[i], title: v }; update('keyDates', arr); })}
            <button onClick={() => update('keyDates', state.keyDates.filter((_, idx) => idx !== i))} className="text-red-400 text-sm mb-4"><i className="fas fa-times" /></button>
          </div>
        ))}
        <button onClick={() => update('keyDates', [...state.keyDates, { id: Date.now().toString(), date: '', title: '', color: 'bg-gray-300' }])} className="text-xs text-blue-600"><i className="fas fa-plus mr-1" />Ajouter</button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800"><i className="fas fa-gavel text-purple-500 mr-2" />Décisions Requises</h3>
          <button onClick={() => update('decisions', [...state.decisions, { id: Date.now().toString(), title: '', description: '', icon: 'fa-question-circle' }])} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"><i className="fas fa-plus mr-1" />Ajouter</button>
        </div>
        {state.decisions.map((d, i) => (
          <div key={d.id} className="grid grid-cols-3 gap-3 mb-2 items-end border border-gray-100 rounded p-2">
            {renderInput('Titre', d.title, (v) => { const arr = [...state.decisions]; arr[i] = { ...arr[i], title: v }; update('decisions', arr); })}
            {renderInput('Description', d.description, (v) => { const arr = [...state.decisions]; arr[i] = { ...arr[i], description: v }; update('decisions', arr); })}
            <button onClick={() => update('decisions', state.decisions.filter((_, idx) => idx !== i))} className="text-red-400 text-sm mb-4"><i className="fas fa-trash" /></button>
          </div>
        ))}
      </div>
    </div>
  );

  // ── PRÉSENTATION ──
  const renderPresentation = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4"><i className="fas fa-sliders-h text-indigo-500 mr-2" />Paramètres de Présentation</h3>
      <label className="block text-sm font-medium text-gray-700 mb-2"><i className="fas fa-clock text-blue-400 mr-2" />Durée d'affichage de l'ordre du jour (ms)</label>
      <div className="flex items-center gap-4">
        <input type="range" min={400} max={3000} step={100} value={state.transitionDuration} onChange={(e) => dispatch({ type: 'SET_TRANSITION_DURATION', payload: Number(e.target.value) })} className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 min-w-[90px] text-center">
          <span className="text-sm font-bold text-blue-700">{state.transitionDuration} ms</span>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Rapide (400ms)</span><span>Normal (1200ms)</span><span>Lent (3000ms)</span></div>
    </div>
  );

  // ── Bouton Save large pour le bas de section ──
  const SectionSaveButton: React.FC<{ label: string; stateKey: string; onSave: () => Promise<void>; icon?: string }> = ({ label, stateKey, onSave, icon = 'fa-cloud-upload-alt' }) => {
    const s = saveStates[stateKey];
    const isSaving = s?.status === 'saving';
    const isSuccess = s?.status === 'success';
    const isError = s?.status === 'error';
    return (
      <div className="mt-8 flex justify-end">
        <button
          onClick={onSave}
          disabled={isSaving}
          className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center gap-2 ${
            isSuccess ? 'bg-green-600 text-white shadow-green-200' :
            isError ? 'bg-red-600 text-white shadow-red-200' :
            isSaving ? 'bg-yellow-500 text-white animate-pulse shadow-yellow-200' :
            'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl shadow-blue-200'
          }`}
          title={isError ? s?.error : isSuccess ? 'Sauvegardé avec succès !' : `Sauvegarder ${label} dans MongoDB`}
        >
          <i className={`fas ${isSuccess ? 'fa-check-circle' : isError ? 'fa-exclamation-circle' : isSaving ? 'fa-spinner fa-spin' : icon}`} />
          {isSaving ? 'Sauvegarde en cours...' : isSuccess ? `${label} sauvegardé ✓` : isError ? 'Erreur — Réessayer' : `Sauvegarder ${label}`}
        </button>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sprints': return renderSprints();
      case 'general': return <>{renderGeneral()}<SectionSaveButton label="Sprint" stateKey="sprint" onSave={saveSprint} icon="fa-save" /></>;
      case 'objectifs': return <>{renderObjectifs()}<SectionSaveButton label="Objectifs" stateKey="objectives" onSave={saveObjectives} icon="fa-bullseye" /></>;
      case 'backlog': return <>{renderBacklog()}<SectionSaveButton label="Backlog" stateKey="backlog" onSave={saveBacklog} icon="fa-list-check" /></>;
      case 'realisations': return <>{renderRealisations()}<SectionSaveButton label="Réalisations" stateKey="realizations" onSave={saveRealizations} icon="fa-gift" /></>;
      case 'demo': return <>{renderDemo()}<SectionSaveButton label="Démo" stateKey="demoConfig" onSave={saveDemoConfig} icon="fa-desktop" /></>;
      case 'metriques': return <>{renderMetriques()}<SectionSaveButton label="Métriques" stateKey="metrics" onSave={saveMetrics} icon="fa-chart-line" /></>;
      case 'evolution': return <>{renderEvolution()}<SectionSaveButton label="Évolution Backlog" stateKey="backlogEvolution" onSave={saveBacklogEvolution} icon="fa-stream" /></>;
      case 'nextsteps': return <>{renderNextSteps()}<SectionSaveButton label="Prochaines Étapes" stateKey="nextSteps" onSave={saveNextSteps} icon="fa-step-forward" /></>;
      case 'presentation': return <>{renderPresentation()}<SectionSaveButton label="Présentation" stateKey="styles" onSave={async () => { await saveStyles(); await savePages(); }} icon="fa-sliders-h" /></>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white"><i className="fas fa-cog text-xl" /></div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Administration Sprint Review</h1>
            <p className="text-xs text-gray-500">Sprint actif : <span className="font-bold text-blue-600">Sprint {state.sprint.number} — {state.sprint.name}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* API Sync Buttons */}
          <button
            onClick={loadFromApi}
            disabled={apiLoading}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              apiLoading
                ? 'bg-yellow-100 text-yellow-700 animate-pulse'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
            title="Charger les données depuis MongoDB"
          >
            <i className={`fas ${apiLoading ? 'fa-spinner fa-spin' : 'fa-cloud-download-alt'} mr-1`} />
            {apiLoading ? 'Chargement...' : 'Charger API'}
          </button>

          {(() => {
            const tabSave = getSaveFunctionForTab();
            return tabSave ? (
              <SaveButton label={tabSave.label} stateKey={tabSave.key} onSave={tabSave.fn} />
            ) : null;
          })()}

          <button
            onClick={saveAll}
            className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-200 transition-all"
            title="Sauvegarder toutes les données dans MongoDB"
          >
            <i className="fas fa-save mr-1" />Tout sauvegarder
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Quick Sprint Switcher */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 font-medium">Sprint :</label>
            <select
              value={multiSprintState.activeSprintId}
              onChange={(e) => dispatch({ type: 'SWITCH_SPRINT', payload: { sprintId: e.target.value } })}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            >
              {multiSprintState.sprints.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  Sprint {entry.data.sprint.number} — {entry.data.sprint.name}
                </option>
              ))}
            </select>
          </div>
          <Link to="/presentation" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700"><i className="fas fa-play mr-2" />Présentation</Link>
        </div>
      </div>
      <div className="flex">
        <div className="w-56 bg-white border-r border-gray-200 min-h-screen p-4 sticky top-16">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
                <i className={`fas ${tab.icon} w-4 text-center`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1 p-8 max-w-5xl">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;