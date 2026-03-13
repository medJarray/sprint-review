import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty() @IsString() sprintId: string;
  @ApiProperty() @IsString() pageId: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() slug?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() order?: number;
  @ApiPropertyOptional() @IsBoolean() @IsOptional() visible?: boolean;
}

export class UpdatePageDto extends PartialType(CreatePageDto) {}
