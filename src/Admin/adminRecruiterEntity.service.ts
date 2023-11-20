/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // change this to your entity class
import { AdminRecruiterEntity } from './AdminRecruiter.entity';
import { ValidateAdminRecruiterProfile } from './admin.dto';
import { AdminRecruiterEntity } from './adminRecruiter.entity';
@Injectable()
export class AdminRecruiterEntityService {
  constructor(
    @InjectRepository(AdminRecruiterEntity)
    private RecruiterEntityRepository: Repository<AdminRecruiterEntity>,
  ) {}
  // RecruiterEntityRepository is the local repository
  async createRecruiterEntity(
    Profile: AdminRecruiterEntity,
  ): Promise<AdminRecruiterEntity> {
    return this.RecruiterEntityRepository.save(Profile);
  }
  async getAllRecruiterEntitys(): Promise<AdminRecruiterEntity[]> {
    return this.RecruiterEntityRepository.find();
  }
  async getRecruiterEntityById(id: number): Promise<AdminRecruiterEntity> {
    return this.RecruiterEntityRepository.findOneBy({ id: id });
  }
  async updateRecruiterEntity(
    id: number,
    updatedRecruiterEntity: AdminRecruiterEntity,
  ): Promise<AdminRecruiterEntity> {
    await this.RecruiterEntityRepository.update(id, updatedRecruiterEntity);
    return this.RecruiterEntityRepository.findOneBy({ id: id });
  }
  async deleteRecruiterEntity(id: number): Promise<void> {
    await this.RecruiterEntityRepository.delete(id);
  }
}
