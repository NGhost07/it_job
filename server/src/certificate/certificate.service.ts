import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCertificateDto, UpdateCertificateDto } from './dto';
import { Certificate } from '@prisma/client';

@Injectable()
export class CertificateService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createCertificateDto: CreateCertificateDto,
  ): Promise<Certificate> {
    const {
      userProfileId,
      certificate_name,
      certificate_url,
      organization,
      issue_date,
      description,
    } = createCertificateDto;

    return this.prismaService.certificate.create({
      data: {
        userProfile: {
          connect: { userProfile_id: userProfileId },
        },
        certificate_name,
        certificate_url,
        organization,
        issue_date: new Date(issue_date),
        description,
      },
    });
  }

  async findAll(): Promise<Certificate[]> {
    return this.prismaService.certificate.findMany();
  }

  async findOneById(id: string): Promise<Certificate> {
    return this.prismaService.certificate.findUnique({
      where: { certificate_id: id },
    });
  }

  async findManyByUserProfileId(userProfileId: string): Promise<Certificate[]> {
    return this.prismaService.certificate.findMany({
      where: { userProfileId: userProfileId },
    });
  }

  async update(
    id: string,
    updateCertificateDto: UpdateCertificateDto,
  ): Promise<Certificate> {
    const {
      certificate_name,
      certificate_url,
      organization,
      issue_date,
      description,
    } = updateCertificateDto;

    return this.prismaService.certificate.update({
      where: { certificate_id: id },
      data: {
        certificate_name,
        certificate_url,
        organization,
        issue_date: issue_date == null ? issue_date : new Date(issue_date),
        description,
      },
    });
  }

  async remove(id: string): Promise<Certificate> {
    return this.prismaService.certificate.delete({
      where: { certificate_id: id },
    });
  }
}
