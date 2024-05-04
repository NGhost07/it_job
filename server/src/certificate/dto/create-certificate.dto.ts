import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateCertificateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userProfileId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  certificate_name: string;

  @ApiProperty({ required: false })
  @IsString()
  certificate_url?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  organization: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsDateString()
  @IsNotEmpty()
  issue_date: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;
}
