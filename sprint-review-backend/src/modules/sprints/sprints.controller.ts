import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SprintsService } from './sprints.service';
import { CreateSprintDto, UpdateSprintDto } from './dto/sprint.dto';

@ApiTags('sprints')
@Controller('sprints')
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau sprint' })
  create(@Body() dto: CreateSprintDto) {
    return this.sprintsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les sprints' })
  findAll() {
    return this.sprintsService.findAll();
  }

  @Get(':sprintId')
  @ApiOperation({ summary: 'Récupérer un sprint par son ID' })
  @ApiParam({ name: 'sprintId', description: 'Identifiant unique du sprint' })
  findOne(@Param('sprintId') sprintId: string) {
    return this.sprintsService.findBySprintId(sprintId);
  }

  @Put(':sprintId')
  @ApiOperation({ summary: 'Mettre à jour un sprint' })
  @ApiParam({ name: 'sprintId', description: 'Identifiant unique du sprint' })
  update(@Param('sprintId') sprintId: string, @Body() dto: UpdateSprintDto) {
    return this.sprintsService.update(sprintId, dto);
  }

  @Delete(':sprintId')
  @ApiOperation({ summary: 'Supprimer un sprint' })
  @ApiParam({ name: 'sprintId', description: 'Identifiant unique du sprint' })
  remove(@Param('sprintId') sprintId: string) {
    return this.sprintsService.remove(sprintId);
  }
}
