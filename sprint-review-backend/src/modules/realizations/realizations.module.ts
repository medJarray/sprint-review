import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Realization, RealizationSchema } from './schemas/realization.schema';
import { RealizationsService } from './realizations.service';
import { RealizationsController } from './realizations.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Realization.name, schema: RealizationSchema }])],
  controllers: [RealizationsController],
  providers: [RealizationsService],
  exports: [RealizationsService],
})
export class RealizationsModule {}
