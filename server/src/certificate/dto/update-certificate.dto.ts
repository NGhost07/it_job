import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class UpdateCertificateDto {
  @ApiProperty({ required: false })
  @IsString()
  certificate_name?: string;

  @ApiProperty({ required: false })
  @IsString()
  certificate_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  organization?: string;

  @ApiProperty({ example: 'YYYY-MM-DD', required: false })
  @IsDateString()
  issue_date?: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;
}
