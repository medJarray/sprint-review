import { IsString, IsArray, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class DistributionItemDto {
  @ApiProperty() @IsString() label: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() count?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() pct?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() color?: string;
}

export class BacklogHealthDataDto {
  @ApiPropertyOptional() @IsNumber() @IsOptional() totalItems?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() readyPercent?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() avgAge?: string;
  @ApiPropertyOptional({ type: [DistributionItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => DistributionItemDto) @IsOptional()
  distribution?: DistributionItemDto[];
}

export class EpicProgressDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() epicId: string;
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() pct?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() done?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() total?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() targetSprint?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() bgColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() borderColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() badgeBg?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() badgeText?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() barColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() targetColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() pctColor?: string;
}

export class BacklogChangeDto {
  @ApiPropertyOptional() @IsNumber() @IsOptional() added?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() removed?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() reprioritized?: number;
  @ApiPropertyOptional() @IsArray() @IsOptional() reasons?: string[];
}

export class MatrixItemDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() storyId: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() points?: number;
}

export class PrioritizationMatrixDto {
  @ApiPropertyOptional({ type: [MatrixItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => MatrixItemDto) @IsOptional()
  quickWins?: MatrixItemDto[];

  @ApiPropertyOptional({ type: [MatrixItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => MatrixItemDto) @IsOptional()
  majorProjects?: MatrixItemDto[];

  @ApiPropertyOptional({ type: [MatrixItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => MatrixItemDto) @IsOptional()
  fillIns?: MatrixItemDto[];

  @ApiPropertyOptional({ type: [MatrixItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => MatrixItemDto) @IsOptional()
  timeSinks?: MatrixItemDto[];

  @ApiPropertyOptional() @IsArray() @IsOptional() insights?: string[];
}

export class CreateBacklogEvolutionDto {
  @ApiProperty() @IsString() sprintId: string;

  @ApiPropertyOptional({ type: BacklogHealthDataDto })
  @ValidateNested() @Type(() => BacklogHealthDataDto) @IsOptional()
  backlogHealth?: BacklogHealthDataDto;

  @ApiPropertyOptional({ type: [EpicProgressDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => EpicProgressDto) @IsOptional()
  epicsProgress?: EpicProgressDto[];

  @ApiPropertyOptional({ type: BacklogChangeDto })
  @ValidateNested() @Type(() => BacklogChangeDto) @IsOptional()
  backlogChanges?: BacklogChangeDto;

  @ApiPropertyOptional({ type: PrioritizationMatrixDto })
  @ValidateNested() @Type(() => PrioritizationMatrixDto) @IsOptional()
  prioritizationMatrix?: PrioritizationMatrixDto;
}

export class UpdateBacklogEvolutionDto extends PartialType(CreateBacklogEvolutionDto) {}
