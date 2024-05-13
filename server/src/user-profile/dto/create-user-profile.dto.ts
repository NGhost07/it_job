import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserProfileDto {
  @ApiProperty({ minLength: 1, maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  full_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsNotEmpty()
  @IsDateString()
  date_of_birth: string;

  @ApiProperty({ required: false })
  @IsString()
  profile_photo_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  cover_photo_url?: string;

  @ApiProperty({
    example: 'MALE',
    enum: Gender,
    required: false,
  })
  gender?: Gender;

  @ApiProperty({ required: false })
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  about_me?: string;

  @ApiProperty({ required: false })
  @IsString()
  cv_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  cover_letter_url?: string;
}
