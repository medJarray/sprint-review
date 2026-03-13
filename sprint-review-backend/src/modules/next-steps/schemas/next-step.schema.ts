// ─── Module 9 : NEXT STEPS ───
// Collection: next_steps — Candidats prochain sprint, décisions, risques, dates clés

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class NextSprintCandidate {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) storyId: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: '' }) description: string;
  @Prop({ enum: ['high', 'medium', 'low', ''], default: '' }) priority: string;
  @Prop({ default: 0 }) points: number;
  @Prop({ default: '' }) type: string;
}
export const NextSprintCandidateSchema = SchemaFactory.createForClass(NextSprintCandidate);

@Schema({ _id: false })
export class Decision {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: '' }) description: string;
  @Prop({ default: '' }) icon: string;
}
export const DecisionSchema = SchemaFactory.createForClass(Decision);

@Schema({ _id: false })
export class Risk {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) text: string;
}
export const RiskSchema = SchemaFactory.createForClass(Risk);

@Schema({ _id: false })
export class KeyDate {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) date: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: '' }) color: string;
}
export const KeyDateSchema = SchemaFactory.createForClass(KeyDate);

@Schema({ timestamps: true, collection: 'next_steps' })
export class NextStep extends Document {
  @ApiProperty({ description: 'Référence au sprint' })
  @Prop({ required: true, index: true, unique: true })
  sprintId: string;

  @Prop({ type: [NextSprintCandidateSchema], default: [] })
  nextSprintCandidates: NextSprintCandidate[];

  @Prop({ type: [DecisionSchema], default: [] })
  decisions: Decision[];

  @Prop({ type: [RiskSchema], default: [] })
  risks: Risk[];

  @Prop({ type: [KeyDateSchema], default: [] })
  keyDates: KeyDate[];

  @Prop({ default: '' })
  nextSprintDate: string;
}

export const NextStepSchema = SchemaFactory.createForClass(NextStep);
