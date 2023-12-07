import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificationDTO } from './certification.dto';
import { CertificationEntity } from './certification.entity';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(CertificationEntity)
    private certificationsRepository: Repository<CertificationEntity>,
  ) {}

  // Add Certification
  async addCertification(
    certificationsInfo: CertificationDTO,
  ): Promise<CertificationEntity> {
    try {
      return await this.certificationsRepository.save(certificationsInfo);
    } catch (error) {
      throw new Error('Error adding certification');
    }
  }

  // Get All Certifications
  async getAllCertifications(): Promise<CertificationEntity[]> {
    try {
      return await this.certificationsRepository.find();
    } catch (error) {
      throw new Error('Error fetching certifications');
    }
  }

  // Update Certification
  async updateCertifications(
    certificationId: number,
    certificationsInfo: CertificationDTO,
  ): Promise<CertificationEntity> {
    try {
      await this.certificationsRepository.update(
        certificationId,
        certificationsInfo,
      );
      return await this.certificationsRepository.findOneBy({
        id: certificationId,
      });
    } catch (error) {
      throw new Error('Error updating certification');
    }
  }

  // Delete Certification
  async deleteCertification(certificationId: number): Promise<void> {
    try {
      await this.certificationsRepository.delete(certificationId);
    } catch (error) {
      throw new Error('Error deleting certification');
    }
  }
}
