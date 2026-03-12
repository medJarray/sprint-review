/**
 * Configuration par défaut du Sprint Review
 * Toutes les données sont modifiables via le panneau Admin
 */

export const DEFAULT_CONFIG = {
  // ─── Informations Globales ───
  sprintNumber: 24,
  sprintName: 'Refonte UX Mobile',
  sprintDateStart: '12 Jan 2026',
  sprintDateEnd: '23 Jan 2026',
  version: 'v2.4.0',
  environment: 'Staging',
  projectName: 'Projet Alpha',
  teamName: 'Squad Alpha',

  // ─── Métriques Sprint ───
  velocityTarget: 42,
  velocityActual: 41,
  capacityPoints: 45,
  workDays: 10,

  // ─── Style & Apparence ───
  primaryColor: '#0F52BA',
  accentColor: '#00C48C',
  fontFamily: 'DM Sans',

  // ─── Membres de l'Équipe ───
  members: [
    { id: 1, initials: 'AM', name: 'Alice Martin', role: 'Product Owner', color: '#3B82F6' },
    { id: 2, initials: 'LD', name: 'Lucas Dubois', role: 'Scrum Master', color: '#6366F1' },
    { id: 3, initials: 'SM', name: 'Sarah Martin', role: 'QA Lead', color: '#8B5CF6' },
    { id: 4, initials: 'TR', name: 'Thomas Roux', role: 'Dev Frontend', color: '#EF4444' },
    { id: 5, initials: 'JB', name: 'Julie Bernard', role: 'Dev Backend', color: '#F59E0B' },
    { id: 6, initials: 'NP', name: 'Nicolas Petit', role: 'Designer UX', color: '#10B981' },
  ],

  // ─── Objectifs SMART ───
  objectives: [
    {
      id: 1,
      title: 'Finaliser l\'Épique "Paiement One-Click"',
      description: 'Implémenter le flux complet de paiement simplifié pour les utilisateurs connectés afin d\'augmenter le taux de conversion mobile de 15%.',
      priority: 'Haute',
      scope: 'Checkout & Paiement',
      epic: 'EPIC-42',
      color: '#0F52BA',
    },
    {
      id: 2,
      title: 'Optimisation des Performances',
      description: 'Réduire le temps de chargement de la page d\'accueil mobile de 20% (cible < 1.5s) via la compression des assets et le lazy-loading.',
      priority: 'Moyenne',
      scope: 'Core Performance',
      epic: '',
      color: '#6366F1',
    },
    {
      id: 3,
      title: 'Analytics V2 & Tracking',
      description: 'Mettre à jour le plan de marquage pour capturer les abandons de panier avec la nouvelle granularité requise par la BI.',
      priority: 'Tech Enabler',
      scope: 'Data Analytics',
      epic: '',
      color: '#0D9488',
    },
  ],

  // ─── User Stories ───
  userStories: [
    {
      id: 'US-101',
      title: 'Paiement One-Click Mobile',
      asA: 'client mobile connecté',
      iWant: 'payer ma commande en un seul clic',
      soThat: 'gagner du temps lors de mes achats récurrents',
      points: 8,
      status: 'done',
      acceptance: 'Bouton visible uniquement si CB enregistrée • Confirmation biométrique • Redirection page succès < 2s',
    },
    {
      id: 'US-102',
      title: 'Optimisation Assets Home',
      asA: 'visiteur mobile',
      iWant: 'que la page d\'accueil s\'affiche instantanément',
      soThat: 'ne pas être frustré par le temps de chargement',
      points: 5,
      status: 'done',
      acceptance: 'Images converties en WebP • Lazy loading activé • Time to Interactive < 1.5s',
    },
    {
      id: 'US-103',
      title: 'Tracking Abandons Panier',
      asA: 'Product Owner',
      iWant: 'des données précises sur l\'étape d\'abandon',
      soThat: 'comprendre les points de friction',
      points: 3,
      status: 'blocked',
      acceptance: 'Événements GA4 configurés • Dashboard Looker opérationnel',
    },
  ],

  // ─── Tâches Techniques ───
  techTasks: [
    { id: 'TECH-45', title: 'Upgrade React Native 0.72', points: 3, type: 'tech', status: 'done' },
    { id: 'BUG-89', title: 'Fix Login Spinner iOS', points: 2, type: 'bug', status: 'done' },
  ],

  // ─── Données Burndown ───
  burndownData: [
    { day: 'J1', ideal: 42, actual: 42 },
    { day: 'J2', ideal: 37.8, actual: 42 },
    { day: 'J3', ideal: 33.6, actual: 38 },
    { day: 'J4', ideal: 29.4, actual: 35 },
    { day: 'J5', ideal: 25.2, actual: 32 },
    { day: 'J6', ideal: 21, actual: 22 },
    { day: 'J7', ideal: 16.8, actual: 18 },
    { day: 'J8', ideal: 12.6, actual: 18 },
    { day: 'J9', ideal: 8.4, actual: 10 },
    { day: 'J10', ideal: 0, actual: 1 },
  ],

  // ─── Historique Vélocité ───
  velocityHistory: [
    { sprint: 'S20', points: 35 },
    { sprint: 'S21', points: 38 },
    { sprint: 'S22', points: 36 },
    { sprint: 'S23', points: 40 },
    { sprint: 'S24', points: 41 },
  ],

  // ─── KPIs ───
  kpis: [
    { label: 'Vélocité', value: '41', target: '/ 42 pts', percent: '98%', trend: 'up', color: '#3B82F6' },
    { label: 'Cycle Time', value: '2.4', target: 'jours', percent: 'Stable', trend: 'stable', color: '#6366F1' },
    { label: 'Bugs', value: '2', target: 'trouvés', percent: '100% Fix', trend: 'up', color: '#10B981' },
    { label: 'Team Happiness', value: '4.5', target: '/ 5', percent: 'Top', trend: 'up', color: '#8B5CF6' },
  ],

  // ─── Quality Gates ───
  qualityGates: [
    { label: 'Unit Tests', value: 88, status: 'pass' },
    { label: 'SonarQube', value: 'A', status: 'pass' },
    { label: 'E2E Tests', value: 100, status: 'pass' },
  ],

  // ─── Candidats Sprint Suivant ───
  nextSprintItems: [
    { id: 'US-104', title: 'Intégration Apple Pay', description: 'Paiement natif iOS sans redirection', points: 8, priority: 'High' },
    { id: 'US-105', title: 'Dashboard Analytics V2', description: 'Métriques de rétention par cohorte', points: 5, priority: 'Medium' },
    { id: 'SPIKE', title: 'Étude Migration Cloud', description: 'POC AWS Lambda pour traitement image', points: 3, priority: 'Low' },
    { id: 'US-108', title: 'Mode Sombre (Dark Mode)', description: 'Adaptation charte graphique mobile', points: 5, priority: 'Low' },
  ],

  // ─── Rétrospective ───
  retrospective: {
    positives: [
      'Collaboration dev/QA fluide sur les tickets critiques',
      'Estimation précise des User Stories complexes (US-101)',
      'Absence de changement de scope en cours de sprint',
    ],
    negatives: [
      'Temps de Code Review en hausse (+15%)',
      'Environnement de staging instable le jour 4',
      'Dette technique : couverture de tests JS à renforcer',
    ],
    actions: [
      'Mettre en place des créneaux dédiés Code Review',
      'Automatiser le health check staging',
      'Sprint dédié réduction dette tech planifié S26',
    ],
  },
};

/**
 * Définition des slides disponibles
 */
export const SLIDE_DEFINITIONS = [
  { id: 'cover', label: 'Couverture', iconName: 'Layers' },
  { id: 'team', label: 'Équipe', iconName: 'Users' },
  { id: 'objectives', label: 'Objectifs', iconName: 'Target' },
  { id: 'backlog', label: 'Backlog', iconName: 'ListChecks' },
  { id: 'realisations', label: 'Réalisations', iconName: 'Gift' },
  { id: 'demo', label: 'Démo', iconName: 'Monitor' },
  { id: 'metrics', label: 'Métriques', iconName: 'BarChart3' },
  { id: 'retro', label: 'Rétro', iconName: 'Coffee' },
  { id: 'next', label: 'Prochaines Étapes', iconName: 'ArrowRight' },
];

/**
 * Liste des polices disponibles
 */
export const AVAILABLE_FONTS = [
  'DM Sans',
  'Plus Jakarta Sans',
  'Outfit',
  'Figtree',
  'Sora',
  'Manrope',
];