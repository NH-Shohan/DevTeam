/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // change this to your entity class
import { AdminEntity } from './admin.entity';
import { ValidateAdminProfile } from './admin.dto';
@Injectable()
export class AdminEntityService {
  constructor(
    @InjectRepository(AdminEntity)
    private AdminEntityRepository: Repository<AdminEntity>,
  ) {}
  // AdminEntityRepository is the local repository
  async createAdminEntity(AdminEntity: AdminEntity): Promise<AdminEntity> {
    return this.AdminEntityRepository.save(AdminEntity);
  }
  async getAllAdminEntitys(): Promise<AdminEntity[]> {
    return this.AdminEntityRepository.find();
  }
  async getAdminEntityById(email: string): Promise<AdminEntity> {
    return this.AdminEntityRepository.findOneBy({ email: email });
  }

  // Admin Profile Update
  async updateAdminEntity(
    id: number,
    updatedAdminEntity: ValidateAdminProfile,
  ): Promise<AdminEntity> {
    await this.AdminEntityRepository.update(id, updatedAdminEntity);
    const profile = this.AdminEntityRepository.findOneBy({ id: id });
    return profile;
  }

  async deleteAdminEntity(id: number): Promise<void> {
    await this.AdminEntityRepository.delete(id);
  }
}
