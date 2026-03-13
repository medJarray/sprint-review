import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BacklogService } from './backlog.service';
import { CreateBacklogDto, UpdateBacklogDto } from './dto/backlog.dto';

@ApiTags('backlog')
@Controller('backlog')
export class BacklogController {
  constructor(private readonly service: BacklogService) {}

  @Post()
  @ApiOperation({ summary: 'Créer/remplacer le backlog d\'un sprint (upsert)' })
  createOrReplace(@Body() dto: CreateBacklogDto) {
    return this.service.createOrReplace(dto);
  }

  @Get(':sprintId')
  @ApiOperation({ summary: 'Récupérer le backlog d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  findBySprint(@Param('sprintId') sprintId: string) {
    return this.service.findBySprint(sprintId);
  }

  @Put(':sprintId')
  @ApiOperation({ summary: 'Mettre à jour le backlog' })
  @ApiParam({ name: 'sprintId' })
  update(@Param('sprintId') sprintId: string, @Body() dto: UpdateBacklogDto) {
    return this.service.update(sprintId, dto);
  }

  @Delete(':sprintId')
  @ApiOperation({ summary: 'Supprimer le backlog d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  remove(@Param('sprintId') sprintId: string) {
    return this.service.remove(sprintId);
  }
}
