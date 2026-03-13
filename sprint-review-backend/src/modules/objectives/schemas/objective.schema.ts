// ─── Module 3 : OBJECTIVES ───
// Collection: objectives — Objectifs SMART, critères de succès, contraintes, DoD

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class ObjectiveItem {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: '' }) description: string;
  @Prop({ default: '' }) priority: string;
  @Prop({ default: '' }) scope: string;
  @Prop() epicLink?: string;
  @Prop({ default: '' }) borderColor: string;
}
export const ObjectiveItemSchema = SchemaFactory.createForClass(ObjectiveItem);

@Schema({ _id: false })
export class TextItem {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) text: string;
}
export const TextItemSchema = SchemaFactory.createForClass(TextItem);

@Schema({ timestamps: true, collection: 'objectives' })
export class Objective extends Document {
  @ApiProperty({ description: 'Référence au sprint' })
  @Prop({ required: true, index: true, unique: true })
  sprintId: string;

  @ApiProperty({ description: 'Liste des objectifs SMART' })
  @Prop({ type: [ObjectiveItemSchema], default: [] })
  objectives: ObjectiveItem[];

  @ApiProperty({ description: 'Critères de succès' })
  @Prop({ type: [TextItemSchema], default: [] })
  successCriteria: TextItem[];

  @ApiProperty({ description: 'Contraintes identifiées' })
  @Prop({ type: [TextItemSchema], default: [] })
  constraints: TextItem[];

  @ApiProperty({ description: 'Definition of Done' })
  @Prop({ type: [TextItemSchema], default: [] })
  dodItems: TextItem[];
}

export const ObjectiveSchema = SchemaFactory.createForClass(Objective);
