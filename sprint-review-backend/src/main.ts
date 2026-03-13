import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ─── Préfixe global API ───
  app.setGlobalPrefix('api');

  // ─── Validation globale ───
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ─── CORS ───
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ─── Swagger / OpenAPI ───
  const config = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Sprint Review API lancée sur http://localhost:${port}`);
  console.log(`📖 Documentation Swagger : http://localhost:${port}/api/docs`);
}
bootstrap();
