// ─── Module 6 : DEMO CONFIGS ───
// Collection: demo_configs — Configuration de démo et étapes

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class DemoStep {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) stepNumber: number;
  @Prop({ required: true }) title: string;
  @Prop({ default: '' }) description: string;
  @Prop() note?: string;
  @Prop() featureRef?: string;
  @Prop({ default: false }) isActive: boolean;
}
export const DemoStepSchema = SchemaFactory.createForClass(DemoStep);

@Schema({ timestamps: true, collection: 'demo_configs' })
export class DemoConfig extends Document {
  @ApiProperty({ description: 'Référence au sprint' })
  @Prop({ required: true, index: true, unique: true })
  sprintId: string;

  @Prop({ default: '' }) environment: string;
  @Prop({ default: '' }) testAccount: string;
  @Prop({ default: '' }) version: string;
  @Prop({ default: '' }) demoOwner: string;
  @Prop({ default: '' }) demoOwnerInitials: string;
  @Prop() videoLink?: string;
  @Prop() figmaLink?: string;

  @Prop({ type: [DemoStepSchema], default: [] })
  steps: DemoStep[];
}

export const DemoConfigSchema = SchemaFactory.createForClass(DemoConfig);
