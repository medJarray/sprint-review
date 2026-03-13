# 🚀 Sprint Review Dashboard

> Application complète de gestion de Sprint Review Scrum/Agile avec panneau d'administration, présentation interactive des slides, et backend API REST.

![NestJS](https://img.shields.io/badge/NestJS-10.4-E0234E?logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![MinIO](https://img.shields.io/badge/MinIO-S3-C72E49?logo=minio&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss&logoColor=white)

---

## 📑 Table des matières

- [Aperçu du projet](#-aperçu-du-projet)
- [Architecture générale](#-architecture-générale)
- [Stack technique](#-stack-technique)
- [Structure du projet](#-structure-du-projet)
- [Installation & Lancement](#-installation--lancement)
- [Infrastructure Docker](#-infrastructure-docker)
- [API REST — Endpoints](#-api-rest--endpoints)
- [Base de données MongoDB](#-base-de-données-mongodb)
- [Frontend — Pages & Slides](#-frontend--pages--slides)
- [Connexion Frontend ↔ Backend](#-connexion-frontend--backend)
- [Script de Seed](#-script-de-seed)
- [Collection Postman](#-collection-postman)
- [Variables d'environnement](#-variables-denvironnement)

---

## 🌟 Aperçu du projet

Le **Sprint Review Dashboard** est une application full-stack permettant de :

- 📊 **Présenter** les Sprint Reviews avec des slides interactifs (couverture, objectifs, backlog, réalisations, démo, métriques, évolution backlog, prochaines étapes)
- ⚙️ **Administrer** chaque donnée de sprint indépendamment via un panneau admin complet
- 💾 **Persister** les données dans MongoDB avec 12 collections optimisées par catégorie
- 📎 **Stocker** des pièces jointes (images, PDF, vidéos) dans MinIO S3
- 🔄 **Synchroniser** le frontend avec le backend via des boutons de chargement/sauvegarde par section

---

## 🏗 Architecture générale

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + Vite)                      │
│                         http://localhost:5173                        │
│                                                                     │
│  ┌──────────┐  ┌──────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Pages/   │  │   Admin      │  │  Context    │  │  Services   │  │
│  │  Slides   │  │   (CRUD)     │  │  (State)    │  │  (API)      │  │
│  └──────────┘  └──────────────┘  └─────────────┘  └──────┬──────┘  │
│                                                          │         │
└──────────────────────────────────────────────────────────┼─────────┘
                                                           │
                                              HTTP REST (JSON)
                                                           │
┌──────────────────────────────────────────────────────────┼─────────┐
│                     BACKEND (NestJS)                      │         │
│                   http://localhost:3001/api               │         │
│                                                          ▼         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      12 Modules NestJS                      │   │
│  │  (Controller → Service → Schema) × 12 collections           │   │
│  └───────────┬──────────────────────────────────┬──────────────┘   │
│              │                                  │                  │
│              ▼                                  ▼                  │
│  ┌───────────────────┐              ┌────────────────────┐        │
│  │   MongoDB 7        │              │   MinIO S3          │        │
│  │   :27017           │              │   :9000 (API)       │        │
│  │   12 collections   │              │   :9001 (Console)   │        │
│  └───────────────────┘              └────────────────────┘        │
│              │                                                    │
│              ▼                                                    │
│  ┌───────────────────┐                                            │
│  │  Mongo Express     │                                            │
│  │  :8081 (Web UI)    │                                            │
│  └───────────────────┘                                            │
└───────────────────────────────────────────────────────────────────┘
```

### Principe de séparation des données

Chaque catégorie de données a **sa propre collection MongoDB** et **son propre module NestJS** avec des endpoints CRUD indépendants. Cela permet de **sauvegarder chaque section séparément** sans affecter les autres.

```
SprintState (frontend)
  ├── sprint info        → Collection: sprints
  ├── teams              → Collection: teams           (N par sprint)
  ├── objectives         → Collection: objectives
  ├── backlog            → Collection: backlogs
  ├── realizations       → Collection: realizations
  ├── demo config        → Collection: demo_configs
  ├── metrics            → Collection: metrics
  ├── backlog evolution  → Collection: backlog_evolution
  ├── next steps         → Collection: next_steps
  ├── styles             → Collection: styles
  ├── pages              → Collection: pages           (N par sprint)
  └── attachments        → Collection: attachments     (N par sprint, MinIO)
```

---

## 🔧 Stack technique

### Frontend

| Technologie | Version | Rôle |
|-------------|---------|------|
| **React** | 18.3 | Framework UI |
| **TypeScript** | 5.7 | Typage statique |
| **Vite** | 6.0 | Build tool & dev server |
| **Tailwind CSS** | 4.1 | Framework CSS utility-first |
| **React Router** | 7.13 | Routage SPA |
| **Recharts** | 2.13 | Graphiques (burndown, vélocité) |
| **Chart.js** | 4.5 | Graphiques complémentaires |
| **Lucide React** | 0.460 | Icônes |

### Backend

| Technologie | Version | Rôle |
|-------------|---------|------|
| **NestJS** | 10.4 | Framework backend |
| **TypeScript** | 5.7 | Typage statique |
| **Mongoose** | 8.9 | ODM MongoDB |
| **Swagger/OpenAPI** | 8.1 | Documentation API auto-générée |
| **class-validator** | 0.14 | Validation des DTOs |
| **MinIO SDK** | 8.0 | Client S3 pour stockage fichiers |
| **uuid** | 13.0 | Génération d'identifiants uniques |

### Infrastructure

| Service | Version | Rôle |
|---------|---------|------|
| **MongoDB** | 7 | Base de données NoSQL |
| **Mongo Express** | 1 | Interface web d'administration MongoDB |
| **MinIO** | latest | Stockage objet S3-compatible |
| **Docker Compose** | 3.8 | Orchestration des services |

---

## 📁 Structure du projet

```
sprint-review-dashboard/
│
├── sprint-review/                          # 🎨 FRONTEND (React + Vite)
│   ├── .env                                # Variables d'environnement (VITE_API_URL)
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       ├── main.tsx                        # Point d'entrée React
│       ├── App.tsx                         # Router principal (/presentation, /admin)
│       ├── App.css / index.css             # Styles globaux
│       │
│       ├── context/
│       │   └── SprintContext.tsx            # État global (~775 lignes)
│       │                                    #  → SprintState, MultiSprintState
│       │                                    #  → useReducer + localStorage + auto-load API
│       │                                    #  → LOAD_API_STATE action (MongoDB → State)
│       │                                    #  → 40+ interfaces TypeScript
│       │
│       ├── data/
│       │   └── defaultConfig.ts            # Configuration par défaut (Sprint #24)
│       │
│       ├── services/
│       │   ├── api.ts                      # Client HTTP pour les 12 endpoints
│       │   └── mappers.ts                  # Transformateurs API ↔ SprintState
│       │
│       ├── hooks/
│       │   └── useSprintApi.ts             # Hook de synchronisation Front ↔ Back
│       │
│       ├── pages/
│       │   ├── AdminPage.tsx               # Panneau admin complet (10 onglets)
│       │   ├── PresentationPage.tsx         # Mode présentation (slides)
│       │   ├── HomePage.tsx
│       │   ├── ReviewPage.tsx
│       │   ├── DemoPage.tsx
│       │   ├── RetroPage.tsx
│       │   ├── CustomPage.tsx
│       │   └── slides/
│       │       ├── SlideCover.tsx           # Couverture du sprint
│       │       ├── SlideObjectifs.tsx       # Objectifs SMART
│       │       ├── SlideBacklog.tsx         # Backlog & User Stories
│       │       ├── SlideBacklog2.tsx        # Détails backlog
│       │       ├── SlideRealisations.tsx    # Réalisations & Incréments
│       │       ├── SlideDemo.tsx            # Configuration démo
│       │       ├── SlideMetriques.tsx       # KPIs, burndown, vélocité
│       │       ├── SlideBacklogEvolution.tsx # Évolution du backlog
│       │       └── SlideNextSteps.tsx       # Prochaines étapes
│       │
│       ├── components/
│       │   ├── common/
│       │   │   ├── Card.tsx
│       │   │   └── MetricCard.tsx
│       │   └── Layout/
│       │       ├── Header.tsx
│       │       └── Layout.tsx
│       │
│       └── types/
│           └── index.ts                    # Types TypeScript exportés
│
├── sprint-review-backend/                  # ⚙️ BACKEND (NestJS)
│   ├── .env / .env.example                 # Variables d'environnement
│   ├── package.json
│   ├── nest-cli.json
│   ├── tsconfig.json / tsconfig.build.json
│   ├── docker-compose.yml                  # MongoDB + Mongo Express + MinIO
│   │
│   ├── postman/
│   │   └── Sprint_Review_API.postman_collection.json  # 53 requêtes
│   │
│   └── src/
│       ├── main.ts                         # Bootstrap NestJS (Swagger, CORS, validation)
│       ├── app.module.ts                   # Module racine (13 imports)
│       │
│       ├── scripts/
│       │   └── seed.ts                     # Script de peuplement Sprint #24
│       │
│       └── modules/
│           ├── sprints/                    # 🏃 Collection: sprints
│           │   ├── schemas/sprint.schema.ts
│           │   ├── dto/sprint.dto.ts
│           │   ├── sprints.service.ts
│           │   ├── sprints.controller.ts
│           │   └── sprints.module.ts
│           │
│           ├── teams/                      # 👥 Collection: teams
│           │   ├── schemas/team.schema.ts
│           │   ├── dto/team.dto.ts
│           │   ├── teams.service.ts
│           │   ├── teams.controller.ts
│           │   └── teams.module.ts
│           │
│           ├── objectives/                 # 🎯 Collection: objectives
│           ├── backlog/                    # 📋 Collection: backlogs
│           ├── realizations/               # 🎁 Collection: realizations
│           ├── demo-configs/               # 🖥️ Collection: demo_configs
│           ├── metrics/                    # 📊 Collection: metrics
│           ├── backlog-evolution/          # 📈 Collection: backlog_evolution
│           ├── next-steps/                 # 🔜 Collection: next_steps
│           ├── styles/                     # 🎨 Collection: styles
│           ├── pages/                      # 📄 Collection: pages
│           │
│           ├── minio/                      # ☁️ Provider MinIO S3 (global)
│           │   ├── minio.module.ts
│           │   └── minio.service.ts
│           │
│           └── attachments/                # 📎 Collection: attachments
│               ├── schemas/attachment.schema.ts
│               ├── dto/attachment.dto.ts
│               ├── attachments.service.ts
│               ├── attachments.controller.ts
│               └── attachments.module.ts
```

---

## 🚀 Installation & Lancement

### Prérequis

- **Node.js** ≥ 18
- **Yarn** (backend & frontend)
- **Docker** & **Docker Compose** (pour MongoDB + MinIO)

### 1. Lancer l'infrastructure

```bash
cd sprint-review-backend
docker compose up -d
```

Cela démarre :
- **MongoDB** sur `localhost:27017`
- **Mongo Express** sur `http://localhost:8081`
- **MinIO** sur `http://localhost:9000` (API) et `http://localhost:9001` (Console)

### 2. Installer & lancer le backend

```bash
cd sprint-review-backend
yarn install
yarn start:dev
```

Le backend démarre sur `http://localhost:3001`
La documentation Swagger est accessible sur `http://localhost:3001/api/docs`

### 3. Peupler la base avec les données du Sprint #24

```bash
cd sprint-review-backend
yarn seed
```

### 4. Installer & lancer le frontend

```bash
cd sprint-review
yarn install
yarn dev
```

Le frontend démarre sur `http://localhost:5173`

### 5. Accéder à l'application

| URL | Description |
|-----|-------------|
| `http://localhost:5173/presentation` | Mode présentation (slides) |
| `http://localhost:5173/admin` | Panneau d'administration |
| `http://localhost:3001/api/docs` | Documentation Swagger |
| `http://localhost:8081` | Mongo Express (DB UI) |
| `http://localhost:9001` | Console MinIO |

---

## 🐳 Infrastructure Docker

### docker-compose.yml

| Service | Image | Container | Ports | Credentials |
|---------|-------|-----------|-------|-------------|
| **mongodb** | `mongo:7` | `sprint-review-mongodb` | `27017:27017` | `admin` / `admin123` |
| **mongo-express** | `mongo-express:1` | `sprint-review-mongo-ui` | `8081:8081` | — (auth désactivé) |
| **minio** | `minio/minio:latest` | `sprint-review-minio` | `9000:9000` (API) / `9001:9001` (Console) | `minioadmin` / `minioadmin123` |
| **minio-init** | `minio/mc:latest` | `sprint-review-minio-init` | — | Crée le bucket `sprint-review-attachments` |

### Volumes persistants

| Volume | Description |
|--------|-------------|
| `mongodb_data` | Données MongoDB |
| `minio_data` | Données MinIO S3 |

### Réseau

Tous les services sont sur le réseau Docker `sprint-network` (bridge).

### Commandes utiles

```bash
# Démarrer l'infra
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter l'infra
docker compose down

# Supprimer les données (reset complet)
docker compose down -v
```

---

## 🔌 API REST — Endpoints

> **Base URL :** `http://localhost:3001/api`
> **Documentation Swagger :** `http://localhost:3001/api/docs`
> **Total : 53 endpoints** répartis sur 12 contrôleurs
>
> ⚡ **Upsert :** Tous les endpoints `PUT` utilisent le mode **upsert** — si le document n'existe pas, il est créé automatiquement. Pas besoin de `POST` avant un `PUT`.

### 1. 🏃 Sprints — `/api/sprints`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/sprints` | Créer un nouveau sprint |
| `GET` | `/api/sprints` | Lister tous les sprints |
| `GET` | `/api/sprints/:sprintId` | Récupérer un sprint par ID |
| `PUT` | `/api/sprints/:sprintId` | Mettre à jour un sprint |
| `DELETE` | `/api/sprints/:sprintId` | Supprimer un sprint |

### 2. 👥 Équipes — `/api/teams`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/teams` | Créer une équipe |
| `GET` | `/api/teams/sprint/:sprintId` | Lister les équipes d'un sprint |
| `GET` | `/api/teams/:sprintId/:teamId` | Récupérer une équipe |
| `PUT` | `/api/teams/:sprintId/:teamId` | Mettre à jour une équipe |
| `DELETE` | `/api/teams/:sprintId/:teamId` | Supprimer une équipe |

### 3. 🎯 Objectifs — `/api/objectives`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/objectives` | Créer les objectifs d'un sprint (upsert) |
| `GET` | `/api/objectives/:sprintId` | Récupérer les objectifs |
| `PUT` | `/api/objectives/:sprintId` | Mettre à jour les objectifs |
| `DELETE` | `/api/objectives/:sprintId` | Supprimer les objectifs |

### 4. 📋 Backlog — `/api/backlog`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/backlog` | Créer le backlog d'un sprint (upsert) |
| `GET` | `/api/backlog/:sprintId` | Récupérer le backlog |
| `PUT` | `/api/backlog/:sprintId` | Mettre à jour le backlog |
| `DELETE` | `/api/backlog/:sprintId` | Supprimer le backlog |

### 5. 🎁 Réalisations — `/api/realizations`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/realizations` | Créer les réalisations d'un sprint (upsert) |
| `GET` | `/api/realizations/:sprintId` | Récupérer les réalisations |
| `PUT` | `/api/realizations/:sprintId` | Mettre à jour les réalisations |
| `DELETE` | `/api/realizations/:sprintId` | Supprimer les réalisations |

### 6. 🖥️ Configuration Démo — `/api/demo-configs`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/demo-configs` | Créer la config démo (upsert) |
| `GET` | `/api/demo-configs/:sprintId` | Récupérer la config démo |
| `PUT` | `/api/demo-configs/:sprintId` | Mettre à jour la config démo |
| `DELETE` | `/api/demo-configs/:sprintId` | Supprimer la config démo |

### 7. 📊 Métriques — `/api/metrics`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/metrics` | Créer les métriques (upsert) |
| `GET` | `/api/metrics/:sprintId` | Récupérer les métriques |
| `PUT` | `/api/metrics/:sprintId` | Mettre à jour les métriques |
| `DELETE` | `/api/metrics/:sprintId` | Supprimer les métriques |

### 8. 📈 Évolution Backlog — `/api/backlog-evolution`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/backlog-evolution` | Créer l'évolution backlog (upsert) |
| `GET` | `/api/backlog-evolution/:sprintId` | Récupérer l'évolution backlog |
| `PUT` | `/api/backlog-evolution/:sprintId` | Mettre à jour l'évolution backlog |
| `DELETE` | `/api/backlog-evolution/:sprintId` | Supprimer l'évolution backlog |

### 9. 🔜 Prochaines Étapes — `/api/next-steps`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/next-steps` | Créer les prochaines étapes (upsert) |
| `GET` | `/api/next-steps/:sprintId` | Récupérer les prochaines étapes |
| `PUT` | `/api/next-steps/:sprintId` | Mettre à jour les prochaines étapes |
| `DELETE` | `/api/next-steps/:sprintId` | Supprimer les prochaines étapes |

### 10. 🎨 Styles — `/api/styles`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/styles` | Créer les styles (upsert) |
| `GET` | `/api/styles/:sprintId` | Récupérer les styles |
| `PUT` | `/api/styles/:sprintId` | Mettre à jour les styles |
| `DELETE` | `/api/styles/:sprintId` | Supprimer les styles |

### 11. 📄 Pages — `/api/pages`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/pages` | Créer une page |
| `PUT` | `/api/pages/:sprintId/batch` | Remplacer toutes les pages (batch) |
| `GET` | `/api/pages/:sprintId` | Lister les pages d'un sprint |
| `GET` | `/api/pages/:sprintId/:pageId` | Récupérer une page |
| `PUT` | `/api/pages/:sprintId/:pageId` | Mettre à jour une page |
| `DELETE` | `/api/pages/:sprintId/:pageId` | Supprimer une page |

### 12. 📎 Pièces jointes — `/api/attachments`

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/attachments/upload` | Upload un fichier (multipart/form-data, max 50 MB) |
| `GET` | `/api/attachments/sprint/:sprintId` | Lister les pièces jointes d'un sprint |
| `GET` | `/api/attachments/sprint/:sprintId?category=demo` | Filtrer par catégorie |
| `GET` | `/api/attachments/:id` | Détails + URL pré-signée |
| `GET` | `/api/attachments/:id/download` | Télécharger le fichier |
| `DELETE` | `/api/attachments/:id` | Supprimer une pièce jointe |
| `DELETE` | `/api/attachments/sprint/:sprintId` | Supprimer toutes les PJ d'un sprint |

**Catégories de pièces jointes :** `demo` · `metrics` · `backlog` · `realizations` · `general`

### Récapitulatif des endpoints

| Méthode | Nombre |
|---------|--------|
| **POST** | 14 |
| **GET** | 22 |
| **PUT** | 11 |
| **DELETE** | 12 |
| **Total** | **53** |

---

## 🗄 Base de données MongoDB

> **Base :** `sprint-review`
> **12 collections** — Chaque collection a `timestamps: true` (champs `createdAt` / `updatedAt` automatiques)

### Vue d'ensemble des collections

```
sprint-review (database)
│
├── sprints               1 doc / sprint     → Info de base (nom, dates, goal)
├── teams                 N docs / sprint    → Équipes et membres
├── objectives            1 doc / sprint     → Objectifs, critères, DoD
├── backlogs              1 doc / sprint     → Enablers, US, tâches tech
├── realizations          1 doc / sprint     → Feature cards, items différés
├── demo_configs          1 doc / sprint     → Config démo, étapes
├── metrics               1 doc / sprint     → KPIs, burndown, vélocité
├── backlog_evolution     1 doc / sprint     → Santé backlog, épiques
├── next_steps            1 doc / sprint     → Candidats, décisions, risques
├── styles                1 doc / sprint     → Polices, couleurs, tailles
├── pages                 N docs / sprint    → Config pages/slides
└── attachments           N docs / sprint    → Métadonnées fichiers (MinIO)
```

### Stratégie d'indexation

| Collection | Index unique | Autres index | Cardinalité |
|------------|-------------|--------------|-------------|
| `sprints` | `sprintId` | `number` | 1 par sprint |
| `teams` | `{ sprintId, teamId }` | `sprintId` | N par sprint |
| `objectives` | `sprintId` | — | 1 par sprint |
| `backlogs` | `sprintId` | — | 1 par sprint |
| `realizations` | `sprintId` | — | 1 par sprint |
| `demo_configs` | `sprintId` | — | 1 par sprint |
| `metrics` | `sprintId` | — | 1 par sprint |
| `backlog_evolution` | `sprintId` | — | 1 par sprint |
| `next_steps` | `sprintId` | — | 1 par sprint |
| `styles` | `sprintId` | — | 1 par sprint |
| `pages` | `{ sprintId, pageId }` | `sprintId` | N par sprint |
| `attachments` | — | `sprintId`, `{ sprintId, category }` | N par sprint |

### Détail des collections

#### 1. `sprints`

```json
{
  "sprintId": "sprint-default",       // string, unique
  "name": "Projet Alpha",             // string, required
  "number": 24,                        // number, required, indexed
  "goal": "Refonte UX Mobile",        // string, default ''
  "startDate": "2026-01-12",          // string, default ''
  "endDate": "2026-01-23",            // string, default ''
  "createdAt": "2026-01-12T...",
  "updatedAt": "2026-01-12T..."
}
```

#### 2. `teams`

```json
{
  "sprintId": "sprint-default",        // string, required
  "teamId": "squad-alpha",             // string, required
  "name": "Squad Alpha",               // string, required
  "members": [                          // embedded array
    {
      "id": "AM",
      "name": "Alice Martin",
      "role": "Product Owner",
      "initials": "AM",
      "color": "#3B82F6",
      "avatar": ""
    }
  ]
}
```

#### 3. `objectives`

```json
{
  "sprintId": "sprint-default",        // unique
  "objectives": [
    {
      "id": "1",
      "title": "Finaliser l'Épique...",
      "description": "...",
      "priority": "Priorité Haute",
      "scope": "Checkout & Paiement",
      "epicLink": "EPIC-42",
      "borderColor": "border-blue-600"
    }
  ],
  "successCriteria": [
    { "id": "1", "text": "Taux de conversion > 2.5%" }
  ],
  "constraints": [
    { "id": "1", "text": "Dépendance API Paiement" }
  ],
  "dodItems": [
    { "id": "1", "text": "Code Review" }
  ]
}
```

#### 4. `backlogs`

```json
{
  "sprintId": "sprint-default",        // unique
  "enablers": [
    {
      "id": "1",
      "epicId": "EPIC-42",
      "name": "Checkout & Paiement",
      "bgColor": "bg-blue-50",
      "textColor": "text-blue-800",
      "iconColor": "text-blue-500",
      "stories": [
        {
          "id": "1",
          "storyId": "US-101",
          "title": "Paiement One-Click Mobile",
          "points": 8,
          "asA": "client mobile connecté",
          "iWant": "payer ma commande en un seul clic",
          "soThat": "gagner du temps",
          "ac": "Bouton visible si CB enregistrée..."
        }
      ]
    }
  ],
  "techTasks": [
    {
      "id": "1",
      "taskId": "TECH-45",
      "title": "Upgrade React Native 0.72",
      "points": 3,
      "type": "tech"                    // enum: 'tech' | 'bug'
    }
  ]
}
```

#### 5. `realizations`

```json
{
  "sprintId": "sprint-default",        // unique
  "featureCards": [
    {
      "id": "1", "storyId": "US-101", "title": "...",
      "description": "...", "status": "deployed",
      "impact": "Checkout -30s", "prLink": "PR #452",
      "assignees": ["LD", "SM"]
    }
  ],
  "smallCards": [
    { "id": "1", "type": "Tech Debt", "title": "...", "description": "...", "status": "done" }
  ],
  "deferredItems": [
    { "id": "1", "storyId": "US-103", "title": "...", "reason": "Dépendance data non livrée." }
  ],
  "teamNote": "La mise en place de WebP a nécessité plus de tests...",
  "valueMetrics": [
    { "id": "1", "label": "Conv. Mobile", "value": "+12%", "subText": "(Proj.)",
      "bgColor": "bg-green-50", "borderColor": "border-green-100", "iconColor": "text-green-600", "icon": "fa-shopping-cart" }
  ]
}
```

> **Statuts possibles :** `deployed` · `validated` · `done` · `fixed` · `testing` · `blocked`

#### 6. `demo_configs`

```json
{
  "sprintId": "sprint-default",
  "environment": "Staging (QA)",
  "testAccount": "demo_user_01",
  "version": "v2.4.0-rc.1",
  "demoOwner": "Sarah Martin",
  "demoOwnerInitials": "SM",
  "videoLink": "Voir l'enregistrement complet (.mp4)",
  "figmaLink": "Maquettes Figma",
  "steps": [
    { "id": "1", "stepNumber": 1, "title": "Contexte & Entrée", "description": "...",
      "note": "Données: Panier ID #9822", "featureRef": "", "isActive": true }
  ]
}
```

#### 7. `metrics`

```json
{
  "sprintId": "sprint-default",
  "sprintMetrics": { "plannedPoints": 42, "completedPoints": 41 },
  "kpiCards": [
    { "id": "1", "label": "Vélocité", "value": "41", "unit": "/ 42 pts",
      "badgeText": "98%", "badgeType": "up", "subText": "Réalisé", "borderColor": "border-blue-500" }
  ],
  "burndownIdeal": [42, 37.8, 33.6, 29.4, 25.2, 21, 16.8, 12.6, 8.4, 0],
  "burndownReal": [42, 42, 38, 35, 32, 22, 18, 18, 10, 1],
  "velocityHistory": [
    { "label": "S20", "value": 35 }, { "label": "S21", "value": 38 },
    { "label": "S22", "value": 36 }, { "label": "S23", "value": 40 },
    { "label": "S24", "value": 41 }
  ],
  "insightsGood": [ { "id": "1", "text": "Collaboration dev/QA fluide..." } ],
  "insightsBad": [ { "id": "1", "text": "Code Review en hausse (+15%)..." } ],
  "qualityGate": { "unitTests": 88, "sonarGrade": "A", "e2eTests": 100 }
}
```

> **Badge types :** `up` · `down` · `stable` · `check` · `smile`

#### 8. `backlog_evolution`

```json
{
  "sprintId": "sprint-default",
  "backlogHealth": {
    "totalItems": 127, "readyPercent": 68, "avgAge": "12j",
    "distribution": [ { "label": "To Do", "count": 45, "pct": 35, "color": "bg-blue-500" } ]
  },
  "epicsProgress": [
    { "id": "1", "epicId": "EPIC-42", "name": "Paiement One-Click", "description": "...",
      "pct": 75, "done": 12, "total": 16, "targetSprint": 25,
      "bgColor": "...", "borderColor": "...", "badgeBg": "...", "badgeText": "...",
      "barColor": "...", "targetColor": "...", "pctColor": "..." }
  ],
  "backlogChanges": { "added": 14, "removed": 8, "reprioritized": 5, "reasons": ["..."] },
  "prioritizationMatrix": {
    "quickWins": [ { "id": "1", "storyId": "US-145", "title": "...", "points": 3 } ],
    "majorProjects": [ { "id": "2", "storyId": "US-167", "title": "...", "points": 13 } ],
    "fillIns": [ { "id": "3", "storyId": "BUG-92", "title": "...", "points": 1 } ],
    "timeSinks": [ { "id": "4", "storyId": "TECH-78", "title": "...", "points": 8 } ],
    "insights": ["Focus sur Quick Wins pour sprint #25..."]
  }
}
```

#### 9. `next_steps`

```json
{
  "sprintId": "sprint-default",
  "nextSprintCandidates": [
    { "id": "1", "storyId": "US-104", "title": "Intégration Apple Pay", "description": "...",
      "priority": "high", "points": 8, "type": "us" }
  ],
  "decisions": [
    { "id": "1", "title": "Validation Design System", "description": "...", "icon": "fa-question-circle" }
  ],
  "risks": [ { "id": "1", "text": "Congés équipe : Lead Dev absent 3 jours..." } ],
  "keyDates": [
    { "id": "1", "date": "Aujourd'hui, 16h00", "title": "Clôture Sprint & Retro", "color": "bg-green-500" }
  ],
  "nextSprintDate": "26 Janvier"
}
```

> **Priorités candidats :** `high` · `medium` · `low` · `''`

#### 10. `styles`

```json
{
  "sprintId": "sprint-default",
  "fontFamily": "DM Sans, sans-serif",
  "headingFontFamily": "DM Sans, sans-serif",
  "primaryColor": "#0F52BA",
  "secondaryColor": "#6366F1",
  "accentColor": "#00C48C",
  "backgroundColor": "#F9FAFB",
  "textColor": "#1F2937",
  "fontSize": 14,
  "borderRadius": 8
}
```

#### 11. `pages`

```json
{
  "sprintId": "sprint-default",
  "pageId": "review",
  "title": "Sprint Review",
  "slug": "review",
  "order": 1,
  "visible": true
}
```

#### 12. `attachments`

```json
{
  "sprintId": "sprint-default",
  "originalName": "demo-screenshot.png",
  "fileName": "a1b2c3d4-e5f6.png",
  "mimeType": "image/png",
  "size": 245760,
  "objectKey": "sprint-default/demo/a1b2c3d4-e5f6.png",
  "bucket": "sprint-review-attachments",
  "category": "demo",
  "description": "Capture écran de la démo",
  "uploadedBy": "Jean Dupont"
}
```

> **Catégories :** `demo` · `metrics` · `backlog` · `realizations` · `general`

---

## 🎨 Frontend — Pages & Slides

### Routes

| Route | Composant | Description |
|-------|-----------|-------------|
| `/presentation` | `PresentationPage` | Mode présentation avec navigation entre slides |
| `/admin` | `AdminPage` | Panneau d'administration (10 onglets) |
| `*` | — | Redirige vers `/presentation` |

### Slides de présentation

| # | Slide | Composant | Description |
|---|-------|-----------|-------------|
| 1 | Couverture | `SlideCover` | Nom du sprint, dates, objectif principal |
| 2 | Objectifs | `SlideObjectifs` | Objectifs SMART, critères de succès, contraintes, DoD |
| 3 | Backlog | `SlideBacklog` | Enablers, User Stories groupées par épique |
| 4 | Backlog (détail) | `SlideBacklog2` | Vue détaillée des US et tâches techniques |
| 5 | Réalisations | `SlideRealisations` | Feature cards, small cards, items différés, métriques de valeur |
| 6 | Démo | `SlideDemo` | Étapes de démo, config environnement, liens vidéo/Figma |
| 7 | Métriques | `SlideMetriques` | KPIs, burndown chart, vélocité, quality gates, insights |
| 8 | Évolution Backlog | `SlideBacklogEvolution` | Santé backlog, progression épiques, matrice de priorisation |
| 9 | Prochaines Étapes | `SlideNextSteps` | Candidats sprint suivant, décisions, risques, dates clés |

### Onglets Admin

| # | Onglet | Données gérées | Sauvegarde API |
|---|--------|----------------|----------------|
| 1 | Sprints | Créer / dupliquer / supprimer / basculer entre sprints | `saveSprint()` |
| 2 | Général | Nom, numéro, dates, goal, métriques globales | `saveSprint()` |
| 3 | Objectifs | Objectifs, critères de succès, contraintes, DoD | `saveObjectives()` |
| 4 | Backlog & US | Enablers, User Stories, tâches techniques | `saveBacklog()` |
| 5 | Réalisations | Feature cards, small cards, items différés, note, value metrics | `saveRealizations()` |
| 6 | Démo | Environment, test account, étapes de démo | `saveDemoConfig()` |
| 7 | Métriques | KPIs, burndown, vélocité, insights, quality gates | `saveMetrics()` |
| 8 | Évolution Backlog | Santé, épiques, changements, matrice priorisation | `saveBacklogEvolution()` |
| 9 | Prochaines Étapes | Candidats, décisions, risques, dates clés | `saveNextSteps()` |
| 10 | Présentation | Styles (polices, couleurs), pages visibles | `saveStyles()` + `savePages()` |

---

## 🔗 Connexion Frontend ↔ Backend

### Architecture de synchronisation

```
┌─────────────────────────────────────────────────┐
│                  AdminPage.tsx                   │
│                                                  │
│  [Charger API]  [Sauvegarder Objectifs]  [Tout]  │
│       │                  │                  │    │
│       ▼                  ▼                  ▼    │
│  ┌──────────────────────────────────────────┐    │
│  │          useSprintApi (hook)              │    │
│  │                                          │    │
│  │  loadFromApi()     → GET toutes collections│   │
│  │  saveSprint()      → PUT /sprints/:id     │   │
│  │  saveObjectives()  → PUT /objectives/:id  │   │
│  │  saveBacklog()     → PUT /backlog/:id     │   │
│  │  saveRealizations()→ PUT /realizations/:id│   │
│  │  saveDemoConfig()  → PUT /demo-configs/:id│   │
│  │  saveMetrics()     → PUT /metrics/:id     │   │
│  │  saveBacklogEvol() → PUT /backlog-evol/:id│   │
│  │  saveNextSteps()   → PUT /next-steps/:id  │   │
│  │  saveStyles()      → PUT /styles/:id      │   │
│  │  savePages()       → PUT /pages/:id/batch │   │
│  │  saveAll()         → tous en parallèle    │   │
│  └───────────┬──────────────────────┬───────┘    │
│              │                      │            │
│              ▼                      ▼            │
│  ┌──────────────────┐  ┌────────────────────┐    │
│  │  api.ts           │  │  mappers.ts         │   │
│  │  (Client HTTP)    │  │  (API ↔ SprintState)│   │
│  └──────────────────┘  └────────────────────┘    │
└──────────────────────────────────────────────────┘
```

### Fichiers de liaison

| Fichier | Rôle |
|---------|------|
| `src/services/api.ts` | Client HTTP — 12 objets API (`sprintApi`, `objectivesApi`, etc.) + `loadFullSprint()` |
| `src/services/mappers.ts` | Transformateurs bidirectionnels : `apiToSprintState()` + 10 fonctions `sprintStateTo*Payload()` |
| `src/hooks/useSprintApi.ts` | Hook React — `loadFromApi()`, 10 `save*()`, `saveAll()`, système de `saveStates` |

### Boutons dans le header Admin

| Bouton | Action | Couleur |
|--------|--------|---------|
| **Charger API** | Charge toutes les données depuis MongoDB → Context React | 🟢 Vert |
| **[Section active]** | Sauvegarde uniquement la section en cours (dynamique) | 🔵 Bleu |
| **Tout sauvegarder** | Sauvegarde les 10 collections en parallèle | 🟣 Indigo |

### Chargement automatique depuis MongoDB

Au montage de l'application, le `SprintProvider` charge automatiquement les données depuis l'API MongoDB :

```
Montage React → useEffect → loadFullSprint('sprint-default')
                              → 11 GET en parallèle
                              → apiToSprintState()
                              → dispatch(LOAD_API_STATE)
                              → State React mis à jour
```

> **Note :** Les modifications faites directement en base (via Mongo Express) nécessitent un **rechargement de page** (`F5`) ou un clic sur **"Charger API"** pour être reflétées dans le frontend.

### Indicateurs de statut

Chaque bouton de sauvegarde affiche un état visuel :
- ⚪ **idle** — Prêt à sauvegarder
- 🟡 **saving** — Envoi en cours (animation pulse)
- 🟢 **success** — Sauvegardé (auto-reset après 3s)
- 🔴 **error** — Erreur (avec message dans le tooltip)

---

## 🌱 Script de Seed

Le script `seed.ts` insère les données complètes du **Sprint #24** dans les 11 collections MongoDB via l'API REST.

### Exécution

```bash
cd sprint-review-backend
yarn seed
```

### Données insérées

| Collection | Données |
|------------|---------|
| `sprints` | Sprint #24 "Projet Alpha" — Refonte UX Mobile (12-23 Jan 2026) |
| `teams` | Squad Alpha — 6 membres (PO, SM, QA Lead, Dev Front, Dev Back, Designer UX) |
| `objectives` | 3 objectifs + 3 critères de succès + 2 contraintes + 4 DoD |
| `backlogs` | 3 enablers (3 US) + 2 tâches techniques |
| `realizations` | 3 feature cards + 4 small cards + 1 item différé + 2 value metrics |
| `demo_configs` | Config staging + 4 étapes de démo |
| `metrics` | 4 KPIs + burndown 10 jours + 5 sprints vélocité + 3+3 insights + quality gate |
| `backlog_evolution` | Santé backlog (127 items) + 3 épiques + changements + matrice 4 quadrants |
| `next_steps` | 4 candidats + 2 décisions + 2 risques + 3 dates clés |
| `styles` | DM Sans, #0F52BA, #6366F1, #00C48C |
| `pages` | 3 pages (Accueil, Sprint Review, Présentation) |

---

## 📮 Collection Postman

Le fichier `postman/Sprint_Review_API.postman_collection.json` contient **53 requêtes** organisées en **12 dossiers** avec des payloads d'exemple.

### Import

1. Ouvrir Postman
2. **Import** → Sélectionner `sprint-review-backend/postman/Sprint_Review_API.postman_collection.json`
3. Les variables `{{baseUrl}}` et `{{sprintId}}` sont pré-configurées

### Variables

| Variable | Valeur par défaut |
|----------|-------------------|
| `baseUrl` | `http://localhost:3001/api` |
| `sprintId` | `sprint-default` |
| `attachmentId` | `REMPLACER_PAR_ID_MONGODB` |

---

## ⚙️ Variables d'environnement

### Backend (`.env`)

```env
# Connexion MongoDB (avec authentification Docker)
MONGODB_URI=mongodb://admin:admin123@localhost:27017/sprint-review?authSource=admin

# Port du serveur
PORT=3001

# Origine CORS autorisée (frontend)
CORS_ORIGIN=http://localhost:5173

# MinIO S3
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin123
MINIO_BUCKET=sprint-review-attachments
```

### Frontend (`.env`)

```env
# URL du backend NestJS
VITE_API_URL=http://localhost:3001/api
```

---

## 📝 Licence

MIT

---

<p align="center">
  Fait avec ❤️ pour les équipes Agile
</p>
