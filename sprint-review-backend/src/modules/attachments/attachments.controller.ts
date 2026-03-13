import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  Body,
  Res,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';
import { AttachmentsService } from './attachments.service';
import { UploadAttachmentDto, AttachmentCategory } from './dto/attachment.dto';

@ApiTags('attachments')
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  // ─── Upload une pièce jointe ───
  @Post('upload')
  @ApiOperation({ summary: 'Upload une pièce jointe dans MinIO S3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'sprintId'],
      properties: {
        file: { type: 'string', format: 'binary', description: 'Fichier à uploader' },
        sprintId: { type: 'string', example: 'sprint-default' },
        category: {
          type: 'string',
          enum: Object.values(AttachmentCategory),
          example: 'general',
        },
        description: { type: 'string', example: 'Capture écran de la démo' },
        uploadedBy: { type: 'string', example: 'Jean Dupont' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }), // 50 MB max
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() dto: UploadAttachmentDto,
  ) {
    return this.attachmentsService.upload(file, dto);
  }

  // ─── Liste les pièces jointes d'un sprint ───
  @Get('sprint/:sprintId')
  @ApiOperation({ summary: 'Liste toutes les pièces jointes d\'un sprint' })
  @ApiParam({ name: 'sprintId', example: 'sprint-default' })
  @ApiQuery({ name: 'category', required: false, enum: AttachmentCategory })
  async findBySprintId(
    @Param('sprintId') sprintId: string,
    @Query('category') category?: AttachmentCategory,
  ) {
    return this.attachmentsService.findBySprintId(sprintId, category);
  }

  // ─── Récupère les détails d'une pièce jointe ───
  @Get(':id')
  @ApiOperation({ summary: 'Récupère les détails d\'une pièce jointe (avec URL pré-signée)' })
  @ApiParam({ name: 'id', description: 'ID MongoDB de la pièce jointe' })
  async findById(@Param('id') id: string) {
    return this.attachmentsService.findById(id);
  }

  // ─── Télécharge le fichier ───
  @Get(':id/download')
  @ApiOperation({ summary: 'Télécharge le fichier depuis MinIO' })
  @ApiParam({ name: 'id', description: 'ID MongoDB de la pièce jointe' })
  async download(@Param('id') id: string, @Res() res: Response) {
    const { stream, attachment } = await this.attachmentsService.download(id);

    res.set({
      'Content-Type': attachment.mimeType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(attachment.originalName)}"`,
    });

    stream.pipe(res);
  }

  // ─── Supprime une pièce jointe ───
  @Delete(':id')
  @ApiOperation({ summary: 'Supprime une pièce jointe (MinIO + base)' })
  @ApiParam({ name: 'id', description: 'ID MongoDB de la pièce jointe' })
  async delete(@Param('id') id: string) {
    return this.attachmentsService.delete(id);
  }

  // ─── Supprime toutes les pièces jointes d'un sprint ───
  @Delete('sprint/:sprintId')
  @ApiOperation({ summary: 'Supprime toutes les pièces jointes d\'un sprint' })
  @ApiParam({ name: 'sprintId', example: 'sprint-default' })
  async deleteBySprintId(@Param('sprintId') sprintId: string) {
    return this.attachmentsService.deleteBySprintId(sprintId);
  }
}
