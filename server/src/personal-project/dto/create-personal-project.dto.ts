import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonalProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userProfileId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  personalProject_name: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  project_url?: string;
}
