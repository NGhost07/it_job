import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CityController],
  providers: [CityService, JwtService],
})
export class CityModule {}
