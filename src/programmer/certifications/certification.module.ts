import { Module } from '@nestjs/common';
import { CertificationsController } from './certification.controller';
import { CertificationsService } from './certification.service';

@Module({
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
