const BASE_URL = process.env.API_URL || 'http://localhost:3001/api';
const SPRINT_ID = 'sprint-default';
async function post(path, data) {
    const url = `${BASE_URL}${path}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const body = await res.text();
        console.error(`  ❌ POST ${path} → ${res.status}: ${body}`);
    }
    else {
        console.log(`  ✅ POST ${path}`);
    }
}
async function put(path, data) {
    const url = `${BASE_URL}${path}`;
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const body = await res.text();
        console.error(`  ❌ PUT ${path} → ${res.status}: ${body}`);
    }
    else {
        console.log(`  ✅ PUT ${path}`);
    }
}
async function seedSprint() {
    console.log('\n🏃 1/11 — Sprint...');
    await post('/sprints', {
        sprintId: SPRINT_ID,
        name: 'Projet Alpha',
        number: 24,
        goal: 'Refonte UX Mobile',
        startDate: '2026-01-12',
        endDate: '2026-01-23',
    });
}
async function seedTeams() {
    console.log('\n👥 2/11 — Teams...');
    await post('/teams', {
        sprintId: SPRINT_ID,
        teamId: 'squad-alpha',
        name: 'Squad Alpha',
        members: [
            { id: 'AM', name: 'Alice Martin', role: 'Product Owner', initials: 'AM', color: '#3B82F6' },
            { id: 'LD', name: 'Lucas Dubois', role: 'Scrum Master', initials: 'LD', color: '#6366F1' },
            { id: 'SM', name: 'Sarah Martin', role: 'QA Lead', initials: 'SM', color: '#8B5CF6' },
            { id: 'TR', name: 'Thomas Roux', role: 'Dev Frontend', initials: 'TR', color: '#EF4444' },
            { id: 'JB', name: 'Julie Bernard', role: 'Dev Backend', initials: 'JB', color: '#F59E0B' },
            { id: 'NP', name: 'Nicolas Petit', role: 'Designer UX', initials: 'NP', color: '#10B981' },
        ],
    });
}
async function seedObjectives() {
    console.log('\n🎯 3/11 — Objectives...');
    await put(`/objectives/${SPRINT_ID}`, {
        objectives: [
            {
                id: '1',
                title: 'Finaliser l\'Épique "Paiement One-Click"',
                description: 'Implémenter le flux complet de paiement simplifié pour les utilisateurs connectés afin d\'augmenter le taux de conversion mobile de 15%.',
                priority: 'Priorité Haute',
                scope: 'Checkout & Paiement',
                epicLink: 'EPIC-42',
                borderColor: 'border-blue-600',
            },
            {
                id: '2',
                title: 'Optimisation des Performances',
                description: 'Réduire le temps de chargement de la page d\'accueil mobile de 20% (cible < 1.5s) via la compression des assets et le lazy-loading.',
                priority: 'Priorité Moyenne',
                scope: 'Core Performance',
                borderColor: 'border-indigo-500',
            },
            {
                id: '3',
                title: 'Analytics V2 & Tracking',
                description: 'Mettre à jour le plan de marquage pour capturer les abandons de panier avec la nouvelle granularité requise par la BI.',
                priority: 'Tech Enabler',
                scope: 'Data Analytics',
                borderColor: 'border-teal-500',
            },
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
    });
}
async function seedBacklog() {
    console.log('\n📋 4/11 — Backlog...');
    await put(`/backlog/${SPRINT_ID}`, {
        enablers: [
            {
                id: '1',
                epicId: 'EPIC-42',
                name: 'Checkout & Paiement',
                bgColor: 'bg-blue-50',
                textColor: 'text-blue-800',
                iconColor: 'text-blue-500',
                stories: [
                    {
                        id: 'US-101',
                        storyId: 'US-101',
                        title: 'Paiement One-Click Mobile',
                        points: 8,
                        asA: 'client mobile connecté',
                        iWant: 'payer ma commande en un seul clic',
                        soThat: 'gagner du temps lors de mes achats récurrents',
                        ac: 'Bouton visible uniquement si CB enregistrée • Confirmation biométrique • Redirection page succès < 2s.',
                    },
                ],
            },
            {
                id: '2',
                epicId: 'EPIC-38',
                name: 'Core Performance',
                bgColor: 'bg-indigo-50',
                textColor: 'text-indigo-800',
                iconColor: 'text-indigo-500',
                stories: [
                    {
                        id: 'US-102',
                        storyId: 'US-102',
                        title: 'Optimisation Assets Home',
                        points: 5,
                        asA: 'visiteur mobile',
                        iWant: "que la page d'accueil s'affiche instantanément",
                        soThat: 'ne pas être frustré par le temps de chargement',
                        ac: 'Images converties en WebP • Lazy loading activé • Time to Interactive < 1.5s.',
                    },
                ],
            },
            {
                id: '3',
                epicId: 'EPIC-55',
                name: 'Data Analytics',
                bgColor: 'bg-teal-50',
                textColor: 'text-teal-800',
                iconColor: 'text-teal-500',
                stories: [
                    {
                        id: 'US-103',
                        storyId: 'US-103',
                        title: 'Tracking Abandons Panier',
                        points: 3,
                        asA: 'Product Owner',
                        iWant: "des données précises sur l'étape d'abandon",
                        soThat: 'comprendre les points de friction',
                    },
                ],
            },
        ],
        techTasks: [
            { id: 'TECH-45', taskId: 'TECH-45', title: 'Upgrade React Native 0.72', points: 3, type: 'tech' },
            { id: 'BUG-89', taskId: 'BUG-89', title: 'Fix Login Spinner iOS', points: 2, type: 'bug' },
        ],
    });
}
async function seedRealizations() {
    console.log('\n🎁 5/11 — Realizations...');
    await put(`/realizations/${SPRINT_ID}`, {
        featureCards: [
            {
                id: '1',
                storyId: 'US-101',
                title: 'Paiement One-Click Mobile',
                description: 'Implémentation complète du flux de paiement simplifié pour les utilisateurs connectés. Intégration biométrique (FaceID/TouchID) pour validation rapide.',
                status: 'deployed',
                impact: 'Impact : Checkout -30s',
                prLink: 'PR #452 Merged',
                assignees: ['LD', 'SM'],
            },
            {
                id: '2',
                storyId: 'US-102',
                title: 'Optimisation Assets Home',
                description: "Migration de tous les assets image vers WebP et mise en place du lazy-loading natif. Réduction drastique du poids de la page d'accueil.",
                status: 'validated',
                impact: 'TTI < 1.5s',
                prLink: 'Doc Tech Mise à jour',
                assignees: ['TR'],
            },
            {
                id: '3',
                storyId: 'TECH-45',
                title: 'Upgrade React Native 0.72',
                description: 'Mise à jour du framework avec migration des APIs dépréciées. Tests de non-régression en cours sur les fonctionnalités critiques.',
                status: 'testing',
                impact: '80% des tests passés',
                prLink: 'PR #467 Open',
                assignees: ['AM'],
            },
        ],
        smallCards: [
            { id: 's1', type: 'Tech Debt', title: 'Refactor API Client', description: "Standardisation des retours d'erreur", status: 'done' },
            { id: 's2', type: 'Fix Bug', title: 'Login Spinner iOS', description: 'Correction boucle infinie iPhone 14', status: 'fixed' },
            { id: 's3', type: 'Fix Bug', title: 'Crash WebView Android', description: 'Reproductible sur Android 12. Attente fix upstream.', status: 'blocked' },
            { id: 's4', type: 'Amélioration', title: 'Cache API Produits', description: 'Réduction des appels réseau de 40%', status: 'testing' },
        ],
        deferredItems: [
            { id: '1', storyId: 'US-103', title: 'Tracking Abandons Panier', reason: 'Dépendance data non livrée.' },
        ],
        teamNote: 'La mise en place de WebP a nécessité plus de tests QA que prévu sur Safari iOS.',
        valueMetrics: [
            { id: '1', label: 'Conv. Mobile', value: '+12%', subText: '(Proj.)', bgColor: 'bg-green-50', borderColor: 'border-green-100', iconColor: 'text-green-600', icon: 'fa-shopping-cart' },
            { id: '2', label: 'Lighthouse', value: '92', subText: '/ 100', bgColor: 'bg-blue-50', borderColor: 'border-blue-100', iconColor: 'text-blue-600', icon: 'fa-tachometer-alt' },
        ],
    });
}
async function seedDemoConfig() {
    console.log('\n🖥️  6/11 — Demo Config...');
    await put(`/demo-configs/${SPRINT_ID}`, {
        environment: 'Staging (QA)',
        testAccount: 'demo_user_01',
        version: 'v2.4.0-rc.1',
        demoOwner: 'Sarah Martin',
        demoOwnerInitials: 'SM',
        videoLink: "Voir l'enregistrement complet (.mp4)",
        figmaLink: 'Maquettes Figma',
        steps: [
            { id: '1', stepNumber: 1, title: 'Contexte & Entrée', description: "L'utilisateur se connecte sur l'app mobile. Le panier contient déjà 2 articles.", note: 'Données: Panier ID #9822', isActive: true },
            { id: '2', stepNumber: 2, title: 'Action: Checkout One-Click', description: 'Clic sur "Payer maintenant". Le système détecte la carte enregistrée et demande la biométrie.', featureRef: 'Feature US-101', isActive: true },
            { id: '3', stepNumber: 3, title: 'Résultat Attendu', description: 'Validation immédiate sans saisie CVV. Redirection vers la page de confirmation en moins de 2s.', isActive: false },
            { id: '4', stepNumber: 4, title: 'Cas Limites (Optionnel)', description: "Simulation erreur réseau (Mode Avion) lors du paiement pour vérifier le message d'erreur.", isActive: false },
        ],
    });
}
async function seedMetrics() {
    console.log('\n📊 7/11 — Metrics...');
    await put(`/metrics/${SPRINT_ID}`, {
        sprintMetrics: {
            plannedPoints: 42,
            completedPoints: 41,
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
            { id: '2', text: "L'environnement de staging a été instable le jour 4." },
            { id: '3', text: 'Dette technique : couverture de tests JS à renforcer.' },
        ],
        qualityGate: {
            unitTests: 88,
            sonarGrade: 'A',
            e2eTests: 100,
        },
    });
}
async function seedBacklogEvolution() {
    console.log('\n📈 8/11 — Backlog Evolution...');
    await put(`/backlog-evolution/${SPRINT_ID}`, {
        backlogHealth: {
            totalItems: 127,
            readyPercent: 68,
            avgAge: '12j',
            distribution: [
                { label: 'To Do', count: 45, pct: 35, color: 'bg-blue-500' },
                { label: 'In Refinement', count: 38, pct: 30, color: 'bg-yellow-500' },
                { label: 'Ready', count: 44, pct: 35, color: 'bg-green-500' },
            ],
        },
        epicsProgress: [
            {
                id: 'EPIC-42', epicId: 'EPIC-42', name: 'Paiement One-Click',
                description: 'Simplification du parcours de paiement mobile',
                pct: 75, done: 12, total: 16, targetSprint: 25,
                bgColor: 'bg-purple-50', borderColor: 'border-purple-100',
                badgeBg: 'bg-purple-200', badgeText: 'text-purple-900',
                barColor: 'bg-purple-600', targetColor: 'text-purple-700', pctColor: 'text-purple-900',
            },
            {
                id: 'EPIC-38', epicId: 'EPIC-38', name: 'Performance Mobile',
                description: 'Optimisation vitesse de chargement & UX',
                pct: 45, done: 5, total: 11, targetSprint: 26,
                bgColor: 'bg-blue-50', borderColor: 'border-blue-100',
                badgeBg: 'bg-blue-200', badgeText: 'text-blue-900',
                barColor: 'bg-blue-600', targetColor: 'text-blue-700', pctColor: 'text-blue-900',
            },
            {
                id: 'EPIC-51', epicId: 'EPIC-51', name: 'Analytics V2',
                description: 'Nouveau plan de marquage & dashboards',
                pct: 20, done: 2, total: 10, targetSprint: 27,
                bgColor: 'bg-teal-50', borderColor: 'border-teal-100',
                badgeBg: 'bg-teal-200', badgeText: 'text-teal-900',
                barColor: 'bg-teal-600', targetColor: 'text-teal-700', pctColor: 'text-teal-900',
            },
        ],
        backlogChanges: {
            added: 14,
            removed: 8,
            reprioritized: 5,
            reasons: [
                'Nouveaux besoins business identifiés (8 items)',
                'Items obsolètes supprimés (5 items)',
                'Ajustement priorités business (5 items)',
            ],
        },
        prioritizationMatrix: {
            quickWins: [
                { id: 'US-145', storyId: 'US-145', title: 'Filtres recherche avancée', points: 3 },
                { id: 'US-156', storyId: 'US-156', title: 'Export historique CSV', points: 2 },
            ],
            majorProjects: [
                { id: 'US-167', storyId: 'US-167', title: 'Recommandations IA', points: 13 },
            ],
            fillIns: [
                { id: 'BUG-92', storyId: 'BUG-92', title: 'Fix tooltip IE11', points: 1 },
            ],
            timeSinks: [
                { id: 'TECH-78', storyId: 'TECH-78', title: 'Migration DB legacy', points: 8 },
            ],
            insights: [
                'Focus sur Quick Wins pour sprint #25 (ROI rapide)',
                'US-167 (IA) nécessite décomposition avant planning',
                'Migration DB reportée à Q2 (faible priorité business)',
            ],
        },
    });
}
async function seedNextSteps() {
    console.log('\n🔜 9/11 — Next Steps...');
    await put(`/next-steps/${SPRINT_ID}`, {
        nextSprintCandidates: [
            { id: '1', storyId: 'US-104', title: 'Intégration Apple Pay', description: 'Permettre le paiement natif iOS sans redirection', priority: 'high', points: 8, type: 'us' },
            { id: '2', storyId: 'US-105', title: 'Dashboard Analytics V2', description: 'Ajout des métriques de rétention par cohorte', priority: 'medium', points: 5, type: 'us' },
            { id: '3', storyId: 'SPIKE', title: 'Étude Migration Cloud', description: 'POC sur AWS Lambda pour le traitement image', priority: '', points: 3, type: 'spike' },
            { id: '4', storyId: 'US-108', title: 'Mode Sombre (Dark Mode)', description: 'Adaptation de la charte graphique mobile', priority: 'low', points: 5, type: 'us' },
        ],
        decisions: [
            { id: '1', title: 'Validation Design System', description: "Besoin du GO de l'équipe UX pour les nouveaux composants \"Cards\".", icon: 'fa-question-circle' },
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
    });
}
async function seedStyles() {
    console.log('\n🎨 10/11 — Styles...');
    await put(`/styles/${SPRINT_ID}`, {
        fontFamily: 'DM Sans, sans-serif',
        headingFontFamily: 'DM Sans, sans-serif',
        primaryColor: '#0F52BA',
        secondaryColor: '#6366F1',
        accentColor: '#00C48C',
        backgroundColor: '#F9FAFB',
        textColor: '#1F2937',
        fontSize: 14,
        borderRadius: 8,
    });
}
async function seedPages() {
    console.log('\n📄 11/11 — Pages...');
    const pages = [
        { pageId: 'home', title: 'Accueil', slug: '', order: 0, visible: true },
        { pageId: 'review', title: 'Sprint Review', slug: 'review', order: 1, visible: true },
        { pageId: 'presentation', title: 'Présentation', slug: 'presentation', order: 2, visible: true },
    ];
    await put(`/pages/${SPRINT_ID}/batch`, { pages });
}
async function main() {
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║   🌱 Seed Sprint Review #24 — Données Complètes    ║');
    console.log('╚══════════════════════════════════════════════════════╝');
    console.log(`\n🔗 API: ${BASE_URL}`);
    console.log(`🆔 Sprint ID: ${SPRINT_ID}\n`);
    try {
        await seedSprint();
        await seedTeams();
        await seedObjectives();
        await seedBacklog();
        await seedRealizations();
        await seedDemoConfig();
        await seedMetrics();
        await seedBacklogEvolution();
        await seedNextSteps();
        await seedStyles();
        await seedPages();
        console.log('\n╔══════════════════════════════════════════════════════╗');
        console.log('║   ✅ Seed terminé avec succès !                      ║');
        console.log('║   📊 11 collections peuplées pour Sprint #24         ║');
        console.log('╚══════════════════════════════════════════════════════╝\n');
    }
    catch (error) {
        console.error('\n❌ Erreur lors du seed:', error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=seed.js.map