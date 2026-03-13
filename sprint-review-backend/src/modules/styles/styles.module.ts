import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Style, StyleSchema } from './schemas/style.schema';
import { StylesService } from './styles.service';
import { StylesController } from './styles.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Style.name, schema: StyleSchema }])],
  controllers: [StylesController],
  providers: [StylesService],
  exports: [StylesService],
})
export class StylesModule {}
