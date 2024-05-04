import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateSkillDto {
  @ApiProperty({ required: false })
  @IsString()
  skill_name?: string;
}
