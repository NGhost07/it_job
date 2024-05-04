import { Injectable } from '@nestjs/common';
import { Education } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEducationDto, UpdateEducationDto } from './dto';

@Injectable()
export class EducationService {
  constructor(private prismaService: PrismaService) {}

  async create(createEducationDto: CreateEducationDto): Promise<Education> {
    const {
      userProfileId,
      educational_facility,
      major,
      educational_status,
      from,
      to,
      additional_details,
    } = createEducationDto;

    return this.prismaService.education.create({
      data: {
        userProfile: {
          connect: { userProfile_id: userProfileId },
        },
        educational_facility,
        major,
        educational_status,
        from: new Date(from),
        to: to == null ? null : new Date(to),
        additional_details,
      },
    });
  }

  async findAll(): Promise<Education[]> {
    return this.prismaService.education.findMany();
  }

  async findOneById(id: string): Promise<Education> {
    return this.prismaService.education.findUnique({
      where: { education_id: id },
    });
  }

  async findManyByUserProfileId(userProfileId: string): Promise<Education[]> {
    return this.prismaService.education.findMany({
      where: { userProfileId: userProfileId },
    });
  }

  async update(
    id: string,
    updateEducationDto: UpdateEducationDto,
  ): Promise<Education> {
    const {
      educational_facility,
      major,
      educational_status,
      from,
      to,
      additional_details,
    } = updateEducationDto;

    return this.prismaService.education.update({
      where: { education_id: id },
      data: {
        educational_facility,
        major,
        educational_status,
        from: from == null ? from : new Date(from),
        to: to == null ? to : new Date(to),
        additional_details,
      },
    });
  }

  async remove(id: string): Promise<Education> {
    return this.prismaService.education.findUnique({
      where: { education_id: id },
    });
  }
}
