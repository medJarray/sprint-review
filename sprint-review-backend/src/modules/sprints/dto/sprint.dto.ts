import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateSprintDto {
  @ApiProperty({ description: 'Identifiant unique du sprint (généré côté frontend)' })
  @IsString()
  sprintId: string;

  @ApiProperty({ description: 'Nom du sprint' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Numéro du sprint' })
  @IsNumber()
  number: number;

  @ApiPropertyOptional({ description: 'Objectif principal' })
  @IsString()
  @IsOptional()
  goal?: string;

  @ApiPropertyOptional({ description: 'Date de début (ex: 2026-01-12)' })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Date de fin' })
  @IsString()
  @IsOptional()
  endDate?: string;
}

export class UpdateSprintDto extends PartialType(CreateSprintDto) {}
