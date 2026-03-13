import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// ─── Modules métier ───
import { SprintsModule } from './modules/sprints/sprints.module';
import { TeamsModule } from './modules/teams/teams.module';
import { ObjectivesModule } from './modules/objectives/objectives.module';
import { BacklogModule } from './modules/backlog/backlog.module';
import { RealizationsModule } from './modules/realizations/realizations.module';
import { DemoConfigsModule } from './modules/demo-configs/demo-configs.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { BacklogEvolutionModule } from './modules/backlog-evolution/backlog-evolution.module';
import { NextStepsModule } from './modules/next-steps/next-steps.module';
import { StylesModule } from './modules/styles/styles.module';
import { PagesModule } from './modules/pages/pages.module';

// ─── MinIO & Pièces jointes ───
import { MinioModule } from './modules/minio/minio.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';

@Module({
  imports: [
    // ─── Configuration ───
    ConfigModule.forRoot({ isGlobal: true }),

    // ─── MongoDB ───
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/sprint-review'),

    // ─── Modules métier (1 module = 1 collection = 1 catégorie) ───
    SprintsModule,
    TeamsModule,
    ObjectivesModule,
    BacklogModule,
    RealizationsModule,
    DemoConfigsModule,
    MetricsModule,
    BacklogEvolutionModule,
    NextStepsModule,
    StylesModule,
    PagesModule,

    // ─── MinIO & Pièces jointes ───
    MinioModule,
    AttachmentsModule,
  ],
})
export class AppModule {}
