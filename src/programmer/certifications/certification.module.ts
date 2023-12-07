import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificationsController } from './certification.controller';
import { CertificationEntity } from './certification.entity';
import { CertificationsService } from './certification.service';

@Module({
  imports: [TypeOrmModule.forFeature([CertificationEntity])],
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}
