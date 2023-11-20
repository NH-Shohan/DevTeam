/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // change this to your entity class
import { ValidateRecruiterProfile } from './recruiter.dto';
import { RecruiterEntity } from './recruiter.entity';
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

  // See all candidates
  async getCandidates(): Promise<CandidateEntity[]> {
    try {
      return await this.candidateRepository.find();
    } catch (error) {
      throw new Error('Error fetching candidates');
    }
  }

  // Approve Candidate for Job
  async approveCandidatesForJob(body: any): Promise<any> {
    // Implement your logic here
    try {
      // Your approval logic
      return { message: 'Candidates approved successfully' };
    } catch (error) {
      throw new Error('Error approving candidates');
    }
  }

  // Reject Candidate
  async rejectCandidates(body: any): Promise<any> {
    // Implement your logic here
    try {
      // Your rejection logic
      return { message: 'Candidates rejected successfully' };
    } catch (error) {
      throw new Error('Error rejecting candidates');
    }
  }

  // Approve Interview Request
  async approveInterviewRequest(body: any): Promise<any> {
    // Implement your logic here
    try {
      // Your approval logic
      return { message: 'Interview request approved successfully' };
    } catch (error) {
      throw new Error('Error approving interview request');
    }
  }

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
}
