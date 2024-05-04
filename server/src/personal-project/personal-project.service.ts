import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePersonalProjectDto, UpdatePersonalProjectDto } from './dto';
import { PersonalProject } from '@prisma/client';

@Injectable()
export class PersonalProjectService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createPersonalProjectDto: CreatePersonalProjectDto,
  ): Promise<PersonalProject> {
    const {
      userProfileId,
      personalProject_name,
      start_date,
      end_date,
      description,
      project_url,
    } = createPersonalProjectDto;

    return this.prismaService.personalProject.create({
      data: {
        userProfile: {
          connect: { userProfile_id: userProfileId },
        },
        personalProject_name,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        description,
        project_url,
      },
    });
  }

  async findAll(): Promise<PersonalProject[]> {
    return this.prismaService.personalProject.findMany();
  }

  async findOneById(id: string): Promise<PersonalProject> {
    return this.prismaService.personalProject.findUnique({
      where: { personalProject_id: id },
    });
  }

  async findManyByUserProfileId(
    userProfileId: string,
  ): Promise<PersonalProject[]> {
    return this.prismaService.personalProject.findMany({
      where: { userProfileId: userProfileId },
    });
  }

  async update(
    id: string,
    updatePersonalProjectDto: UpdatePersonalProjectDto,
  ): Promise<PersonalProject> {
    const {
      personalProject_name,
      start_date,
      end_date,
      description,
      project_url,
    } = updatePersonalProjectDto;

    return this.prismaService.personalProject.update({
      where: { personalProject_id: id },
      data: {
        personalProject_name,
        start_date: start_date == null ? start_date : new Date(start_date),
        end_date: end_date == null ? end_date : new Date(end_date),
        description,
        project_url,
      },
    });
  }

  async remove(id: string): Promise<PersonalProject> {
    return this.prismaService.personalProject.findUnique({
      where: { personalProject_id: id },
    });
  }
}
