import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une équipe pour un sprint' })
  create(@Body() dto: CreateTeamDto) {
    return this.teamsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les équipes d\'un sprint' })
  @ApiQuery({ name: 'sprintId', description: 'ID du sprint' })
  findAll(@Query('sprintId') sprintId: string) {
    return this.teamsService.findAllBySprint(sprintId);
  }

  @Get(':sprintId/:teamId')
  @ApiOperation({ summary: 'Récupérer une équipe' })
  @ApiParam({ name: 'sprintId' })
  @ApiParam({ name: 'teamId' })
  findOne(@Param('sprintId') sprintId: string, @Param('teamId') teamId: string) {
    return this.teamsService.findOne(sprintId, teamId);
  }

  @Put(':sprintId/:teamId')
  @ApiOperation({ summary: 'Mettre à jour une équipe' })
  @ApiParam({ name: 'sprintId' })
  @ApiParam({ name: 'teamId' })
  update(
    @Param('sprintId') sprintId: string,
    @Param('teamId') teamId: string,
    @Body() dto: UpdateTeamDto,
  ) {
    return this.teamsService.update(sprintId, teamId, dto);
  }

  @Delete(':sprintId/:teamId')
  @ApiOperation({ summary: 'Supprimer une équipe' })
  @ApiParam({ name: 'sprintId' })
  @ApiParam({ name: 'teamId' })
  remove(@Param('sprintId') sprintId: string, @Param('teamId') teamId: string) {
    return this.teamsService.remove(sprintId, teamId);
  }
}
