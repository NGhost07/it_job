import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDto, UpdateCityDto } from './dto';
import { City, CompanyInfor, JobPreference } from '@prisma/client';

@Injectable()
export class CityService {
  constructor(private prismaService: PrismaService) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    return this.prismaService.city.create({ data: createCityDto });
  }

  async findAll(): Promise<City[]> {
    return this.prismaService.city.findMany();
  }

  async findOneById(id: string): Promise<City> {
    return this.prismaService.city.findUnique({ where: { city_id: id } });
  }

  async findJobPreferencesById(id: string): Promise<JobPreference[]> {
    return this.prismaService.jobPreference.findMany({
      where: { cities: { some: { cityId: id } } },
    });
  }

  async findJobPreferencesByName(name: string): Promise<JobPreference[]> {
    const cityId = (await this.findOneByName(name)).city_id;

    return this.prismaService.jobPreference.findMany({
      where: { cities: { some: { cityId: cityId } } },
    });
  }

  async findCompaniesInforById(id: string): Promise<CompanyInfor[]> {
    return this.prismaService.companyInfor.findMany({
      where: { cities: { some: { cityId: id } } },
    });
  }

  async findCompaniesInforByName(name: string): Promise<CompanyInfor[]> {
    const cityId = (await this.findOneByName(name)).city_id;

    return this.prismaService.companyInfor.findMany({
      where: { cities: { some: { cityId: cityId } } },
    });
  }

  async findOneByName(name: string): Promise<City> {
    return this.prismaService.city.findUnique({ where: { city_name: name } });
  }

  async updateById(id: string, updateCityDto: UpdateCityDto): Promise<City> {
    return this.prismaService.city.update({
      where: { city_id: id },
      data: updateCityDto,
    });
  }

  async updateByName(
    name: string,
    updateCityDto: UpdateCityDto,
  ): Promise<City> {
    return this.prismaService.city.update({
      where: { city_name: name },
      data: updateCityDto,
    });
  }

  async removeById(id: string) {
    return this.prismaService.city.delete({ where: { city_id: id } });
  }

  async removeByName(name: string) {
    return this.prismaService.city.delete({ where: { city_name: name } });
  }
}
