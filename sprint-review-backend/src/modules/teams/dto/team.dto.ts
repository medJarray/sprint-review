import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class TeamMemberDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  initials?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  color?: string;
}

export class CreateTeamDto {
  @ApiProperty({ description: 'Référence au sprint' })
  @IsString()
  sprintId: string;

  @ApiProperty({ description: 'ID de l\'équipe' })
  @IsString()
  teamId: string;

  @ApiProperty({ description: 'Nom de l\'équipe' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Membres', type: [TeamMemberDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamMemberDto)
  @IsOptional()
  members?: TeamMemberDto[];
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
