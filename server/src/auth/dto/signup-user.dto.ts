import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'USER',
    enum: Role,
    default: 'USER',
    required: false,
  })
  @IsEnum(Role)
  role?: Role;
}
