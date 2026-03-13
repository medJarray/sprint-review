/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║   Mappers API ↔ SprintState                             ║
 * ║   Transforme les données entre le format backend        ║
 * ║   (collections MongoDB) et le format frontend           ║
 * ║   (SprintState du contexte React)                       ║
 * ╚══════════════════════════════════════════════════════════╝
 */

import type {
  SprintState,
  SprintInfo,
  Team,
  Character,
  Metrics,
  Objective,
  SuccessCriteria,
  Constraint,
  DodItem,
  Enabler,
  UserStoryDetail,
  TechTask,
  FeatureCard,
  SmallCard,
  DeferredItem,
  ValueMetric,
  DemoConfig,
  DemoStep,
  KpiCard,
  InsightItem,
  QualityGate,
  BacklogHealthData,
  EpicProgress,
  BacklogChange,
  PrioritizationMatrix,
  NextSprintCandidate,
  Decision,
  Risk,
  KeyDate,
  SprintPage,
  GlobalStyles,
} from '../context/SprintContext';

import type { FullSprintData } from './api';

// ═══════════════════════════════════════════════════════════════
// API → Frontend (SprintState)
// ═══════════════════════════════════════════════════════════════

/**
 * Transforme les données brutes de l'API en SprintState utilisable par le contexte React
 */
export function apiToSprintState(data: FullSprintData, defaults: SprintState): SprintState {
  const state: SprintState = { ...defaults };

  // ── Sprint ──
  if (data.sprint) {
    state.sprint = {
      name: data.sprint.name || defaults.sprint.name,
      number: data.sprint.number ?? defaults.sprint.number,
      goal: data.sprint.goal || defaults.sprint.goal,
      startDate: data.sprint.startDate || defaults.sprint.startDate,
      endDate: data.sprint.endDate || defaults.sprint.endDate,
    };
  }

  // ── Teams ──
  if (data.teams && data.teams.length > 0) {
    state.teams = data.teams.map((t: any) => ({
      id: t.teamId || t._id,
      name: t.name,
    }));
  }

  // ── Objectives ──
  if (data.objectives) {
    const obj = data.objectives;
    if (obj.objectives) {
      state.objectives = obj.objectives.map((o: any) => ({
        id: o.id || o.objectiveId || o._id,
        title: o.title,
        description: o.description || '',
        priority: o.priority || '',
        scope: o.scope || '',
        epicLink: o.epicLink,
        borderColor: o.borderColor || '',
      }));
    }
    if (obj.successCriteria) {
      state.successCriteria = obj.successCriteria.map((c: any) => ({
        id: c.id || c.criteriaId || c._id,
        text: c.text,
      }));
    }
    if (obj.constraints) {
      state.constraints = obj.constraints.map((c: any) => ({
        id: c.id || c.constraintId || c._id,
        text: c.text,
      }));
    }
    if (obj.dodItems) {
      state.dodItems = obj.dodItems.map((d: any) => ({
        id: d.id || d.dodId || d._id,
        text: d.text,
      }));
    }
  }

  // ── Backlog ──
  if (data.backlog) {
    if (data.backlog.enablers) {
      state.enablers = data.backlog.enablers.map((e: any) => ({
        id: e.id || e.enablerId || e._id,
        epicId: e.epicId,
        name: e.name,
        bgColor: e.bgColor || '',
        textColor: e.textColor || '',
        iconColor: e.iconColor || '',
        stories: (e.stories || []).map((s: any) => ({
          id: s._id || s.storyId,
          storyId: s.storyId,
          title: s.title,
          points: s.points,
          asA: s.asA || '',
          iWant: s.iWant || '',
          soThat: s.soThat || '',
          ac: s.ac,
        })),
      }));
    }
    if (data.backlog.techTasks) {
      state.techTasks = data.backlog.techTasks.map((t: any) => ({
        id: t._id || t.taskId,
        taskId: t.taskId,
        title: t.title,
        points: t.points,
        type: t.type,
      }));
    }
  }

  // ── Realizations ──
  if (data.realizations) {
    const r = data.realizations;
    if (r.featureCards) {
      state.featureCards = r.featureCards.map((f: any) => ({
        id: f.id || f.cardId || f._id,
        storyId: f.storyId,
        title: f.title,
        description: f.description || '',
        status: f.status,
        impact: f.impact,
        prLink: f.prLink,
        assignees: f.assignees || [],
      }));
    }
    if (r.smallCards) {
      state.smallCards = r.smallCards.map((s: any) => ({
        id: s.id || s.cardId || s._id,
        type: s.type,
        title: s.title,
        description: s.description || '',
        status: s.status,
      }));
    }
    if (r.deferredItems) {
      state.deferredItems = r.deferredItems.map((d: any) => ({
        id: d.id || d.itemId || d._id,
        storyId: d.storyId,
        title: d.title,
        reason: d.reason,
      }));
    }
    state.teamNote = r.teamNote || '';
    if (r.valueMetrics) {
      state.valueMetrics = r.valueMetrics.map((v: any) => ({
        id: v.id || v.metricId || v._id,
        label: v.label,
        value: v.value,
        subText: v.subText,
        bgColor: v.bgColor || '',
        borderColor: v.borderColor || '',
        iconColor: v.iconColor || '',
        icon: v.icon || '',
      }));
    }
  }

  // ── Demo Config ──
  if (data.demoConfig) {
    const d = data.demoConfig;
    state.demoConfig = {
      environment: d.environment || '',
      testAccount: d.testAccount || '',
      version: d.version || '',
      demoOwner: d.demoOwner || '',
      demoOwnerInitials: d.demoOwnerInitials || '',
      videoLink: d.videoLink,
      figmaLink: d.figmaLink,
      steps: (d.steps || []).map((s: any) => ({
        id: s._id || String(s.stepNumber),
        stepNumber: s.stepNumber,
        title: s.title,
        description: s.description || '',
        note: s.note,
        featureRef: s.featureRef,
        isActive: s.isActive ?? false,
      })),
    };
  }

  // ── Metrics ──
  if (data.metrics) {
    const m = data.metrics;
    if (m.sprintMetrics) {
      state.metrics = {
        plannedPoints: m.sprintMetrics.plannedPoints ?? 0,
        completedPoints: m.sprintMetrics.completedPoints ?? 0,
      };
    }
    if (m.kpiCards) {
      state.kpiCards = m.kpiCards.map((k: any) => ({
        id: k.id || k.kpiId || k._id,
        label: k.label,
        value: k.value,
        unit: k.unit,
        badgeText: k.badgeText,
        badgeType: k.badgeType,
        subText: k.subText,
        borderColor: k.borderColor || '',
      }));
    }
    if (m.burndownIdeal) state.burndownIdeal = m.burndownIdeal;
    if (m.burndownReal) state.burndownReal = m.burndownReal;
    if (m.velocityHistory) state.velocityHistory = m.velocityHistory;
    if (m.insightsGood) {
      state.insightsGood = m.insightsGood.map((i: any) => ({
        id: i.id || i.insightId || i._id,
        text: i.text,
      }));
    }
    if (m.insightsBad) {
      state.insightsBad = m.insightsBad.map((i: any) => ({
        id: i.id || i.insightId || i._id,
        text: i.text,
      }));
    }
    if (m.qualityGate) state.qualityGate = m.qualityGate;
  }

  // ── Backlog Evolution ──
  if (data.backlogEvolution) {
    const be = data.backlogEvolution;
    if (be.backlogHealth) state.backlogHealth = be.backlogHealth;
    if (be.epicsProgress) {
      state.epicsProgress = be.epicsProgress.map((e: any) => ({
        id: e._id || e.epicId,
        epicId: e.epicId,
        name: e.name,
        description: e.description || '',
        pct: e.pct,
        done: e.done,
        total: e.total,
        targetSprint: e.targetSprint,
        bgColor: e.bgColor || '',
        borderColor: e.borderColor || '',
        badgeBg: e.badgeBg || '',
        badgeText: e.badgeText || '',
        barColor: e.barColor || '',
        targetColor: e.targetColor || '',
        pctColor: e.pctColor || '',
      }));
    }
    if (be.backlogChanges) state.backlogChanges = be.backlogChanges;
    if (be.prioritizationMatrix) state.prioritizationMatrix = be.prioritizationMatrix;
  }

  // ── Next Steps ──
  if (data.nextSteps) {
    const ns = data.nextSteps;
    if (ns.nextSprintCandidates) {
      state.nextSprintCandidates = ns.nextSprintCandidates.map((c: any) => ({
        id: c._id || c.id || c.storyId,
        storyId: c.storyId,
        title: c.title,
        description: c.description || '',
        priority: c.priority || '',
        points: c.points,
        type: c.type || 'us',
      }));
    } else if (ns.candidates) {
      state.nextSprintCandidates = ns.candidates.map((c: any) => ({
        id: c._id || c.id || c.storyId,
        storyId: c.storyId,
        title: c.title,
        description: c.description || '',
        priority: c.priority || '',
        points: c.points,
        type: c.type || 'us',
      }));
    }
    if (ns.decisions) {
      state.decisions = ns.decisions.map((d: any) => ({
        id: d._id || d.title,
        title: d.title,
        description: d.description || '',
        icon: d.icon || '',
      }));
    }
    if (ns.risks) {
      state.risks = ns.risks.map((r: any) => ({
        id: r._id || r.text,
        text: r.text,
      }));
    }
    if (ns.keyDates) {
      state.keyDates = ns.keyDates.map((k: any) => ({
        id: k._id || k.date,
        date: k.date,
        title: k.title,
        color: k.color || '',
      }));
    }
    state.nextSprintDate = ns.nextSprintDate || '';
  }

  // ── Styles ──
  if (data.styles) {
    state.styles = {
      fontFamily: data.styles.fontFamily || defaults.styles.fontFamily,
      headingFontFamily: data.styles.headingFontFamily || defaults.styles.headingFontFamily,
      primaryColor: data.styles.primaryColor || defaults.styles.primaryColor,
      secondaryColor: data.styles.secondaryColor || defaults.styles.secondaryColor,
      accentColor: data.styles.accentColor || defaults.styles.accentColor,
      backgroundColor: data.styles.backgroundColor || defaults.styles.backgroundColor,
      textColor: data.styles.textColor || defaults.styles.textColor,
      fontSize: data.styles.fontSize ?? defaults.styles.fontSize,
      borderRadius: data.styles.borderRadius ?? defaults.styles.borderRadius,
    };
  }

  // ── Pages ──
  if (data.pages && data.pages.length > 0) {
    state.pages = data.pages.map((p: any) => ({
      id: p.pageId || p._id,
      title: p.title,
      slug: p.slug || '',
      order: p.order ?? 0,
      visible: p.visible ?? true,
    }));
  }

  return state;
}

// ═══════════════════════════════════════════════════════════════
// Frontend (SprintState) → API payloads (pour sauvegarde)
// ═══════════════════════════════════════════════════════════════

export function sprintStateToSprintPayload(state: SprintState, sprintId: string) {
  return {
    sprintId,
    name: state.sprint.name,
    number: state.sprint.number,
    goal: state.sprint.goal,
    startDate: state.sprint.startDate,
    endDate: state.sprint.endDate,
  };
}

export function sprintStateToTeamsPayload(state: SprintState, sprintId: string) {
  // On envoie une seule team (Squad Alpha par défaut)
  return {
    sprintId,
    teamId: state.teams[0]?.id || 'squad-alpha',
    name: state.teams[0]?.name || 'Squad Alpha',
    members: [], // Les membres sont gérés séparément dans l'admin
  };
}

export function sprintStateToObjectivesPayload(state: SprintState) {
  return {
    objectives: state.objectives.map((o) => ({
      id: o.id,
      title: o.title,
      description: o.description,
      priority: o.priority,
      scope: o.scope,
      epicLink: o.epicLink,
      borderColor: o.borderColor,
    })),
    successCriteria: state.successCriteria.map((c) => ({
      id: c.id,
      text: c.text,
    })),
    constraints: state.constraints.map((c) => ({
      id: c.id,
      text: c.text,
    })),
    dodItems: state.dodItems.map((d) => ({
      id: d.id,
      text: d.text,
    })),
  };
}

export function sprintStateToBacklogPayload(state: SprintState) {
  return {
    enablers: state.enablers.map((e) => ({
      id: e.id,
      epicId: e.epicId,
      name: e.name,
      bgColor: e.bgColor,
      textColor: e.textColor,
      iconColor: e.iconColor,
      stories: e.stories.map((s) => ({
        id: s.id || s.storyId,
        storyId: s.storyId,
        title: s.title,
        points: s.points,
        asA: s.asA,
        iWant: s.iWant,
        soThat: s.soThat,
        ac: s.ac,
      })),
    })),
    techTasks: state.techTasks.map((t) => ({
      id: t.id || t.taskId,
      taskId: t.taskId,
      title: t.title,
      points: t.points,
      type: t.type,
    })),
  };
}

export function sprintStateToRealizationsPayload(state: SprintState) {
  return {
    featureCards: state.featureCards.map((f) => ({
      id: f.id,
      storyId: f.storyId,
      title: f.title,
      description: f.description,
      status: f.status,
      impact: f.impact,
      prLink: f.prLink,
      assignees: f.assignees,
    })),
    smallCards: state.smallCards.map((s) => ({
      id: s.id,
      type: s.type,
      title: s.title,
      description: s.description,
      status: s.status,
    })),
    deferredItems: state.deferredItems.map((d) => ({
      id: d.id,
      storyId: d.storyId,
      title: d.title,
      reason: d.reason,
    })),
    teamNote: state.teamNote,
    valueMetrics: state.valueMetrics.map((v) => ({
      id: v.id,
      label: v.label,
      value: v.value,
      subText: v.subText,
      bgColor: v.bgColor,
      borderColor: v.borderColor,
      iconColor: v.iconColor,
      icon: v.icon,
    })),
  };
}

export function sprintStateToDemoConfigPayload(state: SprintState) {
  return {
    environment: state.demoConfig.environment,
    testAccount: state.demoConfig.testAccount,
    version: state.demoConfig.version,
    demoOwner: state.demoConfig.demoOwner,
    demoOwnerInitials: state.demoConfig.demoOwnerInitials,
    videoLink: state.demoConfig.videoLink,
    figmaLink: state.demoConfig.figmaLink,
    steps: state.demoConfig.steps.map((s) => ({
      id: s.id || String(s.stepNumber),
      stepNumber: s.stepNumber,
      title: s.title,
      description: s.description,
      note: s.note,
      featureRef: s.featureRef,
      isActive: s.isActive,
    })),
  };
}

export function sprintStateToMetricsPayload(state: SprintState) {
  return {
    sprintMetrics: {
      plannedPoints: state.metrics.plannedPoints,
      completedPoints: state.metrics.completedPoints,
    },
    kpiCards: state.kpiCards.map((k) => ({
      id: k.id,
      label: k.label,
      value: k.value,
      unit: k.unit,
      badgeText: k.badgeText,
      badgeType: k.badgeType,
      subText: k.subText,
      borderColor: k.borderColor,
    })),
    burndownIdeal: state.burndownIdeal,
    burndownReal: state.burndownReal,
    velocityHistory: state.velocityHistory,
    insightsGood: state.insightsGood.map((i) => ({
      id: i.id,
      text: i.text,
    })),
    insightsBad: state.insightsBad.map((i) => ({
      id: i.id,
      text: i.text,
    })),
    qualityGate: state.qualityGate,
  };
}

export function sprintStateToBacklogEvolutionPayload(state: SprintState) {
  return {
    backlogHealth: state.backlogHealth,
    epicsProgress: state.epicsProgress.map((e) => ({
      id: e.id || e.epicId,
      epicId: e.epicId,
      name: e.name,
      description: e.description,
      pct: e.pct,
      done: e.done,
      total: e.total,
      targetSprint: e.targetSprint,
      bgColor: e.bgColor,
      borderColor: e.borderColor,
      badgeBg: e.badgeBg,
      badgeText: e.badgeText,
      barColor: e.barColor,
      targetColor: e.targetColor,
      pctColor: e.pctColor,
    })),
    backlogChanges: state.backlogChanges,
    prioritizationMatrix: state.prioritizationMatrix,
  };
}

export function sprintStateToNextStepsPayload(state: SprintState) {
  return {
    nextSprintCandidates: state.nextSprintCandidates.map((c) => ({
      id: c.id,
      storyId: c.storyId,
      title: c.title,
      description: c.description,
      priority: c.priority,
      points: c.points,
      type: c.type,
    })),
    decisions: state.decisions.map((d) => ({
      id: d.id,
      title: d.title,
      description: d.description,
      icon: d.icon,
    })),
    risks: state.risks.map((r) => ({
      id: r.id,
      text: r.text,
    })),
    keyDates: state.keyDates.map((k) => ({
      id: k.id,
      date: k.date,
      title: k.title,
      color: k.color,
    })),
    nextSprintDate: state.nextSprintDate,
  };
}

export function sprintStateToStylesPayload(state: SprintState) {
  return {
    fontFamily: state.styles.fontFamily,
    headingFontFamily: state.styles.headingFontFamily,
    primaryColor: state.styles.primaryColor,
    secondaryColor: state.styles.secondaryColor,
    accentColor: state.styles.accentColor,
    backgroundColor: state.styles.backgroundColor,
    textColor: state.styles.textColor,
    fontSize: state.styles.fontSize,
    borderRadius: state.styles.borderRadius,
  };
}

export function sprintStateToPagesPayload(state: SprintState) {
  return state.pages.map((p) => ({
    pageId: p.id,
    title: p.title,
    slug: p.slug,
    order: p.order,
    visible: p.visible,
  }));
}
