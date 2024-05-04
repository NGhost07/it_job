import { ApiProperty } from '@nestjs/swagger';
import { CompanyType, JobLevel, WorkingType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateJobPreferenceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userProfileId: string;

  @ApiProperty({
    example: 'MANAGER',
    enum: JobLevel,
    required: false,
  })
  @IsEnum(JobLevel)
  job_level?: JobLevel;

  @ApiProperty({ required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0, { message: 'salary must be greater than or equal to 0' })
  current_salary?: number;

  @ApiProperty({ required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0, { message: 'salary must be greater than or equal to 0' })
  expected_salary?: number;

  @ApiProperty({
    example: 'AT_OFFICE',
    enum: WorkingType,
    required: false,
  })
  @IsEnum(WorkingType)
  working_type?: WorkingType;

  @ApiProperty({
    example: 'IT_OUTSOURCING',
    enum: CompanyType,
    required: false,
  })
  @IsEnum(CompanyType)
  company_type?: CompanyType;
}
