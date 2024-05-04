import { Module } from '@nestjs/common';
import { UserProfileController } from './user-profile.controller';
import { JwtService } from '@nestjs/jwt';
import { UserProfileService } from './user-profile.service';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService, JwtService],
})
export class UserProfileModule {}
