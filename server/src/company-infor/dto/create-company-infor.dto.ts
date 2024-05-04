import { ApiProperty } from '@nestjs/swagger';
import { CompanyType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyInforDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ required: false })
  @IsString()
  profile_photo_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  cover_photo_url?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_location: string;

  @ApiProperty({
    example: 'IT_OUTSOURCING',
    enum: CompanyType,
  })
  @IsNotEmpty()
  @IsEnum(CompanyType)
  company_type: CompanyType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_size: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_overview: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  working_days: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  overtime_policy: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  website_url: string;
}
