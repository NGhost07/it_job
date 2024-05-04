import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSkillDto, UpdateSkillDto } from './dto';
import { Skill } from '@prisma/client';

@Injectable()
export class SkillService {
  constructor(private prismaService: PrismaService) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.prismaService.skill.create({ data: createSkillDto });
  }

  async findAll(): Promise<Skill[]> {
    return this.prismaService.skill.findMany();
  }

  async findOneById(id: string): Promise<Skill> {
    return this.prismaService.skill.findUnique({ where: { skill_id: id } });
  }

  async findOneByName(skill_name: string): Promise<Skill> {
    return this.prismaService.skill.findUnique({
      where: { skill_name: skill_name },
    });
  }

  async updateById(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    return this.prismaService.skill.update({
      where: { skill_id: id },
      data: updateSkillDto,
    });
  }

  async updateByName(
    skill_name: string,
    updateSkillDto: UpdateSkillDto,
  ): Promise<Skill> {
    return this.prismaService.skill.update({
      where: { skill_name: skill_name },
      data: updateSkillDto,
    });
  }

  async removeById(id: string): Promise<Skill> {
    return this.prismaService.skill.delete({ where: { skill_id: id } });
  }

  async removeByName(skill_name: string): Promise<Skill> {
    return this.prismaService.skill.delete({
      where: { skill_name: skill_name },
    });
  }
}
