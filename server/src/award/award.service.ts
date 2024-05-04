import { Injectable } from '@nestjs/common';
import { Award } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAwardDto, UpdateAwardDto } from './dto';

@Injectable()
export class AwardService {
  constructor(private prismaService: PrismaService) {}

  async create(createAwardDto: CreateAwardDto): Promise<Award> {
    const { userProfileId, award_name, award_url, issue_date, description } =
      createAwardDto;

    return this.prismaService.award.create({
      data: {
        userProfile: { connect: { userProfile_id: userProfileId } },
        award_name,
        award_url,
        issue_date: issue_date == null ? issue_date : new Date(issue_date),
        description,
      },
    });
  }

  async findAll(): Promise<Award[]> {
    return this.prismaService.award.findMany();
  }

  async findOneById(id: string): Promise<Award> {
    return this.prismaService.award.findUnique({ where: { award_id: id } });
  }

  async findManyByUserProfileId(userProfileId: string): Promise<Award[]> {
    return this.prismaService.award.findMany({
      where: { userProfileId: userProfileId },
    });
  }

  async update(id: string, updateAwardDto: UpdateAwardDto): Promise<Award> {
    const { award_name, award_url, issue_date, description } = updateAwardDto;

    return this.prismaService.award.update({
      where: { award_id: id },
      data: {
        award_name,
        award_url,
        issue_date: issue_date == null ? issue_date : new Date(issue_date),
        description,
      },
    });
  }

  async remove(id: string): Promise<Award> {
    return this.prismaService.award.delete({ where: { award_id: id } });
  }
}
