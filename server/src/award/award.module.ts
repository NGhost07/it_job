import { Module } from '@nestjs/common';
import { AwardService } from './award.service';
import { AwardController } from './award.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AwardController],
  providers: [AwardService, JwtService],
})
export class AwardModule {}
