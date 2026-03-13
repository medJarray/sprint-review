// ─── Module 4 : BACKLOG ───
// Collection: backlogs — Enablers avec User Stories détaillées + Tâches techniques

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class UserStoryDetail {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) storyId: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: 0 }) points: number;
  @Prop({ default: '' }) asA: string;
  @Prop({ default: '' }) iWant: string;
  @Prop({ default: '' }) soThat: string;
  @Prop() ac?: string;
}
export const UserStoryDetailSchema = SchemaFactory.createForClass(UserStoryDetail);

@Schema({ _id: false })
export class Enabler {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) epicId: string;
  @Prop({ required: true }) name: string;
  @Prop({ default: '' }) bgColor: string;
  @Prop({ default: '' }) textColor: string;
  @Prop({ default: '' }) iconColor: string;
  @Prop({ type: [UserStoryDetailSchema], default: [] }) stories: UserStoryDetail[];
}
export const EnablerSchema = SchemaFactory.createForClass(Enabler);

@Schema({ _id: false })
export class TechTask {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) taskId: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: 0 }) points: number;
  @Prop({ enum: ['tech', 'bug'], default: 'tech' }) type: string;
}
export const TechTaskSchema = SchemaFactory.createForClass(TechTask);

@Schema({ timestamps: true, collection: 'backlogs' })
export class Backlog extends Document {
  @ApiProperty({ description: 'Référence au sprint' })
  @Prop({ required: true, index: true, unique: true })
  sprintId: string;

  @ApiProperty({ description: 'Enablers (épiques) avec leurs user stories' })
  @Prop({ type: [EnablerSchema], default: [] })
  enablers: Enabler[];

  @ApiProperty({ description: 'Tâches techniques et bugs' })
  @Prop({ type: [TechTaskSchema], default: [] })
  techTasks: TechTask[];
}

export const BacklogSchema = SchemaFactory.createForClass(Backlog);
