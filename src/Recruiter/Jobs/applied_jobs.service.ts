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
    const { availableJob, programmer } = appliedJobData;

    const existingAppliedJob = await this.appliedJobsRepository.findOne({
      where: {
        availableJob: { id: availableJob?.id }, // Assuming availableJob has an 'id' property
        programmer: { email: programmer?.email }, // Assuming programmer has an 'email' property
      },
    });

    if (existingAppliedJob) {
      // Update existing applied job data
      Object.assign(existingAppliedJob, appliedJobData);
      return this.appliedJobsRepository.save(existingAppliedJob);
    } else {
      // Create a new applied job
      const newAppliedJob = this.appliedJobsRepository.create(appliedJobData);
      return this.appliedJobsRepository.save(newAppliedJob);
    }
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
