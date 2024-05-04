import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EducationController],
  providers: [EducationService, JwtService],
})
export class EducationModule {}
