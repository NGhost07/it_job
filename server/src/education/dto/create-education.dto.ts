import { ApiProperty } from '@nestjs/swagger';
import { EducationalStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userProfileId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  educational_facility: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  major: string;

  @ApiProperty({
    example: 'IN_PROCESS',
    enum: EducationalStatus,
  })
  @IsEnum(EducationalStatus)
  educational_status: EducationalStatus;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsNotEmpty()
  @IsDateString()
  from: string;

  @ApiProperty({ example: 'YYYY-MM-DD', required: false })
  @IsDateString()
  to?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  additional_details: string;
}
