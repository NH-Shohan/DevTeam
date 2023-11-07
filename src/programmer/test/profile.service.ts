import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ValidateProgrammerProfile } from './Profile.dto';
import { ProgrammerProfileEntity } from './profile.entity';
import { UpdatePasswordDTO } from './update-password.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProgrammerProfileEntity)
    private programmerProfileRepository: Repository<ProgrammerProfileEntity>,
  ) {}

  //    Post profile Information
  async createUser(
    programmerProfile: ProgrammerProfileEntity,
  ): Promise<ProgrammerProfileEntity> {
    const password = programmerProfile.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    programmerProfile.password = hashedPassword;
    return this.programmerProfileRepository.save(programmerProfile);
  }

  //   Get all profile Information
  async getAllProfileInfo(): Promise<ProgrammerProfileEntity[]> {
    return this.programmerProfileRepository.find();
  }

  //   Get Profile by ID
  async getProfileById(id: number): Promise<ProgrammerProfileEntity> {
    return this.programmerProfileRepository.findOneBy({ id: id });
  }

  //   Get Profile by Name
  async getProfileByName(name: string): Promise<ProgrammerProfileEntity> {
    return this.programmerProfileRepository.findOneBy({ name: name });
  }

  // Update a profile
  async updateProfile(
    id: number,
    updatedProfile: ValidateProgrammerProfile,
  ): Promise<ProgrammerProfileEntity> {
    await this.programmerProfileRepository.update(id, updatedProfile);
    return this.programmerProfileRepository.findOneBy({ id: id });
  }

  // Update a profile
  async updateProfilePassword(
    id: number,
    updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<ProgrammerProfileEntity> {
    await this.programmerProfileRepository.update(id, {
      password: updatePasswordDTO.newPassword,
    });
    return this.programmerProfileRepository.findOneBy({ id: id });
  }

  // Delete a Profile
  async deleteProfile(id: number): Promise<void> {
    await this.programmerProfileRepository.delete(id);
  }

  async searchAllProfileInfo(name: string): Promise<ProgrammerProfileEntity[]> {
    return this.programmerProfileRepository.find({
      where: { name: name },
    });
  }

  // async loginProgile(profileInfo: ) {
  //   const profile = this.programmerProfileRepository.findOneBy({ name: this.profileInfo });
  // }
}
