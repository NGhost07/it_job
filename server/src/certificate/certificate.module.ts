import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CertificateController],
  providers: [CertificateService, JwtService],
})
export class CertificateModule {}
