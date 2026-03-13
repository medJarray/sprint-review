// ─── Module 1 : SPRINTS ───
// Collection: sprints — Informations de base du sprint

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, collection: 'sprints' })
export class Sprint extends Document {
  @ApiProperty({ description: 'Identifiant unique du sprint (frontend)' })
  @Prop({ required: true, index: true })
  sprintId: string;

  @ApiProperty({ description: 'Nom du sprint' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Numéro du sprint' })
  @Prop({ required: true, index: true })
  number: number;

  @ApiProperty({ description: 'Objectif principal du sprint' })
  @Prop({ default: '' })
  goal: string;

  @ApiProperty({ description: 'Date de début' })
  @Prop({ default: '' })
  startDate: string;

  @ApiProperty({ description: 'Date de fin' })
  @Prop({ default: '' })
  endDate: string;
}

export const SprintSchema = SchemaFactory.createForClass(Sprint);
// Index composé pour rechercher rapidement par sprintId
SprintSchema.index({ sprintId: 1 }, { unique: true });
