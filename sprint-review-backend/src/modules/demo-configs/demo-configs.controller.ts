import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { DemoConfigsService } from './demo-configs.service';
import { CreateDemoConfigDto, UpdateDemoConfigDto } from './dto/demo-config.dto';

@ApiTags('demo-configs')
@Controller('demo-configs')
export class DemoConfigsController {
  constructor(private readonly service: DemoConfigsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer/remplacer la config démo d\'un sprint (upsert)' })
  createOrReplace(@Body() dto: CreateDemoConfigDto) {
    return this.service.createOrReplace(dto);
  }

  @Get(':sprintId')
  @ApiOperation({ summary: 'Récupérer la config démo d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  findBySprint(@Param('sprintId') sprintId: string) {
    return this.service.findBySprint(sprintId);
  }

  @Put(':sprintId')
  @ApiOperation({ summary: 'Mettre à jour la config démo' })
  @ApiParam({ name: 'sprintId' })
  update(@Param('sprintId') sprintId: string, @Body() dto: UpdateDemoConfigDto) {
    return this.service.update(sprintId, dto);
  }

  @Delete(':sprintId')
  @ApiOperation({ summary: 'Supprimer la config démo' })
  @ApiParam({ name: 'sprintId' })
  remove(@Param('sprintId') sprintId: string) {
    return this.service.remove(sprintId);
  }
}
