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

  async findAllAppliedJobs(): Promise<any[]> {
    return this.appliedJobsRepository.find({
      relations: [
        'availableJob',
        'programmer',
        // Add other relations as needed
      ],
    });
  }

  // Implement other methods as needed
}
