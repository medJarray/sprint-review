# 🚀 Sprint Review Backend — API NestJS + MongoDB

Backend complet pour le Sprint Review Dashboard. Chaque catégorie de données est séparée dans sa propre collection MongoDB, permettant la sauvegarde indépendante de chaque section.

## 📦 Installation

```bash
cd sprint-review-backend
npm install
```

## ⚙️ Configuration

Créer `.env` et ajustez les variables d'environements suivant:

```env
MONGODB_URI=mongodb://localhost:27017/sprint-review
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

## 🏃 Lancement

```bash
# Développement (hot-reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📖 Documentation API (Swagger)

Une fois lancé, accédez à : **http://localhost:3001/api/docs**

---

## 🗄️ Architecture des Collections MongoDB

| # | Collection | Module | Description | Clé |
|---|-----------|--------|-------------|-----|
| 1 | `sprints` | SprintsModule | Infos de base du sprint (nom, dates, goal) | `sprintId` unique |
| 2 | `teams` | TeamsModule | Équipes et leurs membres | `sprintId` + `teamId` |
| 3 | `objectives` | ObjectivesModule | Objectifs SMART, critères de succès, contraintes, DoD | `sprintId` unique |
| 4 | `backlogs` | BacklogModule | Enablers (épiques) + User Stories + Tâches techniques | `sprintId` unique |
| 5 | `realizations` | RealizationsModule | Feature cards, small cards, items différés, métriques de valeur | `sprintId` unique |
| 6 | `demo_configs` | DemoConfigsModule | Configuration démo, étapes, liens | `sprintId` unique |
| 7 | `metrics` | MetricsModule | KPIs, burndown, vélocité, quality gates, insights | `sprintId` unique |
| 8 | `backlog_evolution` | BacklogEvolutionModule | Santé backlog, progression épiques, matrice priorisation | `sprintId` unique |
| 9 | `next_steps` | NextStepsModule | Candidats prochain sprint, décisions, risques, dates clés | `sprintId` unique |
| 10 | `styles` | StylesModule | Styles globaux (polices, couleurs, tailles) | `sprintId` unique |
| 11 | `pages` | PagesModule | Configuration des pages/slides | `sprintId` + `pageId` |

---

## 🔗 Endpoints API

Tous les endpoints sont préfixés par `/api`.

### 1. Sprints (`/api/sprints`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/sprints` | Créer un sprint |
| GET | `/api/sprints` | Lister tous les sprints |
| GET | `/api/sprints/:sprintId` | Récupérer un sprint |
| PUT | `/api/sprints/:sprintId` | Mettre à jour un sprint |
| DELETE | `/api/sprints/:sprintId` | Supprimer un sprint |

### 2. Teams (`/api/teams`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/teams` | Créer une équipe |
| GET | `/api/teams?sprintId=xxx` | Lister les équipes d'un sprint |
| GET | `/api/teams/:sprintId/:teamId` | Récupérer une équipe |
| PUT | `/api/teams/:sprintId/:teamId` | Mettre à jour une équipe |
| DELETE | `/api/teams/:sprintId/:teamId` | Supprimer une équipe |

### 3. Objectives (`/api/objectives`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/objectives` | Créer/remplacer (upsert) |
| GET | `/api/objectives/:sprintId` | Récupérer |
| PUT | `/api/objectives/:sprintId` | Mettre à jour partiellement |
| DELETE | `/api/objectives/:sprintId` | Supprimer |

### 4. Backlog (`/api/backlog`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/backlog` | Créer/remplacer (upsert) |
| GET | `/api/backlog/:sprintId` | Récupérer |
| PUT | `/api/backlog/:sprintId` | Mettre à jour |
| DELETE | `/api/backlog/:sprintId` | Supprimer |

### 5. Realizations (`/api/realizations`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/realizations` | Créer/remplacer (upsert) |
| GET | `/api/realizations/:sprintId` | Récupérer |
| PUT | `/api/realizations/:sprintId` | Mettre à jour |
| DELETE | `/api/realizations/:sprintId` | Supprimer |

### 6. Demo Configs (`/api/demo-configs`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/demo-configs` | Créer/remplacer (upsert) |
| GET | `/api/demo-configs/:sprintId` | Récupérer |
| PUT | `/api/demo-configs/:sprintId` | Mettre à jour |
| DELETE | `/api/demo-configs/:sprintId` | Supprimer |

### 7. Metrics (`/api/metrics`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/metrics` | Créer/remplacer (upsert) |
| GET | `/api/metrics/:sprintId` | Récupérer |
| PUT | `/api/metrics/:sprintId` | Mettre à jour |
| DELETE | `/api/metrics/:sprintId` | Supprimer |

### 8. Backlog Evolution (`/api/backlog-evolution`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/backlog-evolution` | Créer/remplacer (upsert) |
| GET | `/api/backlog-evolution/:sprintId` | Récupérer |
| PUT | `/api/backlog-evolution/:sprintId` | Mettre à jour |
| DELETE | `/api/backlog-evolution/:sprintId` | Supprimer |

### 9. Next Steps (`/api/next-steps`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/next-steps` | Créer/remplacer (upsert) |
| GET | `/api/next-steps/:sprintId` | Récupérer |
| PUT | `/api/next-steps/:sprintId` | Mettre à jour |
| DELETE | `/api/next-steps/:sprintId` | Supprimer |

### 10. Styles (`/api/styles`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/styles` | Créer/remplacer (upsert) |
| GET | `/api/styles/:sprintId` | Récupérer |
| PUT | `/api/styles/:sprintId` | Mettre à jour |
| DELETE | `/api/styles/:sprintId` | Supprimer |

### 11. Pages (`/api/pages`)
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/pages` | Créer une page |
| POST | `/api/pages/batch/:sprintId` | Remplacer toutes les pages en batch |
| GET | `/api/pages?sprintId=xxx` | Lister les pages d'un sprint |
| GET | `/api/pages/:sprintId/:pageId` | Récupérer une page |
| PUT | `/api/pages/:sprintId/:pageId` | Mettre à jour une page |
| DELETE | `/api/pages/:sprintId/:pageId` | Supprimer une page |

---

## 🧠 Principes de Conception

1. **Séparation par catégorie** : Chaque thème de données a sa propre collection MongoDB → sauvegarde indépendante
2. **Upsert intelligent** : Les endpoints POST utilisent `findOneAndUpdate` avec `upsert: true` pour créer ou remplacer
3. **Index optimisés** : `sprintId` indexé sur chaque collection, index composés pour teams et pages
4. **Validation stricte** : DTOs avec `class-validator` pour valider chaque champ
5. **Timestamps automatiques** : `createdAt` et `updatedAt` sur chaque document
6. **CORS configuré** : Prêt pour communiquer avec le frontend Vite
7. **Swagger intégré** : Documentation interactive auto-générée

---

## 📁 Structure du Projet

```
src/
├── main.ts                          # Point d'entrée + Swagger
├── app.module.ts                    # Module racine
└── modules/
    ├── sprints/                     # 🏃 Infos sprint
    │   ├── schemas/sprint.schema.ts
    │   ├── dto/sprint.dto.ts
    │   ├── sprints.service.ts
    │   ├── sprints.controller.ts
    │   └── sprints.module.ts
    ├── teams/                       # 👥 Équipes
    ├── objectives/                  # 🎯 Objectifs
    ├── backlog/                     # 📋 Backlog
    ├── realizations/                # ✅ Réalisations
    ├── demo-configs/                # 🎬 Config démo
    ├── metrics/                     # 📊 Métriques
    ├── backlog-evolution/           # 📈 Évolution backlog
    ├── next-steps/                  # ➡️ Prochaines étapes
    ├── styles/                      # 🎨 Styles
    └── pages/                       # 📄 Pages/Slides
```
