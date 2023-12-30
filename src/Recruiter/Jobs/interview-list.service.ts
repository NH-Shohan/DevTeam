// interview-list.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterviewListEntity } from '../interview_list.entity';

@Injectable()
export class InterviewListService {
  constructor(
    @InjectRepository(InterviewListEntity)
    private readonly interviewListRepository: Repository<InterviewListEntity>,
  ) {}

  async createInterviewList(
    interviewListData: Partial<InterviewListEntity>,
  ): Promise<InterviewListEntity> {
    const interviewList =
      this.interviewListRepository.create(interviewListData);
    return this.interviewListRepository.save(interviewList);
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
