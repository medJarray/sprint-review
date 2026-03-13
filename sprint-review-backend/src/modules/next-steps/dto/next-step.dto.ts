import { IsString, IsArray, IsOptional, IsNumber, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class NextSprintCandidateDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() storyId: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsString() @IsIn(['high', 'medium', 'low', '']) @IsOptional() priority?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() points?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() type?: string;
}

export class DecisionDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() icon?: string;
}

export class RiskDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() text: string;
}

export class KeyDateDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() date: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() color?: string;
}

export class CreateNextStepDto {
  @ApiProperty() @IsString() sprintId: string;

  @ApiPropertyOptional({ type: [NextSprintCandidateDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => NextSprintCandidateDto) @IsOptional()
  nextSprintCandidates?: NextSprintCandidateDto[];

  @ApiPropertyOptional({ type: [DecisionDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => DecisionDto) @IsOptional()
  decisions?: DecisionDto[];

  @ApiPropertyOptional({ type: [RiskDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => RiskDto) @IsOptional()
  risks?: RiskDto[];

  @ApiPropertyOptional({ type: [KeyDateDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => KeyDateDto) @IsOptional()
  keyDates?: KeyDateDto[];

  @ApiPropertyOptional() @IsString() @IsOptional() nextSprintDate?: string;
}

export class UpdateNextStepDto extends PartialType(CreateNextStepDto) {}
