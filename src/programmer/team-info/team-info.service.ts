import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamInfoDTO } from './team-info.dto';
import { TeamInfoEntity } from './team-info.entity';

@Injectable()
export class TeamInfoService {
  constructor(
    @InjectRepository(TeamInfoEntity)
    private teamInfoRepository: Repository<TeamInfoEntity>,
  ) {}

  // Post team Information
  async postTeamInformation(teamInfo: TeamInfoEntity): Promise<TeamInfoEntity> {
    return this.teamInfoRepository.save(teamInfo);
  }

  // Get All Team Info
  async getAllTeamInfo(): Promise<TeamInfoEntity[]> {
    return this.teamInfoRepository.find();
  }

  // Get single Team Info
  async getTeamInfoById(id: number): Promise<TeamInfoEntity> {
    const teamInfo = await this.teamInfoRepository.findOneBy({ id: id });

    if (!teamInfo) {
      throw new NotFoundException(`Team Info with ID ${id} not found`);
    }
    return teamInfo;
  }

  // Update Team Info
  async updateTeamInfo(
    id: number,
    teamInfo: TeamInfoDTO,
  ): Promise<TeamInfoEntity> {
    await this.teamInfoRepository.update(id, teamInfo);
    return this.teamInfoRepository.findOneBy({ id: id });
  }

  // Partially Update Team Name by ID
  async updateTeamName(id: number, teamName: string): Promise<TeamInfoEntity> {
    const teamInfo = await this.teamInfoRepository.findOneBy({ id: id });

    if (!teamInfo) {
      throw new NotFoundException(`Team Info with ID ${id} not found`);
    }

    teamInfo.teamName = teamName;
    return this.teamInfoRepository.save(teamInfo);
  }

  // Delete Team Info
  async deleteTeamInfo(id: number): Promise<void> {
    const teamInfo = await this.teamInfoRepository.findOneBy({ id: id });
    if (!teamInfo) {
      throw new NotFoundException(`Team Info with ID ${id} not found`);
    }
    await this.teamInfoRepository.delete(id);
  }
}
