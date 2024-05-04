import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyInforDto, UpdateCompanyInforDto } from './dto';
import { CompanyInfor } from '@prisma/client';

@Injectable()
export class CompanyInforService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createCompanyInforDto: CreateCompanyInforDto,
  ): Promise<CompanyInfor> {
    const {
      userId,
      profile_photo_url,
      cover_photo_url,
      company_name,
      company_location,
      company_type,
      company_size,
      company_overview,
      country,
      working_days,
      overtime_policy,
      website_url,
    } = createCompanyInforDto;

    return this.prismaService.companyInfor.create({
      data: {
        user: {
          connect: { user_id: userId },
        },
        profile_photo_url,
        cover_photo_url,
        company_name,
        company_location,
        company_type,
        company_size,
        company_overview,
        country,
        working_days,
        overtime_policy,
        website_url,
      },
    });
  }

  async findAll(): Promise<CompanyInfor[]> {
    return this.prismaService.companyInfor.findMany();
  }

  async findOneById(id: string): Promise<CompanyInfor> {
    return this.prismaService.companyInfor.findUnique({
      where: { companyInfor_id: id },
    });
  }

  async findOneByUserId(userId: string): Promise<CompanyInfor> {
    return this.prismaService.companyInfor.findUnique({
      where: { userId: userId },
    });
  }

  async findOneByName(name: string): Promise<CompanyInfor> {
    return this.prismaService.companyInfor.findUnique({
      where: { company_name: name },
    });
  }

  async updateById(
    id: string,
    updateCompanyInforDto: UpdateCompanyInforDto,
  ): Promise<CompanyInfor> {
    return this.prismaService.companyInfor.update({
      where: { companyInfor_id: id },
      data: updateCompanyInforDto,
    });
  }

  async updateByUserId(
    userId: string,
    updateCompanyInforDto: UpdateCompanyInforDto,
  ): Promise<CompanyInfor> {
    return this.prismaService.companyInfor.update({
      where: { userId: userId },
      data: updateCompanyInforDto,
    });
  }

  async removeById(id: string): Promise<CompanyInfor> {
    return this.prismaService.companyInfor.delete({
      where: { companyInfor_id: id },
    });
  }

  async removeByUserId(userId: string): Promise<CompanyInfor> {
    return this.prismaService.companyInfor.delete({
      where: { userId: userId },
    });
  }
}
