import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExperienceEntity } from './experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(ExperienceEntity)
    private experienceRepository: Repository<ExperienceEntity>,
  ) {}

  // Add Work Experience
  async addWorkExperience(
    experienceInfo: ExperienceEntity,
  ): Promise<ExperienceEntity> {
    return this.experienceRepository.save(experienceInfo);
  }

  // Get All Work Experiences
  async getAllWorkExperiences(): Promise<ExperienceEntity[]> {
    return this.experienceRepository.find();
  }

  // Get single Work Experience Details
  async getSingleWorkExperienceById(
    experienceId: number,
  ): Promise<ExperienceEntity> {
    return this.experienceRepository.findOneBy({ id: experienceId });
  }

  // Update Work Experience
  async updateWorkExperience(
    experienceId: number,
    updatedExperience: ExperienceEntity,
  ): Promise<ExperienceEntity> {
    await this.experienceRepository.update(experienceId, updatedExperience);
    return this.experienceRepository.findOneBy({ id: experienceId });
  }

  // Delete Work Experience
  async deleteWorkExperience(experienceId: number): Promise<void> {
    await this.experienceRepository.delete(experienceId);
  }
}
