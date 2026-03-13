"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: false,
        forbidNonWhitelisted: false,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Sprint Review API')
        .setDescription('API REST pour la gestion complète des Sprint Reviews — Collections séparées par catégorie')
        .setVersion('1.0')
        .addTag('sprints', 'Informations de base du sprint')
        .addTag('teams', 'Équipes et membres')
        .addTag('objectives', 'Objectifs, critères de succès, contraintes, DoD')
        .addTag('backlog', 'Enablers, User Stories, tâches techniques')
        .addTag('realizations', 'Réalisations, feature cards, items différés')
        .addTag('demo-configs', 'Configuration et étapes de démo')
        .addTag('metrics', 'KPIs, burndown, vélocité, quality gates')
        .addTag('backlog-evolution', 'Santé backlog, progression épiques, matrice')
        .addTag('next-steps', 'Candidats prochain sprint, décisions, risques')
        .addTag('styles', 'Styles globaux (polices, couleurs)')
        .addTag('pages', 'Configuration des pages/slides')
        .addTag('attachments', 'Pièces jointes stockées dans MinIO S3')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 Sprint Review API lancée sur http://localhost:${port}`);
    console.log(`📖 Documentation Swagger : http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map