// ─── Module 11 : PAGES ───
// Collection: pages — Configuration des pages/slides de la présentation

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, collection: 'pages' })
export class Page extends Document {
  @ApiProperty({ description: 'Référence au sprint' })
  @Prop({ required: true, index: true })
  sprintId: string;

  @ApiProperty({ description: 'ID de la page' })
  @Prop({ required: true })
  pageId: string;

  @ApiProperty({ description: 'Titre de la page' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Slug URL' })
  @Prop({ default: '' })
  slug: string;

  @ApiProperty({ description: 'Ordre d\'affichage' })
  @Prop({ default: 0 })
  order: number;

  @ApiProperty({ description: 'Visible dans la navigation' })
  @Prop({ default: true })
  visible: boolean;
}

export const PageSchema = SchemaFactory.createForClass(Page);
PageSchema.index({ sprintId: 1, pageId: 1 }, { unique: true });
PageSchema.index({ sprintId: 1, order: 1 });
