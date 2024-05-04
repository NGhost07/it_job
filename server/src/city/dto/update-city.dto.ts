import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCityDto {
  @ApiProperty({ required: false })
  @IsString()
  city_name?: string;
}
