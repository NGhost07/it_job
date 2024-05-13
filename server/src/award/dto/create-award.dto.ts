import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAwardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  award_name: string;

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
