import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { IsDateString, IsEnum, IsString, IsUrl, Length } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({ required: false, minLength: 1, maxLength: 100 })
  @IsString()
  @Length(1, 100)
  full_name?: string;

  @ApiProperty({ required: false })
  @IsString()
  phone_number?: string;

  @ApiProperty({ example: 'YYYY-MM-DD', required: false })
  @IsDateString()
  date_of_birth?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsUrl()
  profile_photo_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsUrl()
  cover_photo_url?: string;

  @ApiProperty({
    example: 'MALE',
    enum: Gender,
    required: false,
  })
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ required: false })
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  about_me?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsUrl()
  cv_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsUrl()
  cover_letter_url?: string;
}
