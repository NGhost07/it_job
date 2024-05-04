import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobPreferenceDto, UpdateJobPreferenceDto } from './dto';
import { JobPreference } from '@prisma/client';

@Injectable()
export class JobPreferenceService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createJobPreferenceDto: CreateJobPreferenceDto,
  ): Promise<JobPreference> {
    const {
      userProfileId,
      job_level,
      current_salary,
      expected_salary,
      working_type,
      company_type,
    } = createJobPreferenceDto;

    return this.prismaService.jobPreference.create({
      data: {
        userProfile: { connect: { userProfile_id: userProfileId } },
        job_level,
        current_salary,
        expected_salary,
        working_type,
        company_type,
      },
    });
  }

  async findAll(): Promise<JobPreference[]> {
    return this.prismaService.jobPreference.findMany();
  }

  async findOneById(id: string): Promise<JobPreference> {
    return this.prismaService.jobPreference.findUnique({
      where: { jobPreference_id: id },
    });
  }

  async findManyByUserProfileId(
    userProfileId: string,
  ): Promise<JobPreference[]> {
    return this.prismaService.jobPreference.findMany({
      where: { userProfileId: userProfileId },
    });
  }

  async updateById(
    id: string,
    updateJobPreferenceDto: UpdateJobPreferenceDto,
  ): Promise<JobPreference> {
    return this.prismaService.jobPreference.update({
      where: { jobPreference_id: id },
      data: updateJobPreferenceDto,
    });
  }

  async removeById(id: string): Promise<JobPreference> {
    return this.prismaService.jobPreference.delete({
      where: { jobPreference_id: id },
    });
  }
}
