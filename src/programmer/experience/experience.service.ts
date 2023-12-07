import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      return this.experienceRepository.save(experienceInfo);
    } catch (error) {
      throw new Error('Error adding work experience');
    }
  }

  // Get All Work Experiences
  async getAllWorkExperiences(): Promise<ExperienceEntity[]> {
    try {
      return this.experienceRepository.find();
    } catch (error) {
      throw new Error('Error getting all work experiences');
    }
  }

  // Get single Work Experience Details
  async getSingleWorkExperienceById(
    experienceId: number,
  ): Promise<ExperienceEntity> {
    try {
      const experience = await this.experienceRepository.findOneBy({
        id: experienceId,
      });
      if (!experience) {
        throw new NotFoundException('Work experience not found');
      }
      return experience;
    } catch (error) {
      throw new Error('Error getting single work experience');
    }
  }

  // Update Work Experience
  async updateWorkExperience(
    experienceId: number,
    updatedExperience: ExperienceEntity,
  ): Promise<ExperienceEntity> {
    try {
      await this.experienceRepository.update(experienceId, updatedExperience);
      const experience = await this.experienceRepository.findOneBy({
        id: experienceId,
      });
      if (!experience) {
        throw new NotFoundException('Work experience not found');
      }
      return experience;
    } catch (error) {
      throw new Error('Error updating work experience');
    }
  }

  // Delete Work Experience
  async deleteWorkExperience(experienceId: number): Promise<void> {
    try {
      await this.experienceRepository.delete(experienceId);
    } catch (error) {
      throw new Error('Error deleting work experience');
    }
  }
}
