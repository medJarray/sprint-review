import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { CreateMetricDto, UpdateMetricDto } from './dto/metric.dto';

@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly service: MetricsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer/remplacer les métriques d\'un sprint (upsert)' })
  createOrReplace(@Body() dto: CreateMetricDto) {
    return this.service.createOrReplace(dto);
  }

  @Get(':sprintId')
  @ApiOperation({ summary: 'Récupérer les métriques d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  findBySprint(@Param('sprintId') sprintId: string) {
    return this.service.findBySprint(sprintId);
  }

  @Put(':sprintId')
  @ApiOperation({ summary: 'Mettre à jour les métriques' })
  @ApiParam({ name: 'sprintId' })
  update(@Param('sprintId') sprintId: string, @Body() dto: UpdateMetricDto) {
    return this.service.update(sprintId, dto);
  }

  @Delete(':sprintId')
  @ApiOperation({ summary: 'Supprimer les métriques d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  remove(@Param('sprintId') sprintId: string) {
    return this.service.remove(sprintId);
  }
}
