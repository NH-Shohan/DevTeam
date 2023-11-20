/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // change this to your entity class
import { ValidateRecruiterProfile } from './recruiter.dto';
import {
  CandidateEntity,
  InterviewEntity,
  RecruiterEntity,
} from './recruiter.entity';
@Injectable()
export class RecruiterEntityService {
  constructor(
    @InjectRepository(RecruiterEntity)
    private RecruiterEntityRepository: Repository<RecruiterEntity>,
    @InjectRepository(InterviewEntity)
    private interviewRepository: Repository<InterviewEntity>,
    @InjectRepository(CandidateEntity)
    private candidateRepository: Repository<CandidateEntity>,
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
    return this.RecruiterEntityRepository.findOneBy({
      email: email,
      password: password,
    });
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

  // Recruit Team
  async recruitTeam(body: any): Promise<any> {
    // Implement your logic here
    try {
      // Your recruitment logic
      return { message: 'Team recruited successfully' };
    } catch (error) {
      throw new Error('Error recruiting team');
    }
  }

  // Candidates
  // ----------------------------------------------------------

  async createCandidate(profile): Promise<CandidateEntity[]> {
    try {
      return await this.candidateRepository.save(profile);
    } catch (error) {
      throw new Error('Error fetching candidates');
    }
  }
  
  async getCandidates(): Promise<CandidateEntity[]> {
    try {
      return await this.candidateRepository.find();
    } catch (error) {
      throw new Error('Error fetching candidates');
    }
  }

  // Approve Candidate for Job
  async approveCandidatesForJob(body: any): Promise<any> {
    try {
      const { candidateId } = body;
      const candidate = await this.candidateRepository.findOne(candidateId);

      if (!candidate) {
        throw new Error('Candidate not found');
      }

      candidate.status = 'Okay';
      await this.candidateRepository.save(candidate);

      return { message: 'Candidate approved successfully' };
    } catch (error) {
      throw new Error('Error approving candidates');
    }
  }

  // Reject Candidate
  async rejectCandidates(body: any): Promise<any> {
    try {
      const { candidateId } = body;
      const candidate = await this.candidateRepository.findOne(candidateId);

      if (!candidate) {
        throw new Error('Candidate not found');
      }

      candidate.status = 'Rejected';
      await this.candidateRepository.save(candidate);

      return { message: 'Candidate rejected successfully' };
    } catch (error) {
      throw new Error('Error rejecting candidates');
    }
  }

  // Interview
  // ----------------------------------------------------

  // Reject Company Request
  async rejectCompanyRequest(body: any): Promise<any> {
    // Implement your logic here
    try {
      // Your rejection logic
      return { message: 'Company request rejected successfully' };
    } catch (error) {
      throw new Error('Error rejecting company request');
    }
  }

  // View messages from Candidates
  async getMessagesFromCandidates(): Promise<any> {
    try {
      // Your logic to fetch messages from candidates
      return { messages: [] };
    } catch (error) {
      throw new Error('Error fetching messages from candidates');
    }
  }

  // View messages from Companies
  async getMessagesFromCompanies(): Promise<any> {
    try {
      // Your logic to fetch messages from companies
      return { messages: [] };
    } catch (error) {
      throw new Error('Error fetching messages from companies');
    }
  }

  // Interview
  // ----------------------------------------------------

  // Get Interview List
  async getInterviewList(): Promise<any> {
    try {
      const interviews = await this.interviewRepository.find();
      return {
        message: 'Interview list retrieved successfully',
        data: interviews,
      };
    } catch (error) {
      throw new Error('Error fetching interview list');
    }
  }

  // Set Interview
  async setInterview(body: any): Promise<any> {
    try {
      const interview = this.interviewRepository.create(body);
      await this.interviewRepository.save(interview);
      return {
        message: 'Interview set successfully',
        data: interview,
      };
    } catch (error) {
      throw new Error('Error setting interview');
    }
  }

  // Update Interview
  async updateInterview(interviewId: string, updateData: any): Promise<any> {
    try {
      await this.interviewRepository.update(interviewId, updateData);
      return {
        message: 'Interview updated successfully',
        data: {
          updateData,
        },
      };
    } catch (error) {
      throw new Error('Error updating interview');
    }
  }

  // Delete Interview
  async deleteInterview(developerEmail: string): Promise<any> {
    try {
      await this.interviewRepository.delete({ email: developerEmail });
      return {
        message: 'Interview deleted successfully',
        data: 'deletedInterview',
      };
    } catch (error) {
      throw new Error('Error deleting interview');
    }
  }

  // Approve Interview Request
  async approveInterviewRequest(body: any): Promise<any> {
    try {
      const { interviewId } = body;
      const interview = await this.interviewRepository.findOne(interviewId);

      if (!interview) {
        throw new Error('Interview not found');
      }

      // Your approval logic, for example, updating the status
      interview.status = 'Approved';
      await this.interviewRepository.save(interview);

      return { message: 'Interview request approved successfully' };
    } catch (error) {
      throw new Error('Error approving interview request');
    }
  }

  // Interview Team
  // async interviewTeam(body: any): Promise<any> {
  //   // Implement your logic here
  //   try {
  //     // Your logic for interviewing team members
  //     return { message: 'Team members interviewed successfully' };
  //   } catch (error) {
  //     throw new Error('Error interviewing team members');
  //   }
  // }
}
