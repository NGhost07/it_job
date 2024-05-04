import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class UpdateAwardDto {
  @ApiProperty({ required: false })
  @IsString()
  award_name?: string;

  @ApiProperty({ required: false })
  @IsString()
  award_url?: string;

  @ApiProperty({ example: 'YYYY-MM-DD', required: false })
  @IsDateString()
  issue_date?: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;
}
