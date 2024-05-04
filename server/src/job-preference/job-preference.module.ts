import { Module } from '@nestjs/common';
import { JobPreferenceService } from './job-preference.service';
import { JobPreferenceController } from './job-preference.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [JobPreferenceController],
  providers: [JobPreferenceService, JwtService],
})
export class JobPreferenceModule {}
