/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // change this to your entity class
import { AdminEntity } from './admin.entity';
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
  async getAdminEntityById(id: number): Promise<AdminEntity> {
    return this.AdminEntityRepository.findOneBy({ id: id });
  }
  async updateAdminEntity(
    id: number,
    updatedAdminEntity: AdminEntity,
  ): Promise<AdminEntity> {
    await this.AdminEntityRepository.update(id, updatedAdminEntity);
    return this.AdminEntityRepository.findOneBy({ id: id });
  }
  async deleteAdminEntity(id: number): Promise<void> {
    await this.AdminEntityRepository.delete(id);
  }
}
