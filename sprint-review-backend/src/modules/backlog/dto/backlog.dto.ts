import { IsString, IsArray, IsOptional, IsNumber, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UserStoryDetailDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() storyId: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() points?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() asA?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() iWant?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() soThat?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() ac?: string;
}

export class EnablerDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() epicId: string;
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsString() @IsOptional() bgColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() textColor?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() iconColor?: string;

  @ApiPropertyOptional({ type: [UserStoryDetailDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => UserStoryDetailDto) @IsOptional()
  stories?: UserStoryDetailDto[];
}

export class TechTaskDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() taskId: string;
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() points?: number;
  @ApiPropertyOptional() @IsString() @IsIn(['tech', 'bug']) @IsOptional() type?: string;
}

export class CreateBacklogDto {
  @ApiProperty() @IsString() sprintId: string;

  @ApiPropertyOptional({ type: [EnablerDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => EnablerDto) @IsOptional()
  enablers?: EnablerDto[];

  @ApiPropertyOptional({ type: [TechTaskDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => TechTaskDto) @IsOptional()
  techTasks?: TechTaskDto[];
}

export class UpdateBacklogDto extends PartialType(CreateBacklogDto) {}
