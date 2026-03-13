import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class ObjectiveItemDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() priority?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() scope?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() epicLink?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() borderColor?: string;
}

export class TextItemDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() text: string;
}

export class CreateObjectiveDto {
  @ApiProperty() @IsString() sprintId: string;

  @ApiPropertyOptional({ type: [ObjectiveItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => ObjectiveItemDto) @IsOptional()
  objectives?: ObjectiveItemDto[];

  @ApiPropertyOptional({ type: [TextItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => TextItemDto) @IsOptional()
  successCriteria?: TextItemDto[];

  @ApiPropertyOptional({ type: [TextItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => TextItemDto) @IsOptional()
  constraints?: TextItemDto[];

  @ApiPropertyOptional({ type: [TextItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => TextItemDto) @IsOptional()
  dodItems?: TextItemDto[];
}

export class UpdateObjectiveDto extends PartialType(CreateObjectiveDto) {}
