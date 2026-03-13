// ─── Module 10 : STYLES ───
// Collection: styles — Styles globaux (polices, couleurs, tailles)

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, collection: 'styles' })
export class Style extends Document {
  @ApiProperty({ description: 'Référence au sprint' })
  @Prop({ required: true, index: true, unique: true })
  sprintId: string;

  @ApiProperty() @Prop({ default: 'DM Sans, sans-serif' }) fontFamily: string;
  @ApiProperty() @Prop({ default: 'DM Sans, sans-serif' }) headingFontFamily: string;
  @ApiProperty() @Prop({ default: '#0F52BA' }) primaryColor: string;
  @ApiProperty() @Prop({ default: '#6366F1' }) secondaryColor: string;
  @ApiProperty() @Prop({ default: '#00C48C' }) accentColor: string;
  @ApiProperty() @Prop({ default: '#F9FAFB' }) backgroundColor: string;
  @ApiProperty() @Prop({ default: '#1F2937' }) textColor: string;
  @ApiProperty() @Prop({ default: 14 }) fontSize: number;
  @ApiProperty() @Prop({ default: 8 }) borderRadius: number;
}

export const StyleSchema = SchemaFactory.createForClass(Style);
