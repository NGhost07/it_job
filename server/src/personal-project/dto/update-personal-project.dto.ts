import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class UpdatePersonalProjectDto {
  @ApiProperty({ required: false })
  @IsString()
  personalProject_name?: string;

  @ApiProperty({ example: 'YYYY-MM-DD', required: false })
  @IsDateString()
  start_date?: string;

  @ApiProperty({ example: 'YYYY-MM-DD', required: false })
  @IsDateString()
  end_date?: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  project_url?: string;
}
