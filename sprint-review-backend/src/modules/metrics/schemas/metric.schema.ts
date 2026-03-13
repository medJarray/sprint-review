// ─── Module 7 : METRICS ───
// Collection: metrics — KPIs, burndown, vélocité, quality gates, insights (positifs/négatifs)

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class KpiCard {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) label: string;
  @Prop({ required: true }) value: string;
  @Prop({ default: '' }) unit: string;
  @Prop({ default: '' }) badgeText: string;
  @Prop({ enum: ['up', 'down', 'stable', 'check', 'smile'], default: 'stable' }) badgeType: string;
  @Prop({ default: '' }) subText: string;
  @Prop({ default: '' }) borderColor: string;
}
export const KpiCardSchema = SchemaFactory.createForClass(KpiCard);

@Schema({ _id: false })
export class VelocityEntry {
  @Prop({ required: true }) label: string;
  @Prop({ required: true }) value: number;
}
export const VelocityEntrySchema = SchemaFactory.createForClass(VelocityEntry);

@Schema({ _id: false })
export class InsightItem {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) text: string;
}
export const InsightItemSchema = SchemaFactory.createForClass(InsightItem);

@Schema({ _id: false })
export class QualityGate {
  @Prop({ default: 0 }) unitTests: number;
  @Prop({ default: '' }) sonarGrade: string;
  @Prop({ default: 0 }) e2eTests: number;
}
export const QualityGateSchema = SchemaFactory.createForClass(QualityGate);

@Schema({ _id: false })
export class SprintMetricsBase {
  @Prop({ default: 0 }) plannedPoints: number;
  @Prop({ default: 0 }) completedPoints: number;
}
export const SprintMetricsBaseSchema = SchemaFactory.createForClass(SprintMetricsBase);

@Schema({ timestamps: true, collection: 'metrics' })
export class Metric extends Document {
  @ApiProperty({ description: 'Référence au sprint' })
  @Prop({ required: true, index: true, unique: true })
  sprintId: string;

  @ApiProperty({ description: 'Métriques de base (points planifiés/complétés)' })
  @Prop({ type: SprintMetricsBaseSchema, default: {} })
  sprintMetrics: SprintMetricsBase;

  @ApiProperty({ description: 'Cartes KPI' })
  @Prop({ type: [KpiCardSchema], default: [] })
  kpiCards: KpiCard[];

  @ApiProperty({ description: 'Données burndown idéales (tableau de nombres)' })
  @Prop({ type: [Number], default: [] })
  burndownIdeal: number[];

  @ApiProperty({ description: 'Données burndown réelles' })
  @Prop({ type: [Number], default: [] })
  burndownReal: number[];

  @ApiProperty({ description: 'Historique de vélocité' })
  @Prop({ type: [VelocityEntrySchema], default: [] })
  velocityHistory: VelocityEntry[];

  @ApiProperty({ description: 'Points positifs (rétro/insights)' })
  @Prop({ type: [InsightItemSchema], default: [] })
  insightsGood: InsightItem[];

  @ApiProperty({ description: 'Points négatifs' })
  @Prop({ type: [InsightItemSchema], default: [] })
  insightsBad: InsightItem[];

  @ApiProperty({ description: 'Quality Gates' })
  @Prop({ type: QualityGateSchema, default: {} })
  qualityGate: QualityGate;
}

export const MetricSchema = SchemaFactory.createForClass(Metric);
