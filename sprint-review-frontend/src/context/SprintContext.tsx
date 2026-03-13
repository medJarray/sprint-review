import React, { createContext, useContext, useReducer, useEffect, useCallback, useState, useRef, type ReactNode } from 'react';
import { loadFullSprint } from '../services/api';
import { apiToSprintState } from '../services/mappers';

// ─── Types ───

export interface SprintInfo {
  name: string;
  number: number;
  goal: string;
  startDate: string;
  endDate: string;
}

export interface Team {
  id: string;
  name: string;
}

export interface Character {
  name: string;
  description: string;
}

export interface Metrics {
  plannedPoints: number;
  completedPoints: number;
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  priority: string;
  scope: string;
  epicLink?: string;
  borderColor: string;
}

export interface SuccessCriteria {
  id: string;
  text: string;
}

export interface Constraint {
  id: string;
  text: string;
}

export interface DodItem {
  id: string;
  text: string;
}

export interface UserStoryDetail {
  id: string;
  storyId: string;
  title: string;
  points: number;
  asA: string;
  iWant: string;
  soThat: string;
  ac?: string;
}

export interface Enabler {
  id: string;
  epicId: string;
  name: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
  stories: UserStoryDetail[];
}

export interface TechTask {
  id: string;
  taskId: string;
  title: string;
  points: number;
  type: 'tech' | 'bug';
}

export interface FeatureCard {
  id: string;
  storyId: string;
  title: string;
  description: string;
  status: 'deployed' | 'validated' | 'done' | 'fixed' | 'testing' | 'blocked';
  impact?: string;
  prLink?: string;
  assignees: string[];
}

export interface SmallCard {
  id: string;
  type: string;
  title: string;
  description: string;
  status: 'deployed' | 'validated' | 'done' | 'fixed' | 'testing' | 'blocked';
}

export interface DeferredItem {
  id: string;
  storyId: string;
  title: string;
  reason: string;
}

export interface DemoStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  note?: string;
  featureRef?: string;
  isActive: boolean;
}

export interface DemoConfig {
  environment: string;
  testAccount: string;
  version: string;
  steps: DemoStep[];
  demoOwner: string;
  demoOwnerInitials: string;
  videoLink?: string;
  figmaLink?: string;
}

export interface KpiCard {
  id: string;
  label: string;
  value: string;
  unit: string;
  badgeText: string;
  badgeType: 'up' | 'down' | 'stable' | 'check' | 'smile';
  subText: string;
  borderColor: string;
}

export interface InsightItem {
  id: string;
  text: string;
}

export interface QualityGate {
  unitTests: number;
  sonarGrade: string;
  e2eTests: number;
}

export interface BacklogHealthData {
  totalItems: number;
  readyPercent: number;
  avgAge: string;
  distribution: { label: string; count: number; pct: number; color: string }[];
}

export interface EpicProgress {
  id: string;
  epicId: string;
  name: string;
  description: string;
  pct: number;
  done: number;
  total: number;
  targetSprint: number;
  bgColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  barColor: string;
  targetColor: string;
  pctColor: string;
}

export interface BacklogChange {
  added: number;
  removed: number;
  reprioritized: number;
  reasons: string[];
}

export interface MatrixItem {
  id: string;
  storyId: string;
  title: string;
  points: number;
}

export interface PrioritizationMatrix {
  quickWins: MatrixItem[];
  majorProjects: MatrixItem[];
  fillIns: MatrixItem[];
  timeSinks: MatrixItem[];
  insights: string[];
}

export interface NextSprintCandidate {
  id: string;
  storyId: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low' | '';
  points: number;
  type: string;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Risk {
  id: string;
  text: string;
}

export interface KeyDate {
  id: string;
  date: string;
  title: string;
  color: string;
}

export interface ValueMetric {
  id: string;
  label: string;
  value: string;
  subText?: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  icon: string;
}

export interface SprintPage {
  id: string;
  title: string;
  slug: string;
  order: number;
  visible: boolean;
}

export interface GlobalStyles {
  fontFamily: string;
  headingFontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  borderRadius: number;
}

export interface SprintState {
  sprint: SprintInfo;
  teams: Team[];
  character: Character;
  metrics: Metrics;
  userStories: { id: string; title: string; points: number; status: string }[];
  transitionDuration: number;

  // Layout
  pages: SprintPage[];
  styles: GlobalStyles;

  // Slide: Objectifs
  objectives: Objective[];
  successCriteria: SuccessCriteria[];
  constraints: Constraint[];
  dodItems: DodItem[];

  // Slide: Backlog
  enablers: Enabler[];
  techTasks: TechTask[];

  // Slide: Réalisations & Incréments
  featureCards: FeatureCard[];
  smallCards: SmallCard[];
  deferredItems: DeferredItem[];
  teamNote: string;
  valueMetrics: ValueMetric[];

  // Slide: Demo
  demoConfig: DemoConfig;

  // Slide: Métriques
  kpiCards: KpiCard[];
  burndownIdeal: number[];
  burndownReal: number[];
  velocityHistory: { label: string; value: number }[];
  insightsGood: InsightItem[];
  insightsBad: InsightItem[];
  qualityGate: QualityGate;

  // Slide: Evolution Backlog
  backlogHealth: BacklogHealthData;
  epicsProgress: EpicProgress[];
  backlogChanges: BacklogChange;
  prioritizationMatrix: PrioritizationMatrix;

  // Slide: Prochaines Étapes
  nextSprintCandidates: NextSprintCandidate[];
  decisions: Decision[];
  risks: Risk[];
  keyDates: KeyDate[];
  nextSprintDate: string;
}

const defaultPages: SprintPage[] = [
  { id: 'home', title: 'Accueil', slug: '', order: 0, visible: true },
  { id: 'review', title: 'Sprint Review', slug: 'review', order: 1, visible: true },
  { id: 'presentation', title: 'Présentation', slug: 'presentation', order: 2, visible: true },
];

const defaultStyles: GlobalStyles = {
  fontFamily: 'DM Sans, sans-serif',
  headingFontFamily: 'DM Sans, sans-serif',
  primaryColor: '#0F52BA',
  secondaryColor: '#6366F1',
  accentColor: '#00C48C',
  backgroundColor: '#F9FAFB',
  textColor: '#1F2937',
  fontSize: 14,
  borderRadius: 8,
};

const initialState: SprintState = {
  sprint: { name: 'Projet Alpha', number: 24, goal: 'Refonte UX Mobile', startDate: '2026-01-12', endDate: '2026-01-23' },
  teams: [],
  character: { name: '', description: '' },
  metrics: { plannedPoints: 42, completedPoints: 41 },
  userStories: [],
  transitionDuration: 1800,
  pages: defaultPages,
  styles: defaultStyles,

  objectives: [
    { id: '1', title: 'Finaliser l\'Épique "Paiement One-Click"', description: 'Implémenter le flux complet de paiement simplifié pour les utilisateurs connectés afin d\'augmenter le taux de conversion mobile de 15%.', priority: 'Priorité Haute', scope: 'Checkout & Paiement', epicLink: 'EPIC-42', borderColor: 'border-blue-600' },
    { id: '2', title: 'Optimisation des Performances', description: 'Réduire le temps de chargement de la page d\'accueil mobile de 20% (cible < 1.5s) via la compression des assets et le lazy-loading.', priority: 'Priorité Moyenne', scope: 'Core Performance', borderColor: 'border-indigo-500' },
    { id: '3', title: 'Analytics V2 & Tracking', description: 'Mettre à jour le plan de marquage pour capturer les abandons de panier avec la nouvelle granularité requise par la BI.', priority: 'Tech Enabler', scope: 'Data Analytics', borderColor: 'border-teal-500' },
  ],
  successCriteria: [
    { id: '1', text: 'Taux de conversion > 2.5% sur mobile' },
    { id: '2', text: 'Zéro régression critique (P0) sur le checkout' },
    { id: '3', text: 'Score Lighthouse Performance > 90' },
  ],
  constraints: [
    { id: '1', text: 'Dépendance API Paiement (livraison J+2)' },
    { id: '2', text: 'Code Freeze DB : Pas de migration schéma' },
  ],
  dodItems: [
    { id: '1', text: 'Code Review' },
    { id: '2', text: 'Unit Tests > 80%' },
    { id: '3', text: 'Doc Technique' },
    { id: '4', text: 'Déployé en Staging' },
  ],

  enablers: [
    {
      id: '1', epicId: 'EPIC-42', name: 'Checkout & Paiement', bgColor: 'bg-blue-50', textColor: 'text-blue-800', iconColor: 'text-blue-500',
      stories: [{ id: '1', storyId: 'US-101', title: 'Paiement One-Click Mobile', points: 8, asA: 'client mobile connecté', iWant: 'payer ma commande en un seul clic', soThat: 'gagner du temps lors de mes achats récurrents', ac: 'Bouton visible uniquement si CB enregistrée • Confirmation biométrique • Redirection page succès < 2s.' }],
    },
    {
      id: '2', epicId: 'EPIC-38', name: 'Core Performance', bgColor: 'bg-indigo-50', textColor: 'text-indigo-800', iconColor: 'text-indigo-500',
      stories: [{ id: '2', storyId: 'US-102', title: 'Optimisation Assets Home', points: 5, asA: 'visiteur mobile', iWant: "que la page d'accueil s'affiche instantanément", soThat: 'ne pas être frustré par le temps de chargement', ac: 'Images converties en WebP • Lazy loading activé • Time to Interactive < 1.5s.' }],
    },
    {
      id: '3', epicId: 'EPIC-55', name: 'Data Analytics', bgColor: 'bg-teal-50', textColor: 'text-teal-800', iconColor: 'text-teal-500',
      stories: [{ id: '3', storyId: 'US-103', title: 'Tracking Abandons Panier', points: 3, asA: 'Product Owner', iWant: "des données précises sur l'étape d'abandon", soThat: 'comprendre les points de friction' }],
    },
  ],
  techTasks: [
    { id: '1', taskId: 'TECH-45', title: 'Upgrade React Native 0.72', points: 3, type: 'tech' },
    { id: '2', taskId: 'BUG-89', title: 'Fix Login Spinner iOS', points: 2, type: 'bug' },
  ],

  featureCards: [
    { id: '1', storyId: 'US-101', title: 'Paiement One-Click Mobile', description: 'Implémentation complète du flux de paiement simplifié pour les utilisateurs connectés. Intégration biométrique (FaceID/TouchID) pour validation rapide.', status: 'deployed', impact: 'Impact : Checkout -30s', prLink: 'PR #452 Merged', assignees: ['LD', 'SM'] },
    { id: '2', storyId: 'US-102', title: 'Optimisation Assets Home', description: 'Migration de tous les assets image vers WebP et mise en place du lazy-loading natif. Réduction drastique du poids de la page d\'accueil.', status: 'validated', impact: 'TTI < 1.5s', prLink: 'Doc Tech Mise à jour', assignees: ['TR'] },
    { id: '3', storyId: 'TECH-45', title: 'Upgrade React Native 0.72', description: 'Mise à jour du framework avec migration des APIs dépréciées. Tests de non-régression en cours sur les fonctionnalités critiques.', status: 'testing', impact: '80% des tests passés', prLink: 'PR #467 Open', assignees: ['AM'] },
  ],
  smallCards: [
    { id: '1', type: 'Tech Debt', title: 'Refactor API Client', description: 'Standardisation des retours d\'erreur', status: 'done' },
    { id: '2', type: 'Fix Bug', title: 'Login Spinner iOS', description: 'Correction boucle infinie iPhone 14', status: 'fixed' },
    { id: '3', type: 'Fix Bug', title: 'Crash WebView Android', description: 'Reproductible sur Android 12. Attente fix upstream.', status: 'blocked' },
    { id: '4', type: 'Amélioration', title: 'Cache API Produits', description: 'Réduction des appels réseau de 40%', status: 'testing' },
  ],
  deferredItems: [
    { id: '1', storyId: 'US-103', title: 'Tracking Abandons Panier', reason: 'Dépendance data non livrée.' },
  ],
  teamNote: 'La mise en place de WebP a nécessité plus de tests QA que prévu sur Safari iOS.',
  valueMetrics: [
    { id: '1', label: 'Conv. Mobile', value: '+12%', subText: '(Proj.)', bgColor: 'bg-green-50', borderColor: 'border-green-100', iconColor: 'text-green-600', icon: 'fa-shopping-cart' },
    { id: '2', label: 'Lighthouse', value: '92', subText: '/ 100', bgColor: 'bg-blue-50', borderColor: 'border-blue-100', iconColor: 'text-blue-600', icon: 'fa-tachometer-alt' },
  ],

  demoConfig: {
    environment: 'Staging (QA)',
    testAccount: 'demo_user_01',
    version: 'v2.4.0-rc.1',
    demoOwner: 'Sarah Martin',
    demoOwnerInitials: 'SM',
    videoLink: 'Voir l\'enregistrement complet (.mp4)',
    figmaLink: 'Maquettes Figma',
    steps: [
      { id: '1', stepNumber: 1, title: 'Contexte & Entrée', description: 'L\'utilisateur se connecte sur l\'app mobile. Le panier contient déjà 2 articles.', note: 'Données: Panier ID #9822', isActive: true },
      { id: '2', stepNumber: 2, title: 'Action: Checkout One-Click', description: 'Clic sur "Payer maintenant". Le système détecte la carte enregistrée et demande la biométrie.', featureRef: 'Feature US-101', isActive: true },
      { id: '3', stepNumber: 3, title: 'Résultat Attendu', description: 'Validation immédiate sans saisie CVV. Redirection vers la page de confirmation en moins de 2s.', isActive: false },
      { id: '4', stepNumber: 4, title: 'Cas Limites (Optionnel)', description: 'Simulation erreur réseau (Mode Avion) lors du paiement pour vérifier le message d\'erreur.', isActive: false },
    ],
  },

  kpiCards: [
    { id: '1', label: 'Vélocité', value: '41', unit: '/ 42 pts', badgeText: '98%', badgeType: 'up', subText: 'Réalisé', borderColor: 'border-blue-500' },
    { id: '2', label: 'Cycle Time Moyen', value: '2.4', unit: 'jours', badgeText: 'Stable', badgeType: 'stable', subText: 'Cible < 3j', borderColor: 'border-indigo-500' },
    { id: '3', label: 'Qualité (Bugs)', value: '2', unit: 'trouvés', badgeText: '100% Fix', badgeType: 'check', subText: '0 Bloquant', borderColor: 'border-green-500' },
    { id: '4', label: 'Team Happiness', value: '4.5', unit: '/ 5', badgeText: 'Top', badgeType: 'smile', subText: 'NPS Équipe', borderColor: 'border-purple-500' },
  ],
  burndownIdeal: [42, 37.8, 33.6, 29.4, 25.2, 21, 16.8, 12.6, 8.4, 0],
  burndownReal: [42, 42, 38, 35, 32, 22, 18, 18, 10, 1],
  velocityHistory: [
    { label: 'S20', value: 35 },
    { label: 'S21', value: 38 },
    { label: 'S22', value: 36 },
    { label: 'S23', value: 40 },
    { label: 'S24', value: 41 },
  ],
  insightsGood: [
    { id: '1', text: 'Collaboration dev/QA fluide sur les tickets critiques.' },
    { id: '2', text: 'Estimation précise des User Stories complexes (US-101).' },
    { id: '3', text: 'Absence de changement de scope en cours de sprint.' },
  ],
  insightsBad: [
    { id: '1', text: 'Le temps de Code Review a légèrement augmenté (+15%).' },
    { id: '2', text: 'L\'environnement de staging a été instable le jour 4.' },
    { id: '3', text: 'Dette technique : couverture de tests JS à renforcer.' },
  ],
  qualityGate: { unitTests: 88, sonarGrade: 'A', e2eTests: 100 },

  backlogHealth: {
    totalItems: 127, readyPercent: 68, avgAge: '12j',
    distribution: [
      { label: 'To Do', count: 45, pct: 35, color: 'bg-blue-500' },
      { label: 'In Refinement', count: 38, pct: 30, color: 'bg-yellow-500' },
      { label: 'Ready', count: 44, pct: 35, color: 'bg-green-500' },
    ],
  },
  epicsProgress: [
    { id: '1', epicId: 'EPIC-42', name: 'Paiement One-Click', description: 'Simplification du parcours de paiement mobile', pct: 75, done: 12, total: 16, targetSprint: 25, bgColor: 'bg-purple-50', borderColor: 'border-purple-100', badgeBg: 'bg-purple-200', badgeText: 'text-purple-900', barColor: 'bg-purple-600', targetColor: 'text-purple-700', pctColor: 'text-purple-900' },
    { id: '2', epicId: 'EPIC-38', name: 'Performance Mobile', description: 'Optimisation vitesse de chargement & UX', pct: 45, done: 5, total: 11, targetSprint: 26, bgColor: 'bg-blue-50', borderColor: 'border-blue-100', badgeBg: 'bg-blue-200', badgeText: 'text-blue-900', barColor: 'bg-blue-600', targetColor: 'text-blue-700', pctColor: 'text-blue-900' },
    { id: '3', epicId: 'EPIC-51', name: 'Analytics V2', description: 'Nouveau plan de marquage & dashboards', pct: 20, done: 2, total: 10, targetSprint: 27, bgColor: 'bg-teal-50', borderColor: 'border-teal-100', badgeBg: 'bg-teal-200', badgeText: 'text-teal-900', barColor: 'bg-teal-600', targetColor: 'text-teal-700', pctColor: 'text-teal-900' },
  ],
  backlogChanges: {
    added: 14, removed: 8, reprioritized: 5,
    reasons: ['Nouveaux besoins business identifiés (8 items)', 'Items obsolètes supprimés (5 items)', 'Ajustement priorités business (5 items)'],
  },
  prioritizationMatrix: {
    quickWins: [
      { id: '1', storyId: 'US-145', title: 'Filtres recherche avancée', points: 3 },
      { id: '2', storyId: 'US-156', title: 'Export historique CSV', points: 2 },
    ],
    majorProjects: [{ id: '3', storyId: 'US-167', title: 'Recommandations IA', points: 13 }],
    fillIns: [{ id: '4', storyId: 'BUG-92', title: 'Fix tooltip IE11', points: 1 }],
    timeSinks: [{ id: '5', storyId: 'TECH-78', title: 'Migration DB legacy', points: 8 }],
    insights: [
      'Focus sur Quick Wins pour sprint #25 (ROI rapide)',
      'US-167 (IA) nécessite décomposition avant planning',
      'Migration DB reportée à Q2 (faible priorité business)',
    ],
  },

  nextSprintCandidates: [
    { id: '1', storyId: 'US-104', title: 'Intégration Apple Pay', description: 'Permettre le paiement natif iOS sans redirection', priority: 'high', points: 8, type: 'us' },
    { id: '2', storyId: 'US-105', title: 'Dashboard Analytics V2', description: 'Ajout des métriques de rétention par cohorte', priority: 'medium', points: 5, type: 'us' },
    { id: '3', storyId: 'SPIKE', title: 'Étude Migration Cloud', description: 'POC sur AWS Lambda pour le traitement image', priority: '', points: 3, type: 'spike' },
    { id: '4', storyId: 'US-108', title: 'Mode Sombre (Dark Mode)', description: 'Adaptation de la charte graphique mobile', priority: 'low', points: 5, type: 'us' },
  ],
  decisions: [
    { id: '1', title: 'Validation Design System', description: 'Besoin du GO de l\'équipe UX pour les nouveaux composants "Cards".', icon: 'fa-question-circle' },
    { id: '2', title: 'Licence API Maps', description: 'Validation budget pour passer au tier pro Google Maps.', icon: 'fa-file-contract' },
  ],
  risks: [
    { id: '1', text: 'Congés équipe : Lead Dev absent 3 jours semaine prochaine.' },
    { id: '2', text: 'Env. Staging : Maintenance prévue par DevOps mardi matin.' },
  ],
  keyDates: [
    { id: '1', date: "Aujourd'hui, 16h00", title: 'Clôture Sprint & Retro', color: 'bg-green-500' },
    { id: '2', date: 'Demain, 10h00', title: 'Planning Sprint #25', color: 'bg-blue-500' },
    { id: '3', date: '30 Janvier', title: 'Release v2.5.0 (Prod)', color: 'bg-gray-300' },
  ],
  nextSprintDate: '26 Janvier',
};

// ─── Multi-Sprint Store ───

export interface SprintDataEntry {
  id: string;
  data: SprintState;
}

export interface MultiSprintState {
  sprints: SprintDataEntry[];
  activeSprintId: string;
}

const DEFAULT_SPRINT_ID = 'sprint-default';

function createDefaultMultiSprintState(): MultiSprintState {
  return {
    sprints: [{ id: DEFAULT_SPRINT_ID, data: initialState }],
    activeSprintId: DEFAULT_SPRINT_ID,
  };
}

const emptyDemoConfig: DemoConfig = {
  environment: '',
  testAccount: '',
  version: '',
  demoOwner: '',
  demoOwnerInitials: '',
  steps: [],
};

const emptyQualityGate: QualityGate = { unitTests: 0, sonarGrade: '', e2eTests: 0 };

const emptyBacklogHealth: BacklogHealthData = { totalItems: 0, readyPercent: 0, avgAge: '', distribution: [] };

const emptyBacklogChanges: BacklogChange = { added: 0, removed: 0, reprioritized: 0, reasons: [] };

const emptyPrioritizationMatrix: PrioritizationMatrix = { quickWins: [], majorProjects: [], fillIns: [], timeSinks: [], insights: [] };

const emptyMetrics: Metrics = { plannedPoints: 0, completedPoints: 0 };

function ensureSprintDefaults(data: Partial<SprintState>): SprintState {
  return {
    sprint: data.sprint ? { ...initialState.sprint, ...data.sprint } : { ...initialState.sprint },
    teams: data.teams || [],
    character: data.character ? { ...initialState.character, ...data.character } : { name: '', description: '' },
    metrics: data.metrics ? { ...emptyMetrics, ...data.metrics } : emptyMetrics,
    userStories: data.userStories || [],
    transitionDuration: data.transitionDuration ?? 1800,
    pages: data.pages && data.pages.length > 0 ? data.pages : defaultPages,
    styles: data.styles ? { ...defaultStyles, ...data.styles } : defaultStyles,
    objectives: data.objectives || [],
    successCriteria: data.successCriteria || [],
    constraints: data.constraints || [],
    dodItems: data.dodItems || [],
    enablers: data.enablers || [],
    techTasks: data.techTasks || [],
    featureCards: data.featureCards || [],
    smallCards: data.smallCards || [],
    deferredItems: data.deferredItems || [],
    teamNote: data.teamNote ?? '',
    valueMetrics: data.valueMetrics || [],
    demoConfig: data.demoConfig ? { ...emptyDemoConfig, ...data.demoConfig, steps: data.demoConfig.steps || [] } : emptyDemoConfig,
    kpiCards: data.kpiCards || [],
    burndownIdeal: data.burndownIdeal || [],
    burndownReal: data.burndownReal || [],
    velocityHistory: data.velocityHistory || [],
    insightsGood: data.insightsGood || [],
    insightsBad: data.insightsBad || [],
    qualityGate: data.qualityGate ? { ...emptyQualityGate, ...data.qualityGate } : emptyQualityGate,
    backlogHealth: data.backlogHealth ? { ...emptyBacklogHealth, ...data.backlogHealth } : emptyBacklogHealth,
    epicsProgress: data.epicsProgress || [],
    backlogChanges: data.backlogChanges ? { ...emptyBacklogChanges, ...data.backlogChanges } : emptyBacklogChanges,
    prioritizationMatrix: data.prioritizationMatrix ? { ...emptyPrioritizationMatrix, ...data.prioritizationMatrix } : emptyPrioritizationMatrix,
    nextSprintCandidates: data.nextSprintCandidates || [],
    decisions: data.decisions || [],
    risks: data.risks || [],
    keyDates: data.keyDates || [],
    nextSprintDate: data.nextSprintDate ?? '',
  };
}

function loadFromLocalStorage(): MultiSprintState {
  try {
    const raw = localStorage.getItem('sprint-review-data');
    if (raw) {
      const parsed = JSON.parse(raw) as MultiSprintState;
      if (parsed.sprints && parsed.sprints.length > 0 && parsed.activeSprintId) {
        // Ensure every sprint entry has all required fields with defaults
        const safeSprints = parsed.sprints.map((entry) => ({
          ...entry,
          data: ensureSprintDefaults(entry.data || {}),
        }));
        // Ensure activeSprintId points to an existing sprint
        const activeExists = safeSprints.some((s) => s.id === parsed.activeSprintId);
        return {
          sprints: safeSprints,
          activeSprintId: activeExists ? parsed.activeSprintId : safeSprints[0].id,
        };
      }
    }
  } catch (e) {
    console.warn('Failed to load sprint data from localStorage', e);
  }
  return createDefaultMultiSprintState();
}

function saveToLocalStorage(state: MultiSprintState) {
  try {
    localStorage.setItem('sprint-review-data', JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save sprint data to localStorage', e);
  }
}

type SprintAction =
  | { type: 'SET_SPRINT'; payload: Partial<SprintInfo> }
  | { type: 'SET_TEAMS'; payload: Team[] }
  | { type: 'SET_CHARACTER'; payload: Partial<Character> }
  | { type: 'SET_METRICS'; payload: Partial<Metrics> }
  | { type: 'SET_USER_STORIES'; payload: any[] }
  | { type: 'SET_TRANSITION_DURATION'; payload: number }
  | { type: 'UPDATE_SLIDE_DATA'; payload: { key: string; value: any } }
  | { type: 'LOAD_API_STATE'; payload: SprintState }
  | { type: 'ADD_SPRINT'; payload: { name: string; number: number } }
  | { type: 'DUPLICATE_SPRINT'; payload: { sourceId: string } }
  | { type: 'SWITCH_SPRINT'; payload: { sprintId: string } }
  | { type: 'DELETE_SPRINT'; payload: { sprintId: string } };

function updateActiveSprint(multiState: MultiSprintState, updater: (s: SprintState) => SprintState): MultiSprintState {
  return {
    ...multiState,
    sprints: multiState.sprints.map((entry) =>
      entry.id === multiState.activeSprintId
        ? { ...entry, data: updater(entry.data) }
        : entry
    ),
  };
}

function multiSprintReducer(multiState: MultiSprintState, action: SprintAction): MultiSprintState {
  switch (action.type) {
    case 'SET_SPRINT':
      return updateActiveSprint(multiState, (s) => ({ ...s, sprint: { ...s.sprint, ...action.payload } }));
    case 'SET_TEAMS':
      return updateActiveSprint(multiState, (s) => ({ ...s, teams: action.payload }));
    case 'SET_CHARACTER':
      return updateActiveSprint(multiState, (s) => ({ ...s, character: { ...s.character, ...action.payload } }));
    case 'SET_METRICS':
      return updateActiveSprint(multiState, (s) => ({ ...s, metrics: { ...s.metrics, ...action.payload } }));
    case 'SET_USER_STORIES':
      return updateActiveSprint(multiState, (s) => ({ ...s, userStories: action.payload }));
    case 'SET_TRANSITION_DURATION':
      return updateActiveSprint(multiState, (s) => ({ ...s, transitionDuration: action.payload }));
    case 'UPDATE_SLIDE_DATA':
      return updateActiveSprint(multiState, (s) => ({ ...s, [action.payload.key]: action.payload.value }));

    case 'LOAD_API_STATE':
      return updateActiveSprint(multiState, () => ensureSprintDefaults(action.payload));

    case 'ADD_SPRINT': {
      const newId = `sprint-${Date.now()}`;
      const newSprintData: SprintState = ensureSprintDefaults({
        sprint: {
          name: action.payload.name,
          number: action.payload.number,
          goal: '',
          startDate: '',
          endDate: '',
        },
      });
      return {
        sprints: [...multiState.sprints, { id: newId, data: newSprintData }],
        activeSprintId: newId,
      };
    }

    case 'DUPLICATE_SPRINT': {
      const source = multiState.sprints.find((s) => s.id === action.payload.sourceId);
      if (!source) return multiState;
      const newId = `sprint-${Date.now()}`;
      const duplicated: SprintState = {
        ...JSON.parse(JSON.stringify(source.data)),
        sprint: {
          ...source.data.sprint,
          name: `${source.data.sprint.name} (copie)`,
          number: source.data.sprint.number + 1,
        },
      };
      return {
        sprints: [...multiState.sprints, { id: newId, data: duplicated }],
        activeSprintId: newId,
      };
    }

    case 'SWITCH_SPRINT': {
      const exists = multiState.sprints.some((s) => s.id === action.payload.sprintId);
      if (!exists) return multiState;
      return { ...multiState, activeSprintId: action.payload.sprintId };
    }

    case 'DELETE_SPRINT': {
      if (multiState.sprints.length <= 1) return multiState;
      const remaining = multiState.sprints.filter((s) => s.id !== action.payload.sprintId);
      const newActiveId =
        multiState.activeSprintId === action.payload.sprintId
          ? remaining[0].id
          : multiState.activeSprintId;
      return { sprints: remaining, activeSprintId: newActiveId };
    }

    default:
      return multiState;
  }
}

interface SprintContextType {
  state: SprintState;
  dispatch: React.Dispatch<SprintAction>;
  multiSprintState: MultiSprintState;
  loadFromApi: (sprintId?: string) => Promise<void>;
  apiLoading: boolean;
}

const SprintContext = createContext<SprintContextType | undefined>(undefined);

export const SprintProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [multiState, dispatch] = useReducer(multiSprintReducer, undefined, loadFromLocalStorage);
  const [apiLoading, setApiLoading] = useState(false);
  const apiLoadedRef = useRef(false);

  // ── Chargement automatique depuis l'API au montage (une seule fois) ──
  useEffect(() => {
    // Éviter le double-appel de React.StrictMode
    if (apiLoadedRef.current) return;
    apiLoadedRef.current = true;

    const loadApi = async () => {
      setApiLoading(true);
      const sprintId = 'sprint-default';
      console.log('🔄 [API] Début chargement depuis MongoDB...');
      try {
        const data = await loadFullSprint(sprintId);
        console.log('📦 [API] Données brutes reçues:', {
          sprint: data.sprint ? '✅' : '❌',
          objectives: data.objectives ? `✅ (${data.objectives?.objectives?.length || 0} obj)` : '❌',
          backlog: data.backlog ? '✅' : '❌',
          realizations: data.realizations ? '✅' : '❌',
          metrics: data.metrics ? '✅' : '❌',
          backlogEvolution: data.backlogEvolution ? '✅' : '❌',
          nextSteps: data.nextSteps ? '✅' : '❌',
          styles: data.styles ? '✅' : '❌',
          pages: data.pages ? `✅ (${data.pages?.length || 0})` : '❌',
        });
        if (data.sprint && Object.keys(data.sprint).length > 0) {
          const newState = apiToSprintState(data, initialState);
          console.log('🔀 [API] Objectives transformés:', newState.objectives?.map(o => o.title));
          dispatch({ type: 'LOAD_API_STATE', payload: newState });
          console.log('✅ [API] State React mis à jour depuis MongoDB');
        } else {
          console.warn('⚠️ [API] data.sprint vide, données locales conservées');
        }
      } catch (err) {
        console.error('❌ [API] Erreur lors du chargement:', err);
      } finally {
        setApiLoading(false);
      }
    };

    loadApi();
  }, []);

  // ── Fonction manuelle de rechargement depuis l'API ──
  const loadFromApiCb = useCallback(async (sprintId: string = 'sprint-default') => {
    setApiLoading(true);
    try {
      const data = await loadFullSprint(sprintId);
      if (data.sprint && Object.keys(data.sprint).length > 0) {
        const newState = apiToSprintState(data, initialState);
        dispatch({ type: 'LOAD_API_STATE', payload: newState });
        console.log('✅ [API] Rechargement manuel OK');
      }
    } catch (err) {
      console.error('❌ [API] Erreur rechargement manuel:', err);
    } finally {
      setApiLoading(false);
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    saveToLocalStorage(multiState);
  }, [multiState]);

  const activeSprint = multiState.sprints.find((s) => s.id === multiState.activeSprintId);
  // Always merge with defaults to guarantee pages/styles exist
  const state = activeSprint ? ensureSprintDefaults(activeSprint.data) : initialState;

  return (
    <SprintContext.Provider value={{ state, dispatch, multiSprintState: multiState, loadFromApi: loadFromApiCb, apiLoading }}>
      {children}
    </SprintContext.Provider>
  );
};

export const useSprint = (): SprintContextType => {
  const ctx = useContext(SprintContext);
  if (!ctx) throw new Error('useSprint must be used within SprintProvider');
  return ctx;
};