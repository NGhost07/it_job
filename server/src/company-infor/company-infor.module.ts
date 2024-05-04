import { Module } from '@nestjs/common';
import { CompanyInforService } from './company-infor.service';
import { CompanyInforController } from './company-infor.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CompanyInforController],
  providers: [CompanyInforService, JwtService],
})
export class CompanyInforModule {}
