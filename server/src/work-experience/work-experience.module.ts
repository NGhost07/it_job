import { Module } from '@nestjs/common';
import { WorkExperienceService } from './work-experience.service';
import { WorkExperienceController } from './work-experience.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService, JwtService],
})
export class WorkExperienceModule {}
