// ─── Module 5 : REALIZATIONS ───
// Collection: realizations — Feature cards, small cards, items différés, note équipe, métriques de valeur

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class FeatureCard {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) storyId: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: '' }) description: string;
  @Prop({ enum: ['deployed', 'validated', 'done', 'fixed', 'testing', 'blocked'], default: 'done' }) status: string;
  @Prop() impact?: string;
  @Prop() prLink?: string;
  @Prop({ type: [String], default: [] }) assignees: string[];
}
export const FeatureCardSchema = SchemaFactory.createForClass(FeatureCard);

@Schema({ _id: false })
export class SmallCard {
  @Prop({ required: true }) id: string;
  @Prop({ default: '' }) type: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: '' }) description: string;
  @Prop({ enum: ['deployed', 'validated', 'done', 'fixed', 'testing', 'blocked'], default: 'done' }) status: string;
}
export const SmallCardSchema = SchemaFactory.createForClass(SmallCard);

@Schema({ _id: false })
export class DeferredItem {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) storyId: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: '' }) reason: string;
}
export const DeferredItemSchema = SchemaFactory.createForClass(DeferredItem);

@Schema({ _id: false })
export class ValueMetric {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) label: string;
  @Prop({ required: true }) value: string;
  @Prop() subText?: string;
  @Prop({ default: '' }) bgColor: string;
  @Prop({ default: '' }) borderColor: string;
  @Prop({ default: '' }) iconColor: string;
  @Prop({ default: '' }) icon: string;
}
export const ValueMetricSchema = SchemaFactory.createForClass(ValueMetric);

@Schema({ timestamps: true, collection: 'realizations' })
export class Realization extends Document {
  @ApiProperty({ description: 'Référence au sprint' })
  @Prop({ required: true, index: true, unique: true })
  sprintId: string;

  @Prop({ type: [FeatureCardSchema], default: [] })
  featureCards: FeatureCard[];

  @Prop({ type: [SmallCardSchema], default: [] })
  smallCards: SmallCard[];

  @Prop({ type: [DeferredItemSchema], default: [] })
  deferredItems: DeferredItem[];

  @Prop({ default: '' })
  teamNote: string;

  @Prop({ type: [ValueMetricSchema], default: [] })
  valueMetrics: ValueMetric[];
}

export const RealizationSchema = SchemaFactory.createForClass(Realization);
