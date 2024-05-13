import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto, UpdateJobDto } from './dto';
import { Job } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prismaService: PrismaService) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const {
      companyInforId,
      title,
      description,
      requirements,
      benefits,
      jobLevels,
      salary_min,
      salary_max,
      working_type,
    } = createJobDto;

    return this.prismaService.job.create({
      data: {
        companyInfor: {
          connect: { companyInfor_id: companyInforId },
        },
        title,
        description,
        requirements,
        benefits,
        jobLevels,
        salary_min,
        salary_max,
        working_type,
      },
    });
  }

  async findAll(): Promise<Job[]> {
    return this.prismaService.job.findMany();
  }

  async findOneById(id: string): Promise<Job> {
    return this.prismaService.job.findUnique({ where: { job_id: id } });
  }

  async findManyByCompanyInforId(copanyInforId: string): Promise<Job[]> {
    return this.prismaService.job.findMany({
      where: { companyInforId: copanyInforId },
    });
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    return this.prismaService.job.update({
      where: { job_id: id },
      data: updateJobDto,
    });
  }

  async remove(id: string): Promise<Job> {
    return this.prismaService.job.delete({ where: { job_id: id } });
  }

  async findByTitle(title: string): Promise<Job[]> {
    return await this.prismaService.job.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
  }

  async findJobsUserApplied(user_id: string): Promise<Job[]> {
    const userProfile = await this.prismaService.userProfile.findUnique({
      where: { userId: user_id },
    });

    const jobs = await this.prismaService.job.findMany({
      where: {
        UserProfiles: {
          some: { userProfileId: userProfile.userProfile_id },
        },
      },
    });

    console.log(user_id);
    return jobs;
  }
}
