import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttachmentDocument = Attachment & Document;

@Schema({
  collection: 'attachments',
  timestamps: true,
})
export class Attachment {
  @Prop({ required: true, index: true })
  sprintId: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  objectKey: string;

  @Prop({ required: true })
  bucket: string;

  @Prop()
  category?: string; // ex: 'demo', 'metrics', 'backlog', 'general'

  @Prop()
  description?: string;

  @Prop()
  uploadedBy?: string;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);

// Index composé pour recherche rapide par sprint + catégorie
AttachmentSchema.index({ sprintId: 1, category: 1 });
