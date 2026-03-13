import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BacklogEvolutionService } from './backlog-evolution.service';
import { CreateBacklogEvolutionDto, UpdateBacklogEvolutionDto } from './dto/backlog-evolution.dto';

@ApiTags('backlog-evolution')
@Controller('backlog-evolution')
export class BacklogEvolutionController {
  constructor(private readonly service: BacklogEvolutionService) {}

  @Post()
  @ApiOperation({ summary: 'Créer/remplacer l\'évolution backlog d\'un sprint (upsert)' })
  createOrReplace(@Body() dto: CreateBacklogEvolutionDto) {
    return this.service.createOrReplace(dto);
  }

  @Get(':sprintId')
  @ApiOperation({ summary: 'Récupérer l\'évolution backlog d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  findBySprint(@Param('sprintId') sprintId: string) {
    return this.service.findBySprint(sprintId);
  }

  @Put(':sprintId')
  @ApiOperation({ summary: 'Mettre à jour l\'évolution backlog' })
  @ApiParam({ name: 'sprintId' })
  update(@Param('sprintId') sprintId: string, @Body() dto: UpdateBacklogEvolutionDto) {
    return this.service.update(sprintId, dto);
  }

  @Delete(':sprintId')
  @ApiOperation({ summary: 'Supprimer l\'évolution backlog d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  remove(@Param('sprintId') sprintId: string) {
    return this.service.remove(sprintId);
  }
}
