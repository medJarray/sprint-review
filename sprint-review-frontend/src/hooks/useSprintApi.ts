/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║   useSprintApi — Hook de synchronisation Front ↔ Back   ║
 * ║   Chaque catégorie se sauvegarde indépendamment         ║
 * ╚══════════════════════════════════════════════════════════╝
 */

import { useState, useCallback } from 'react';
import { useSprint } from '../context/SprintContext';
import {
  sprintApi,
  objectivesApi,
  backlogApi,
  realizationsApi,
  demoConfigApi,
  metricsApi,
  backlogEvolutionApi,
  nextStepsApi,
  stylesApi,
  pagesApi,
  loadFullSprint,
} from '../services/api';
import {
  apiToSprintState,
  sprintStateToSprintPayload,
  sprintStateToObjectivesPayload,
  sprintStateToBacklogPayload,
  sprintStateToRealizationsPayload,
  sprintStateToDemoConfigPayload,
  sprintStateToMetricsPayload,
  sprintStateToBacklogEvolutionPayload,
  sprintStateToNextStepsPayload,
  sprintStateToStylesPayload,
  sprintStateToPagesPayload,
} from '../services/mappers';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

interface SaveState {
  status: SaveStatus;
  error?: string;
  lastSaved?: Date;
}

export function useSprintApi(sprintId: string = 'sprint-default') {
  const { state, dispatch } = useSprint();
  const [loading, setLoading] = useState(false);
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});

  // ── Helper pour mettre à jour le status de sauvegarde ──
  const setSaveStatus = useCallback((key: string, status: SaveStatus, error?: string) => {
    setSaveStates((prev) => ({
      ...prev,
      [key]: {
        status,
        error,
        lastSaved: status === 'success' ? new Date() : prev[key]?.lastSaved,
      },
    }));
    // Reset status to idle after 3 seconds
    if (status === 'success' || status === 'error') {
      setTimeout(() => {
        setSaveStates((prev) => ({
          ...prev,
          [key]: { ...prev[key], status: 'idle' },
        }));
      }, 3000);
    }
  }, []);

  // ═══════════════════════════════════════════════════════════
  // CHARGEMENT DEPUIS L'API
  // ═══════════════════════════════════════════════════════════

  const loadFromApi = useCallback(async () => {
    setLoading(true);
    try {
      const data = await loadFullSprint(sprintId);
      const newState = apiToSprintState(data, state);
      dispatch({ type: 'LOAD_API_STATE', payload: newState });
      console.log('✅ Données chargées depuis l\'API');
    } catch (err: any) {
      console.error('❌ Erreur chargement API:', err.message);
    } finally {
      setLoading(false);
    }
  }, [sprintId, state, dispatch]);

  // ═══════════════════════════════════════════════════════════
  // SAUVEGARDES INDÉPENDANTES (1 par catégorie)
  // ═══════════════════════════════════════════════════════════

  const saveSprint = useCallback(async () => {
    setSaveStatus('sprint', 'saving');
    try {
      const payload = sprintStateToSprintPayload(state, sprintId);
      await sprintApi.update(sprintId, payload);
      setSaveStatus('sprint', 'success');
    } catch (err: any) {
      setSaveStatus('sprint', 'error', err.message);
    }
  }, [state, sprintId, setSaveStatus]);

  const saveObjectives = useCallback(async () => {
    setSaveStatus('objectives', 'saving');
    try {
      await objectivesApi.upsert(sprintId, sprintStateToObjectivesPayload(state));
      setSaveStatus('objectives', 'success');
    } catch (err: any) {
      setSaveStatus('objectives', 'error', err.message);
    }
  }, [state, sprintId, setSaveStatus]);

  const saveBacklog = useCallback(async () => {
    setSaveStatus('backlog', 'saving');
    try {
      await backlogApi.upsert(sprintId, sprintStateToBacklogPayload(state));
      setSaveStatus('backlog', 'success');
    } catch (err: any) {
      setSaveStatus('backlog', 'error', err.message);
    }
  }, [state, sprintId, setSaveStatus]);

  const saveRealizations = useCallback(async () => {
    setSaveStatus('realizations', 'saving');
    try {
      await realizationsApi.upsert(sprintId, sprintStateToRealizationsPayload(state));
      setSaveStatus('realizations', 'success');
    } catch (err: any) {
      setSaveStatus('realizations', 'error', err.message);
    }
  }, [state, sprintId, setSaveStatus]);

  const saveDemoConfig = useCallback(async () => {
    setSaveStatus('demoConfig', 'saving');
    try {
      await demoConfigApi.upsert(sprintId, sprintStateToDemoConfigPayload(state));
      setSaveStatus('demoConfig', 'success');
    } catch (err: any) {
      setSaveStatus('demoConfig', 'error', err.message);
    }
  }, [state, sprintId, setSaveStatus]);

  const saveMetrics = useCallback(async () => {
    setSaveStatus('metrics', 'saving');
    try {
      await metricsApi.upsert(sprintId, sprintStateToMetricsPayload(state));
      setSaveStatus('metrics', 'success');
    } catch (err: any) {
      setSaveStatus('metrics', 'error', err.message);
    }
  }, [state, sprintId, setSaveStatus]);

  const saveBacklogEvolution = useCallback(async () => {
    setSaveStatus('backlogEvolution', 'saving');
    try {
      await backlogEvolutionApi.upsert(sprintId, sprintStateToBacklogEvolutionPayload(state));
      setSaveStatus('backlogEvolution', 'success');
    } catch (err: any) {
      setSaveStatus('backlogEvolution', 'error', err.message);
    }
  }, [state, sprintId, setSaveStatus]);

  const saveNextSteps = useCallback(async () => {
    setSaveStatus('nextSteps', 'saving');
    try {
      await nextStepsApi.upsert(sprintId, sprintStateToNextStepsPayload(state));
      setSaveStatus('nextSteps', 'success');
    } catch (err: any) {
      setSaveStatus('nextSteps', 'error', err.message);
    }
  }, [state, sprintId, setSaveStatus]);

  const saveStyles = useCallback(async () => {
    setSaveStatus('styles', 'saving');
    try {
      await stylesApi.upsert(sprintId, sprintStateToStylesPayload(state));
      setSaveStatus('styles', 'success');
    } catch (err: any) {
      setSaveStatus('styles', 'error', err.message);
    }
  }, [state, sprintId, setSaveStatus]);

  const savePages = useCallback(async () => {
    setSaveStatus('pages', 'saving');
    try {
      await pagesApi.batchReplace(sprintId, sprintStateToPagesPayload(state));
      setSaveStatus('pages', 'success');
    } catch (err: any) {
      setSaveStatus('pages', 'error', err.message);
    }
  }, [state, sprintId, setSaveStatus]);

  // ── Sauvegarder tout d'un coup ──
  const saveAll = useCallback(async () => {
    await Promise.all([
      saveSprint(),
      saveObjectives(),
      saveBacklog(),
      saveRealizations(),
      saveDemoConfig(),
      saveMetrics(),
      saveBacklogEvolution(),
      saveNextSteps(),
      saveStyles(),
      savePages(),
    ]);
  }, [saveSprint, saveObjectives, saveBacklog, saveRealizations, saveDemoConfig, saveMetrics, saveBacklogEvolution, saveNextSteps, saveStyles, savePages]);

  return {
    // Chargement
    loading,
    loadFromApi,

    // Sauvegardes individuelles
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

    // États de sauvegarde
    saveStates,
  };
}
