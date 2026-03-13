import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { StylesService } from './styles.service';
import { CreateStyleDto, UpdateStyleDto } from './dto/style.dto';

@ApiTags('styles')
@Controller('styles')
export class StylesController {
  constructor(private readonly service: StylesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer/remplacer les styles d\'un sprint (upsert)' })
  createOrReplace(@Body() dto: CreateStyleDto) {
    return this.service.createOrReplace(dto);
  }

  @Get(':sprintId')
  @ApiOperation({ summary: 'Récupérer les styles d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  findBySprint(@Param('sprintId') sprintId: string) {
    return this.service.findBySprint(sprintId);
  }

  @Put(':sprintId')
  @ApiOperation({ summary: 'Mettre à jour les styles' })
  @ApiParam({ name: 'sprintId' })
  update(@Param('sprintId') sprintId: string, @Body() dto: UpdateStyleDto) {
    return this.service.update(sprintId, dto);
  }

  @Delete(':sprintId')
  @ApiOperation({ summary: 'Supprimer les styles d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  remove(@Param('sprintId') sprintId: string) {
    return this.service.remove(sprintId);
  }
}
