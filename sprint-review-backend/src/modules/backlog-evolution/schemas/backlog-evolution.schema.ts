// ─── Module 8 : BACKLOG EVOLUTION ───
// Collection: backlog_evolution — Santé backlog, progression épiques, changements, matrice priorisation

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// ─── Sous-schemas ───

@Schema({ _id: false })
export class DistributionItem {
  @Prop({ required: true }) label: string;
  @Prop({ default: 0 }) count: number;
  @Prop({ default: 0 }) pct: number;
  @Prop({ default: '' }) color: string;
}
export const DistributionItemSchema = SchemaFactory.createForClass(DistributionItem);

@Schema({ _id: false })
export class BacklogHealthData {
  @Prop({ default: 0 }) totalItems: number;
  @Prop({ default: 0 }) readyPercent: number;
  @Prop({ default: '' }) avgAge: string;
  @Prop({ type: [DistributionItemSchema], default: [] }) distribution: DistributionItem[];
}
export const BacklogHealthDataSchema = SchemaFactory.createForClass(BacklogHealthData);

@Schema({ _id: false })
export class EpicProgress {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) epicId: string;
  @Prop({ required: true }) name: string;
  @Prop({ default: '' }) description: string;
  @Prop({ default: 0 }) pct: number;
  @Prop({ default: 0 }) done: number;
  @Prop({ default: 0 }) total: number;
  @Prop({ default: 0 }) targetSprint: number;
  @Prop({ default: '' }) bgColor: string;
  @Prop({ default: '' }) borderColor: string;
  @Prop({ default: '' }) badgeBg: string;
  @Prop({ default: '' }) badgeText: string;
  @Prop({ default: '' }) barColor: string;
  @Prop({ default: '' }) targetColor: string;
  @Prop({ default: '' }) pctColor: string;
}
export const EpicProgressSchema = SchemaFactory.createForClass(EpicProgress);

@Schema({ _id: false })
export class BacklogChange {
  @Prop({ default: 0 }) added: number;
  @Prop({ default: 0 }) removed: number;
  @Prop({ default: 0 }) reprioritized: number;
  @Prop({ type: [String], default: [] }) reasons: string[];
}
export const BacklogChangeSchema = SchemaFactory.createForClass(BacklogChange);

@Schema({ _id: false })
export class MatrixItem {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) storyId: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: 0 }) points: number;
}
export const MatrixItemSchema = SchemaFactory.createForClass(MatrixItem);

@Schema({ _id: false })
export class PrioritizationMatrix {
  @Prop({ type: [MatrixItemSchema], default: [] }) quickWins: MatrixItem[];
  @Prop({ type: [MatrixItemSchema], default: [] }) majorProjects: MatrixItem[];
  @Prop({ type: [MatrixItemSchema], default: [] }) fillIns: MatrixItem[];
  @Prop({ type: [MatrixItemSchema], default: [] }) timeSinks: MatrixItem[];
  @Prop({ type: [String], default: [] }) insights: string[];
}
export const PrioritizationMatrixSchema = SchemaFactory.createForClass(PrioritizationMatrix);

// ─── Document principal ───

@Schema({ timestamps: true, collection: 'backlog_evolution' })
export class BacklogEvolution extends Document {
  @ApiProperty({ description: 'Référence au sprint' })
  @Prop({ required: true, index: true, unique: true })
  sprintId: string;

  @Prop({ type: BacklogHealthDataSchema, default: {} })
  backlogHealth: BacklogHealthData;

  @Prop({ type: [EpicProgressSchema], default: [] })
  epicsProgress: EpicProgress[];

  @Prop({ type: BacklogChangeSchema, default: {} })
  backlogChanges: BacklogChange;

  @Prop({ type: PrioritizationMatrixSchema, default: {} })
  prioritizationMatrix: PrioritizationMatrix;
}

export const BacklogEvolutionSchema = SchemaFactory.createForClass(BacklogEvolution);
