// applied-jobs.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppliedJobsEntity } from '../applied_jobs.entity';

@Injectable()
export class AppliedJobsService {
  constructor(
    @InjectRepository(AppliedJobsEntity)
    private readonly appliedJobsRepository: Repository<AppliedJobsEntity>,
  ) {}

  async createAppliedJob(
    appliedJobData: Partial<AppliedJobsEntity>,
  ): Promise<AppliedJobsEntity> {
    const appliedJob = this.appliedJobsRepository.create(appliedJobData);
    return this.appliedJobsRepository.save(appliedJob);
  }

  // Implement other methods as needed
}
