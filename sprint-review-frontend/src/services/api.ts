/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║   Service API — Connexion Frontend ↔ Backend NestJS     ║
 * ║   Chaque collection a ses propres méthodes CRUD         ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// ─── Helper HTTP ───

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const errorBody = await res.text().catch(() => '');
    throw new Error(`API ${options?.method || 'GET'} ${path} → ${res.status}: ${errorBody}`);
  }
  // Pour les DELETE qui renvoient 200 avec body, ou 204 sans body
  const text = await res.text();
  return text ? JSON.parse(text) : ({} as T);
}

function get<T>(path: string) {
  return request<T>(path);
}

function post<T>(path: string, data: unknown) {
  return request<T>(path, { method: 'POST', body: JSON.stringify(data) });
}

function put<T>(path: string, data: unknown) {
  return request<T>(path, { method: 'PUT', body: JSON.stringify(data) });
}

function del<T>(path: string) {
  return request<T>(path, { method: 'DELETE' });
}

// ═══════════════════════════════════════════════════════════════
// 1. SPRINTS
// ═══════════════════════════════════════════════════════════════

export const sprintApi = {
  getAll: () => get<any[]>('/sprints'),
  getById: (sprintId: string) => get<any>(`/sprints/${sprintId}`),
  create: (data: any) => post<any>('/sprints', data),
  update: (sprintId: string, data: any) => put<any>(`/sprints/${sprintId}`, data),
  delete: (sprintId: string) => del(`/sprints/${sprintId}`),
};

// ═══════════════════════════════════════════════════════════════
// 2. TEAMS
// ═══════════════════════════════════════════════════════════════

export const teamsApi = {
  getBySprint: (sprintId: string) => get<any[]>(`/teams/sprint/${sprintId}`),
  getOne: (sprintId: string, teamId: string) => get<any>(`/teams/${sprintId}/${teamId}`),
  create: (data: any) => post<any>('/teams', data),
  update: (sprintId: string, teamId: string, data: any) => put<any>(`/teams/${sprintId}/${teamId}`, data),
  delete: (sprintId: string, teamId: string) => del(`/teams/${sprintId}/${teamId}`),
};

// ═══════════════════════════════════════════════════════════════
// 3. OBJECTIVES
// ═══════════════════════════════════════════════════════════════

export const objectivesApi = {
  get: (sprintId: string) => get<any>(`/objectives/${sprintId}`),
  upsert: (sprintId: string, data: any) => put<any>(`/objectives/${sprintId}`, data),
  delete: (sprintId: string) => del(`/objectives/${sprintId}`),
};

// ═══════════════════════════════════════════════════════════════
// 4. BACKLOG
// ═══════════════════════════════════════════════════════════════

export const backlogApi = {
  get: (sprintId: string) => get<any>(`/backlog/${sprintId}`),
  upsert: (sprintId: string, data: any) => put<any>(`/backlog/${sprintId}`, data),
  delete: (sprintId: string) => del(`/backlog/${sprintId}`),
};

// ═══════════════════════════════════════════════════════════════
// 5. REALIZATIONS
// ═══════════════════════════════════════════════════════════════

export const realizationsApi = {
  get: (sprintId: string) => get<any>(`/realizations/${sprintId}`),
  upsert: (sprintId: string, data: any) => put<any>(`/realizations/${sprintId}`, data),
  delete: (sprintId: string) => del(`/realizations/${sprintId}`),
};

// ═══════════════════════════════════════════════════════════════
// 6. DEMO CONFIG
// ═══════════════════════════════════════════════════════════════

export const demoConfigApi = {
  get: (sprintId: string) => get<any>(`/demo-configs/${sprintId}`),
  upsert: (sprintId: string, data: any) => put<any>(`/demo-configs/${sprintId}`, data),
  delete: (sprintId: string) => del(`/demo-configs/${sprintId}`),
};

// ═══════════════════════════════════════════════════════════════
// 7. METRICS
// ═══════════════════════════════════════════════════════════════

export const metricsApi = {
  get: (sprintId: string) => get<any>(`/metrics/${sprintId}`),
  upsert: (sprintId: string, data: any) => put<any>(`/metrics/${sprintId}`, data),
  delete: (sprintId: string) => del(`/metrics/${sprintId}`),
};

// ═══════════════════════════════════════════════════════════════
// 8. BACKLOG EVOLUTION
// ═══════════════════════════════════════════════════════════════

export const backlogEvolutionApi = {
  get: (sprintId: string) => get<any>(`/backlog-evolution/${sprintId}`),
  upsert: (sprintId: string, data: any) => put<any>(`/backlog-evolution/${sprintId}`, data),
  delete: (sprintId: string) => del(`/backlog-evolution/${sprintId}`),
};

// ═══════════════════════════════════════════════════════════════
// 9. NEXT STEPS
// ═══════════════════════════════════════════════════════════════

export const nextStepsApi = {
  get: (sprintId: string) => get<any>(`/next-steps/${sprintId}`),
  upsert: (sprintId: string, data: any) => put<any>(`/next-steps/${sprintId}`, data),
  delete: (sprintId: string) => del(`/next-steps/${sprintId}`),
};

// ═══════════════════════════════════════════════════════════════
// 10. STYLES
// ═══════════════════════════════════════════════════════════════

export const stylesApi = {
  get: (sprintId: string) => get<any>(`/styles/${sprintId}`),
  upsert: (sprintId: string, data: any) => put<any>(`/styles/${sprintId}`, data),
  delete: (sprintId: string) => del(`/styles/${sprintId}`),
};

// ═══════════════════════════════════════════════════════════════
// 11. PAGES
// ═══════════════════════════════════════════════════════════════

export const pagesApi = {
  getBySprint: (sprintId: string) => get<any[]>(`/pages/${sprintId}`),
  getOne: (sprintId: string, pageId: string) => get<any>(`/pages/${sprintId}/${pageId}`),
  create: (data: any) => post<any>('/pages', data),
  update: (sprintId: string, pageId: string, data: any) => put<any>(`/pages/${sprintId}/${pageId}`, data),
  batchReplace: (sprintId: string, pages: any[]) => put<any>(`/pages/${sprintId}/batch`, { pages }),
  delete: (sprintId: string, pageId: string) => del(`/pages/${sprintId}/${pageId}`),
};

// ═══════════════════════════════════════════════════════════════
// 12. ATTACHMENTS (MinIO S3)
// ═══════════════════════════════════════════════════════════════

export const attachmentsApi = {
  getBySprint: (sprintId: string, category?: string) => {
    const query = category ? `?category=${category}` : '';
    return get<any[]>(`/attachments/sprint/${sprintId}${query}`);
  },
  getById: (id: string) => get<any>(`/attachments/${id}`),
  upload: async (file: File, sprintId: string, category?: string, description?: string, uploadedBy?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sprintId', sprintId);
    if (category) formData.append('category', category);
    if (description) formData.append('description', description);
    if (uploadedBy) formData.append('uploadedBy', uploadedBy);

    const res = await fetch(`${API_BASE}/attachments/upload`, {
      method: 'POST',
      body: formData, // Pas de Content-Type, le navigateur le gère avec multipart
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    return res.json();
  },
  getDownloadUrl: (id: string) => `${API_BASE}/attachments/${id}/download`,
  delete: (id: string) => del(`/attachments/${id}`),
  deleteAllBySprint: (sprintId: string) => del(`/attachments/sprint/${sprintId}`),
};

// ═══════════════════════════════════════════════════════════════
// CHARGEMENT COMPLET D'UN SPRINT (toutes les collections)
// ═══════════════════════════════════════════════════════════════

export interface FullSprintData {
  sprint: any;
  teams: any[];
  objectives: any;
  backlog: any;
  realizations: any;
  demoConfig: any;
  metrics: any;
  backlogEvolution: any;
  nextSteps: any;
  styles: any;
  pages: any[];
}

/**
 * Charge toutes les données d'un sprint en parallèle depuis toutes les collections
 */
export async function loadFullSprint(sprintId: string): Promise<FullSprintData> {
  const [sprint, teams, objectives, backlog, realizations, demoConfig, metrics, backlogEvolution, nextSteps, styles, pages] =
    await Promise.all([
      sprintApi.getById(sprintId).catch(() => null),
      teamsApi.getBySprint(sprintId).catch(() => []),
      objectivesApi.get(sprintId).catch(() => null),
      backlogApi.get(sprintId).catch(() => null),
      realizationsApi.get(sprintId).catch(() => null),
      demoConfigApi.get(sprintId).catch(() => null),
      metricsApi.get(sprintId).catch(() => null),
      backlogEvolutionApi.get(sprintId).catch(() => null),
      nextStepsApi.get(sprintId).catch(() => null),
      stylesApi.get(sprintId).catch(() => null),
      pagesApi.getBySprint(sprintId).catch(() => []),
    ]);

  return { sprint, teams, objectives, backlog, realizations, demoConfig, metrics, backlogEvolution, nextSteps, styles, pages };
}
