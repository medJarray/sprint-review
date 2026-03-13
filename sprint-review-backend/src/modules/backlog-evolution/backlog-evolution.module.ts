import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BacklogEvolution, BacklogEvolutionSchema } from './schemas/backlog-evolution.schema';
import { BacklogEvolutionService } from './backlog-evolution.service';
import { BacklogEvolutionController } from './backlog-evolution.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: BacklogEvolution.name, schema: BacklogEvolutionSchema }])],
  controllers: [BacklogEvolutionController],
  providers: [BacklogEvolutionService],
  exports: [BacklogEvolutionService],
})
export class BacklogEvolutionModule {}
