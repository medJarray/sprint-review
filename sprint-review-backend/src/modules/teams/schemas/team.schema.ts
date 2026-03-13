// ─── Module 2 : TEAMS ───
// Collection: teams — Équipes et leurs membres

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class TeamMember {
  @ApiProperty()
  @Prop({ required: true })
  id: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  role: string;

  @ApiProperty({ required: false })
  @Prop()
  avatar?: string;

  @ApiProperty({ required: false })
  @Prop()
  initials?: string;

  @ApiProperty({ required: false })
  @Prop()
  color?: string;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);

@Schema({ timestamps: true, collection: 'teams' })
export class Team extends Document {
  @ApiProperty({ description: 'Référence au sprint' })
  @Prop({ required: true, index: true })
  sprintId: string;

  @ApiProperty({ description: 'ID de l\'équipe' })
  @Prop({ required: true })
  teamId: string;

  @ApiProperty({ description: 'Nom de l\'équipe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Membres de l\'équipe', type: [TeamMember] })
  @Prop({ type: [TeamMemberSchema], default: [] })
  members: TeamMember[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
TeamSchema.index({ sprintId: 1, teamId: 1 }, { unique: true });
