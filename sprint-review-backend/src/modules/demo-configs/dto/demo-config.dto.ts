import { IsString, IsArray, IsOptional, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class DemoStepDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsNumber() stepNumber: number;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() note?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() featureRef?: string;
  @ApiPropertyOptional() @IsBoolean() @IsOptional() isActive?: boolean;
}

export class CreateDemoConfigDto {
  @ApiProperty() @IsString() sprintId: string;
  @ApiPropertyOptional() @IsString() @IsOptional() environment?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() testAccount?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() version?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() demoOwner?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() demoOwnerInitials?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() videoLink?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() figmaLink?: string;

  @ApiPropertyOptional({ type: [DemoStepDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => DemoStepDto) @IsOptional()
  steps?: DemoStepDto[];
}

export class UpdateDemoConfigDto extends PartialType(CreateDemoConfigDto) {}
