import { ApiProperty } from '@nestjs/swagger';
import { EducationalStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class UpdateEducationDto {
  @ApiProperty({ required: false })
  @IsString()
  educational_facility?: string;

  @ApiProperty({ required: false })
  @IsString()
  major?: string;

  @ApiProperty({
    example: 'IN_PROCESS',
    enum: EducationalStatus,
    required: false,
  })
  @IsEnum(EducationalStatus)
  educational_status?: EducationalStatus;

  @ApiProperty({ example: 'YYYY-MM-DD', required: false })
  @IsDateString()
  from?: string;

  @ApiProperty({ example: 'YYYY-MM-DD', required: false })
  @IsDateString()
  to?: string;

  @ApiProperty({ required: false })
  @IsString()
  additional_details: string;
}
