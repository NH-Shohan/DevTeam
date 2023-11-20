/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // change this to your entity class
import { InterviewEntity, RecruiterEntity } from './recruiter.entity';
import { ValidateRecruiterProfile } from './recruiter.dto';
@Injectable()
export class RecruiterEntityService {
  constructor(
    @InjectRepository(RecruiterEntity)
    private RecruiterEntityRepository: Repository<RecruiterEntity>,
  ) {}
  // RecruiterEntityRepository is the local repository
  async createRecruiterEntity(
    Profile: RecruiterEntity,
  ): Promise<RecruiterEntity> {
    return this.RecruiterEntityRepository.save(Profile);
  }
  async getAllRecruiterEntitys(): Promise<RecruiterEntity[]> {
    return this.RecruiterEntityRepository.find();
  }
  async getRecruiterEntityById(id: number): Promise<RecruiterEntity> {
    return this.RecruiterEntityRepository.findOneBy({ id: id });
  }
  async signIn(email, password): Promise<RecruiterEntity> {
    return this.RecruiterEntityRepository.findOneBy({ email: email, password: password });
  }
  async updateRecruiterEntity(
    id: number,
    updatedRecruiterEntity: ValidateRecruiterProfile,
  ): Promise<RecruiterEntity> {
    await this.RecruiterEntityRepository.update(id, updatedRecruiterEntity);
    return this.RecruiterEntityRepository.findOneBy({ id: id });
  }
  async deleteRecruiterEntity(id: number): Promise<void> {
    await this.RecruiterEntityRepository.delete(id);
  }

}

@Injectable()
export class InterviewEntityService {
  constructor(
    @InjectRepository(InterviewEntity)
    private InterviewEntityRepository: Repository<InterviewEntity>,
  ) {}
  // InterviewEntityRepository is the local repository
  async createInterviewEntity(
    Profile: InterviewEntity,
  ): Promise<InterviewEntity> {
    return this.InterviewEntityRepository.save(Profile);
  }
  async getAllInterviewEntitys(): Promise<InterviewEntity[]> {
    return this.InterviewEntityRepository.find();
  }
  async getInterviewEntityById(id: number): Promise<InterviewEntity> {
    return this.InterviewEntityRepository.findOneBy({ id: id });
  }
  async updateInterviewEntity(
    id: number,
    updatedInterviewEntity: InterviewEntity,
  ): Promise<InterviewEntity> {
    await this.InterviewEntityRepository.update(id, updatedInterviewEntity);
    return this.InterviewEntityRepository.findOneBy({ id: id });
  }
  async deleteInterviewEntity(id: number): Promise<void> {
    await this.InterviewEntityRepository.delete(id);
  }
}
