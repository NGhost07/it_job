import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto, UpdateUserProfileDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfile } from '@prisma/client';

@Injectable()
export class UserProfileService {
  constructor(private prismaService: PrismaService) {}

  async create(
    user_id: string,
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    const {
      full_name,
      phone_number,
      date_of_birth,
      profile_photo_url,
      cover_photo_url,
      gender,
      address,
      about_me,
      cv_url,
      cover_letter_url,
    } = createUserProfileDto;

    return this.prismaService.userProfile.create({
      data: {
        user: { connect: { user_id: user_id } },
        full_name,
        phone_number,
        date_of_birth: new Date(date_of_birth),
        profile_photo_url,
        cover_photo_url,
        gender,
        address,
        about_me,
        cv_url,
        cover_letter_url,
      },
    });
  }

  async findAll(): Promise<UserProfile[]> {
    return this.prismaService.userProfile.findMany();
  }

  async findOneByUserId(user_id: string): Promise<UserProfile> {
    return this.prismaService.userProfile.findUnique({
      where: { userId: user_id },
    });
  }

  async updateByUserId(
    user_id: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    const {
      full_name,
      phone_number,
      date_of_birth,
      profile_photo_url,
      cover_photo_url,
      gender,
      address,
      about_me,
      cv_url,
      cover_letter_url,
    } = updateUserProfileDto;

    return this.prismaService.userProfile.update({
      where: { userId: user_id },
      data: {
        full_name,
        phone_number,
        date_of_birth:
          date_of_birth == null ? date_of_birth : new Date(date_of_birth),
        profile_photo_url,
        cover_photo_url,
        gender,
        address,
        about_me,
        cv_url,
        cover_letter_url,
      },
    });
  }

  async removeByUserId(user_id: string): Promise<UserProfile> {
    return this.prismaService.userProfile.delete({
      where: { userId: user_id },
    });
  }

  async updateAvatar(user_id: string, avatar: string) {
    return await this.prismaService.userProfile.update({
      where: { userId: user_id },
      data: {
        profile_photo_url: avatar,
      },
    });
  }
}
