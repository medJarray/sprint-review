import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum AttachmentCategory {
  DEMO = 'demo',
  METRICS = 'metrics',
  BACKLOG = 'backlog',
  REALIZATIONS = 'realizations',
  GENERAL = 'general',
}

export class UploadAttachmentDto {
  @ApiProperty({ description: 'Identifiant du sprint', example: 'sprint-default' })
  @IsString()
  sprintId: string;

  @ApiPropertyOptional({
    description: 'Catégorie de la pièce jointe',
    enum: AttachmentCategory,
    example: 'general',
  })
  @IsOptional()
  @IsEnum(AttachmentCategory)
  category?: AttachmentCategory;

  @ApiPropertyOptional({ description: 'Description de la pièce jointe', example: 'Capture écran de la démo' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Nom de l\'auteur de l\'upload', example: 'Jean Dupont' })
  @IsOptional()
  @IsString()
  uploadedBy?: string;
}

export class AttachmentResponseDto {
  @ApiProperty() _id: string;
  @ApiProperty() sprintId: string;
  @ApiProperty() originalName: string;
  @ApiProperty() fileName: string;
  @ApiProperty() mimeType: string;
  @ApiProperty() size: number;
  @ApiProperty() objectKey: string;
  @ApiProperty() bucket: string;
  @ApiPropertyOptional() category?: string;
  @ApiPropertyOptional() description?: string;
  @ApiPropertyOptional() uploadedBy?: string;
  @ApiPropertyOptional() downloadUrl?: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
