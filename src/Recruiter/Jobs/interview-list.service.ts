// interview-list.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterviewListEntity } from '../interview_list.entity';
import { AppliedJobsEntity } from '../applied_jobs.entity';
import { CompanyEntity } from 'src/company/company.entity';
import { RecruiterEntity } from '../recruiter.entity';

@Injectable()
export class InterviewListService {
  constructor(
    @InjectRepository(InterviewListEntity)
    private interviewListRepository: Repository<InterviewListEntity>,
    @InjectRepository(AppliedJobsEntity)
    private appliedJobsRepository: Repository<AppliedJobsEntity>,
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    @InjectRepository(RecruiterEntity)
    private recruiterRepository: Repository<RecruiterEntity>,
  ) {}

  async createInterviewList(
    interviewListData: Partial<InterviewListEntity>,
  ): Promise<InterviewListEntity> {
    try {
      // const appliedJob = await this.appliedJobsRepository.findOneBy([
      //   { companyEmail: JSON.stringify(interviewListData.appliedJob) },
      // ]);

      // const recruiter = await this.recruiterRepository.findOneBy([
      //   { email: JSON.stringify(interviewListData.recruiter) },
      // ]);

      // const company = await this.companyRepository.findOneBy([
      //   { email: JSON.stringify(interviewListData.company) },
      // ]);

      // console.log({ interviewListData });
      const interviewList = this.interviewListRepository.create({
        ...interviewListData,
        // appliedJob,
        // recruiter,
        // company,
      });
      return await this.interviewListRepository.save(interviewList);
    } catch (error) {
      console.log(error);
      // Handle the error, you might want to throw an exception or return an error response.
      throw new Error('Failed to create interview list');
    }
  }

  async findAllInterviewLists(): Promise<InterviewListEntity[]> {
    return this.interviewListRepository.find({
      relations: [
        'appliedJob',
        'appliedJob.availableJob',
        'appliedJob.programmer',
        // 'recruiter',
        // 'company',
      ],
    });
  }

  async findInterviewListByEmail(
    email: string,
  ): Promise<InterviewListEntity[]> {
    const interviewLists = await this.interviewListRepository
      .createQueryBuilder('interviewList')
      .leftJoinAndSelect('interviewList.appliedJob', 'appliedJob')
      .leftJoinAndSelect('interviewList.recruiter', 'recruiter')
      .leftJoinAndSelect('interviewList.company', 'company')
      .where(
        '(recruiter.email = :email OR company.email = :email OR appliedJob.programmer.email = :email)',
        { email },
      )
      .getMany();

    if (!interviewLists || interviewLists.length === 0) {
      throw new NotFoundException('Interview lists not found');
    }

    return interviewLists;
  }

  // Implement other methods as needed
}
