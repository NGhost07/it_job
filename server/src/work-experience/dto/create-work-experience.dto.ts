import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkExperienceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userProfileId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  job_title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsNotEmpty()
  @IsDateString()
  from: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsNotEmpty()
  @IsDateString()
  to: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  project?: string;
}
