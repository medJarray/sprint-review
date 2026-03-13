import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateStyleDto {
  @ApiProperty() @IsString() sprintId: string;
  @ApiPropertyOptional() @IsString() @IsOptional() fontFamily?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() headingFontFamily?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() primaryColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() secondaryColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() accentColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() backgroundColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() textColor?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() fontSize?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() borderRadius?: number;
}

export class UpdateStyleDto extends PartialType(CreateStyleDto) {}
