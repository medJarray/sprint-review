import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { RealizationsService } from './realizations.service';
import { CreateRealizationDto, UpdateRealizationDto } from './dto/realization.dto';

@ApiTags('realizations')
@Controller('realizations')
export class RealizationsController {
  constructor(private readonly service: RealizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer/remplacer les réalisations d\'un sprint (upsert)' })
  createOrReplace(@Body() dto: CreateRealizationDto) {
    return this.service.createOrReplace(dto);
  }

  @Get(':sprintId')
  @ApiOperation({ summary: 'Récupérer les réalisations d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  findBySprint(@Param('sprintId') sprintId: string) {
    return this.service.findBySprint(sprintId);
  }

  @Put(':sprintId')
  @ApiOperation({ summary: 'Mettre à jour les réalisations' })
  @ApiParam({ name: 'sprintId' })
  update(@Param('sprintId') sprintId: string, @Body() dto: UpdateRealizationDto) {
    return this.service.update(sprintId, dto);
  }

  @Delete(':sprintId')
  @ApiOperation({ summary: 'Supprimer les réalisations d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  remove(@Param('sprintId') sprintId: string) {
    return this.service.remove(sprintId);
  }
}
