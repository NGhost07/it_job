import { ApiProperty } from '@nestjs/swagger';
import { CompanyType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class UpdateCompanyInforDto {
  @ApiProperty({ required: false })
  @IsString()
  profile_photo_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  cover_photo_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  company_name: string;

  @ApiProperty({ required: false })
  @IsString()
  company_location: string;

  @ApiProperty({
    example: 'IT_OUTSOURCING',
    enum: CompanyType,
    required: false,
  })
  @IsEnum(CompanyType)
  company_type: CompanyType;

  @ApiProperty({ required: false })
  @IsString()
  company_size: string;

  @ApiProperty({ required: false })
  @IsString()
  company_overview: string;

  @ApiProperty({ required: false })
  @IsString()
  country: string;

  @ApiProperty({ required: false })
  @IsString()
  working_days: string;

  @ApiProperty({ required: false })
  @IsString()
  overtime_policy: string;

  @ApiProperty({ required: false })
  @IsString()
  website_url: string;
}
