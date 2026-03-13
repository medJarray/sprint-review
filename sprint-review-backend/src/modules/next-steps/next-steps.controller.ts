import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { NextStepsService } from './next-steps.service';
import { CreateNextStepDto, UpdateNextStepDto } from './dto/next-step.dto';

@ApiTags('next-steps')
@Controller('next-steps')
export class NextStepsController {
  constructor(private readonly service: NextStepsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer/remplacer les prochaines étapes d\'un sprint (upsert)' })
  createOrReplace(@Body() dto: CreateNextStepDto) {
    return this.service.createOrReplace(dto);
  }

  @Get(':sprintId')
  @ApiOperation({ summary: 'Récupérer les prochaines étapes d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  findBySprint(@Param('sprintId') sprintId: string) {
    return this.service.findBySprint(sprintId);
  }

  @Put(':sprintId')
  @ApiOperation({ summary: 'Mettre à jour les prochaines étapes' })
  @ApiParam({ name: 'sprintId' })
  update(@Param('sprintId') sprintId: string, @Body() dto: UpdateNextStepDto) {
    return this.service.update(sprintId, dto);
  }

  @Delete(':sprintId')
  @ApiOperation({ summary: 'Supprimer les prochaines étapes d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  remove(@Param('sprintId') sprintId: string) {
    return this.service.remove(sprintId);
  }
}
