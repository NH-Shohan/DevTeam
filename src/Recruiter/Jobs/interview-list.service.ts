// interview-list.service.ts
import { Injectable } from '@nestjs/common';
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

  // Implement other methods as needed
}
