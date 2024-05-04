import { Module } from '@nestjs/common';
import { PersonalProjectService } from './personal-project.service';
import { PersonalProjectController } from './personal-project.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PersonalProjectController],
  providers: [PersonalProjectService, JwtService],
})
export class PersonalProjectModule {}
