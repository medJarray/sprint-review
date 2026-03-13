import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ObjectivesService } from './objectives.service';
import { CreateObjectiveDto, UpdateObjectiveDto } from './dto/objective.dto';

@ApiTags('objectives')
@Controller('objectives')
export class ObjectivesController {
  constructor(private readonly service: ObjectivesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer/remplacer les objectifs d\'un sprint (upsert)' })
  createOrReplace(@Body() dto: CreateObjectiveDto) {
    return this.service.createOrReplace(dto);
  }

  @Get(':sprintId')
  @ApiOperation({ summary: 'Récupérer les objectifs d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  findBySprint(@Param('sprintId') sprintId: string) {
    return this.service.findBySprint(sprintId);
  }

  @Put(':sprintId')
  @ApiOperation({ summary: 'Mettre à jour partiellement les objectifs' })
  @ApiParam({ name: 'sprintId' })
  update(@Param('sprintId') sprintId: string, @Body() dto: UpdateObjectiveDto) {
    return this.service.update(sprintId, dto);
  }

  @Delete(':sprintId')
  @ApiOperation({ summary: 'Supprimer les objectifs d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  remove(@Param('sprintId') sprintId: string) {
    return this.service.remove(sprintId);
  }
}
