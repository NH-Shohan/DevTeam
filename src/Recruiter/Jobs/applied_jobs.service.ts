// applied-jobs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppliedJobsEntity } from '../applied_jobs.entity';
import { ProfileEntity } from 'src/programmer/profile/profile.entity';

@Injectable()
export class AppliedJobsService {
  constructor(
    @InjectRepository(AppliedJobsEntity)
    private readonly appliedJobsRepository: Repository<AppliedJobsEntity>,
    @InjectRepository(AppliedJobsEntity)
    private readonly profileEntityRepository: Repository<ProfileEntity>,
  ) {}

  async createAppliedJob(
    appliedJobData: Partial<AppliedJobsEntity>,
  ): Promise<AppliedJobsEntity> {
    try {
      // // Check if an applied job with the same availableJob and programmer already exists
      // const existingAppliedJob = await this.appliedJobsRepository.findOne({
      //   where: {
      //     availableJob: { id: appliedJobData.availableJob.id },
      //     programmer: { email: appliedJobData.programmer.email },
      //   },
      // });

      // if (existingAppliedJob) {
      //   // Return existing applied job
      //   console.log({ 'line 29': existingAppliedJob });
      //   console.log({ 'line 30': appliedJobData });
      //   throw new Error('Already Applied');
      // } else {
      // Create a new applied job
      const newAppliedJob = this.appliedJobsRepository.create(appliedJobData);
      console.log({ 'line 36': newAppliedJob });
      return this.appliedJobsRepository.save(newAppliedJob);
      // }
    } catch (error) {
      // Handle errors or rethrow
      console.error(error);
      throw new Error('Failed to create or find applied job');
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

  // In your service (applied_jobs.service.ts)
  // applied_jobs.service.ts

  async findAllAppliedJobsByEmail(email: string): Promise<any[]> {
    try {
      // Find applied jobs where the email matches either companyEmail or programmer email
      const appliedJobs = await this.appliedJobsRepository.find({
        where: [{ companyEmail: email }, { programmer: { email } }],
        relations: [
          'availableJob',
          'programmer',
          // Add other relations as needed
        ],
      });

      // If the email is a recruiter email, also find applied jobs based on the availableJob's recruiter
      const appliedJobsForRecruiter = await this.appliedJobsRepository
        .createQueryBuilder('appliedJob')
        .leftJoinAndSelect('appliedJob.availableJob', 'availableJob')
        .leftJoinAndSelect('availableJob.interviewer', 'recruiter')
        .where('recruiter.email = :email', { email })
        .getMany();

      // Merge the results from both queries
      const allAppliedJobs = [...appliedJobs, ...appliedJobsForRecruiter];

      return allAppliedJobs;
    } catch (error) {
      // Handle errors or rethrow
      console.error(error);
      throw new Error('Failed to fetch applied jobs');
    }
  }

  // Implement other methods as needed
}
