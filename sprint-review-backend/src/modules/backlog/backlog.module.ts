import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Backlog, BacklogSchema } from './schemas/backlog.schema';
import { BacklogService } from './backlog.service';
import { BacklogController } from './backlog.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Backlog.name, schema: BacklogSchema }])],
  controllers: [BacklogController],
  providers: [BacklogService],
  exports: [BacklogService],
})
export class BacklogModule {}
