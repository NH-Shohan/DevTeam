/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // change this to your entity class
import { GrowthEntity } from './growth.entity';
@Injectable()
export class GrowthEntityService {
  constructor(
    @InjectRepository(GrowthEntity)
    private growthRep: Repository<GrowthEntity>,
  ) {}
  // RecruiterEntityRepository is the local repository
  async createGrowth(Profile: GrowthEntity): Promise<GrowthEntity> {
    return this.growthRep.save(Profile);
  }
  async getAllGrowth(): Promise<GrowthEntity[]> {
    return this.growthRep.find();
  }
}
