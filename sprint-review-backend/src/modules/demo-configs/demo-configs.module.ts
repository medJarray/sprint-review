import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoConfig, DemoConfigSchema } from './schemas/demo-config.schema';
import { DemoConfigsService } from './demo-configs.service';
import { DemoConfigsController } from './demo-configs.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: DemoConfig.name, schema: DemoConfigSchema }])],
  controllers: [DemoConfigsController],
  providers: [DemoConfigsService],
  exports: [DemoConfigsService],
})
export class DemoConfigsModule {}
