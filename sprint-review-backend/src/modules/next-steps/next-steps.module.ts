import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NextStep, NextStepSchema } from './schemas/next-step.schema';
import { NextStepsService } from './next-steps.service';
import { NextStepsController } from './next-steps.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: NextStep.name, schema: NextStepSchema }])],
  controllers: [NextStepsController],
  providers: [NextStepsService],
  exports: [NextStepsService],
})
export class NextStepsModule {}
