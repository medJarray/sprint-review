import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { PagesService } from './pages.service';
import { CreatePageDto, UpdatePageDto } from './dto/page.dto';

@ApiTags('pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly service: PagesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une page pour un sprint' })
  create(@Body() dto: CreatePageDto) {
    return this.service.create(dto);
  }

  @Put(':sprintId/batch')
  @ApiOperation({ summary: 'Remplacer toutes les pages d\'un sprint en batch' })
  @ApiParam({ name: 'sprintId' })
  replaceAll(@Param('sprintId') sprintId: string, @Body() body: { pages: CreatePageDto[] }) {
    return this.service.replaceAllBySprint(sprintId, body.pages);
  }

  @Get(':sprintId')
  @ApiOperation({ summary: 'Lister les pages d\'un sprint' })
  @ApiParam({ name: 'sprintId' })
  findAll(@Param('sprintId') sprintId: string) {
    return this.service.findAllBySprint(sprintId);
  }

  @Get(':sprintId/:pageId')
  @ApiOperation({ summary: 'Récupérer une page' })
  @ApiParam({ name: 'sprintId' })
  @ApiParam({ name: 'pageId' })
  findOne(@Param('sprintId') sprintId: string, @Param('pageId') pageId: string) {
    return this.service.findOne(sprintId, pageId);
  }

  @Put(':sprintId/:pageId')
  @ApiOperation({ summary: 'Mettre à jour une page' })
  @ApiParam({ name: 'sprintId' })
  @ApiParam({ name: 'pageId' })
  update(
    @Param('sprintId') sprintId: string,
    @Param('pageId') pageId: string,
    @Body() dto: UpdatePageDto,
  ) {
    return this.service.update(sprintId, pageId, dto);
  }

  @Delete(':sprintId/:pageId')
  @ApiOperation({ summary: 'Supprimer une page' })
  @ApiParam({ name: 'sprintId' })
  @ApiParam({ name: 'pageId' })
  remove(@Param('sprintId') sprintId: string, @Param('pageId') pageId: string) {
    return this.service.remove(sprintId, pageId);
  }
}
