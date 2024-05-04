import { ApiProperty } from '@nestjs/swagger';
import { JobLevel, WorkingType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateJobDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyInforId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  requirements?: string;

  @ApiProperty()
  @IsString()
  benefits?: string;

  @ApiProperty({
    example: 'MANAGER',
    enum: JobLevel,
    required: false,
  })
  @IsEnum(JobLevel)
  jobLevels?: JobLevel;

  @ApiProperty({ required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0, { message: 'salary must be greater than or equal to 0' })
  salary_min?: number;

  @ApiProperty({ required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0, { message: 'salary must be greater than or equal to 0' })
  salary_max?: number;

  @ApiProperty({
    example: 'AT_OFFICE',
    enum: WorkingType,
  })
  @IsEnum(WorkingType)
  working_type: WorkingType;
}
