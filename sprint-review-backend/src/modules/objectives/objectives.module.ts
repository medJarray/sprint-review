import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Objective, ObjectiveSchema } from './schemas/objective.schema';
import { ObjectivesService } from './objectives.service';
import { ObjectivesController } from './objectives.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Objective.name, schema: ObjectiveSchema }])],
  controllers: [ObjectivesController],
  providers: [ObjectivesService],
  exports: [ObjectivesService],
})
export class ObjectivesModule {}
