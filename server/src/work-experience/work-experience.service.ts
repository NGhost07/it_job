import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkExperienceDto, UpdateWorkExperienceDto } from './dto';
import { WorkExperience } from '@prisma/client';

@Injectable()
export class WorkExperienceService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createWorkExperienceDto: CreateWorkExperienceDto,
  ): Promise<WorkExperience> {
    const {
      userProfileId,
      job_title,
      company,
      from,
      to,
      description,
      project,
    } = createWorkExperienceDto;

    return this.prismaService.workExperience.create({
      data: {
        userProfile: {
          connect: { userProfile_id: userProfileId },
        },
        job_title,
        company,
        from: new Date(from),
        to: new Date(to),
        description,
        project,
      },
    });
  }

  async findAll(): Promise<WorkExperience[]> {
    return this.prismaService.workExperience.findMany();
  }

  async findOneById(id: string): Promise<WorkExperience> {
    return this.prismaService.workExperience.findUnique({
      where: { workExperience_id: id },
    });
  }

  async findManyByUserProfileId(
    userProfileId: string,
  ): Promise<WorkExperience[]> {
    return this.prismaService.workExperience.findMany({
      where: { userProfileId: userProfileId },
    });
  }

  async update(
    id: string,
    updateWorkExperienceDto: UpdateWorkExperienceDto,
  ): Promise<WorkExperience> {
    const { job_title, company, from, to, description, project } =
      updateWorkExperienceDto;

    return this.prismaService.workExperience.update({
      where: { workExperience_id: id },
      data: {
        job_title,
        company,
        from: from == null ? from : new Date(from),
        to: to == null ? to : new Date(to),
        description,
        project,
      },
    });
  }

  async remove(id: string): Promise<WorkExperience> {
    return this.prismaService.workExperience.delete({
      where: { workExperience_id: id },
    });
  }
}
