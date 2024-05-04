import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [SkillController],
  providers: [SkillService, JwtService],
})
export class SkillModule {}
