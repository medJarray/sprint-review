import { IsString, IsArray, IsOptional, IsNumber, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class KpiCardDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() label: string;
  @ApiProperty() @IsString() value: string;
  @ApiPropertyOptional() @IsString() @IsOptional() unit?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() badgeText?: string;
  @ApiPropertyOptional() @IsString() @IsIn(['up', 'down', 'stable', 'check', 'smile']) @IsOptional() badgeType?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() subText?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() borderColor?: string;
}

export class VelocityEntryDto {
  @ApiProperty() @IsString() label: string;
  @ApiProperty() @IsNumber() value: number;
}

export class InsightItemDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() text: string;
}

export class QualityGateDto {
  @ApiPropertyOptional() @IsNumber() @IsOptional() unitTests?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() sonarGrade?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() e2eTests?: number;
}

export class SprintMetricsBaseDto {
  @ApiPropertyOptional() @IsNumber() @IsOptional() plannedPoints?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() completedPoints?: number;
}

export class CreateMetricDto {
  @ApiProperty() @IsString() sprintId: string;

  @ApiPropertyOptional({ type: SprintMetricsBaseDto })
  @ValidateNested() @Type(() => SprintMetricsBaseDto) @IsOptional()
  sprintMetrics?: SprintMetricsBaseDto;

  @ApiPropertyOptional({ type: [KpiCardDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => KpiCardDto) @IsOptional()
  kpiCards?: KpiCardDto[];

  @ApiPropertyOptional({ type: [Number] })
  @IsArray() @IsOptional()
  burndownIdeal?: number[];

  @ApiPropertyOptional({ type: [Number] })
  @IsArray() @IsOptional()
  burndownReal?: number[];

  @ApiPropertyOptional({ type: [VelocityEntryDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => VelocityEntryDto) @IsOptional()
  velocityHistory?: VelocityEntryDto[];

  @ApiPropertyOptional({ type: [InsightItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => InsightItemDto) @IsOptional()
  insightsGood?: InsightItemDto[];

  @ApiPropertyOptional({ type: [InsightItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => InsightItemDto) @IsOptional()
  insightsBad?: InsightItemDto[];

  @ApiPropertyOptional({ type: QualityGateDto })
  @ValidateNested() @Type(() => QualityGateDto) @IsOptional()
  qualityGate?: QualityGateDto;
}

export class UpdateMetricDto extends PartialType(CreateMetricDto) {}
