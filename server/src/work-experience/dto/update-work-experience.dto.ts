import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class UpdateWorkExperienceDto {
  @ApiProperty({ required: false })
  @IsString()
  job_title?: string;

  @ApiProperty({ required: false })
  @IsString()
  company?: string;

  @ApiProperty({ example: 'YYYY-MM-DD', required: false })
  @IsDateString()
  from?: string;

  @ApiProperty({ example: 'YYYY-MM-DD', required: false })
  @IsDateString()
  to?: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  project?: string;
}
