import { IsString, IsArray, IsOptional, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class FeatureCardDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() storyId: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsString() @IsIn(['deployed', 'validated', 'done', 'fixed', 'testing', 'blocked']) @IsOptional() status?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() impact?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() prLink?: string;
  @ApiPropertyOptional() @IsArray() @IsOptional() assignees?: string[];
}

export class SmallCardDto {
  @ApiProperty() @IsString() id: string;
  @ApiPropertyOptional() @IsString() @IsOptional() type?: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsString() @IsIn(['deployed', 'validated', 'done', 'fixed', 'testing', 'blocked']) @IsOptional() status?: string;
}

export class DeferredItemDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() storyId: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() reason?: string;
}

export class ValueMetricDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() label: string;
  @ApiProperty() @IsString() value: string;
  @ApiPropertyOptional() @IsString() @IsOptional() subText?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() bgColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() borderColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() iconColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() icon?: string;
}

export class CreateRealizationDto {
  @ApiProperty() @IsString() sprintId: string;

  @ApiPropertyOptional({ type: [FeatureCardDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => FeatureCardDto) @IsOptional()
  featureCards?: FeatureCardDto[];

  @ApiPropertyOptional({ type: [SmallCardDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => SmallCardDto) @IsOptional()
  smallCards?: SmallCardDto[];

  @ApiPropertyOptional({ type: [DeferredItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => DeferredItemDto) @IsOptional()
  deferredItems?: DeferredItemDto[];

  @ApiPropertyOptional() @IsString() @IsOptional() teamNote?: string;

  @ApiPropertyOptional({ type: [ValueMetricDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => ValueMetricDto) @IsOptional()
  valueMetrics?: ValueMetricDto[];
}

export class UpdateRealizationDto extends PartialType(CreateRealizationDto) {}
