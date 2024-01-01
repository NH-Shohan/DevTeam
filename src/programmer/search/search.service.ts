import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';
import { TeamInfoEntity } from '../team-info/team-info.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(TeamInfoEntity)
    private teamInfoRepository: Repository<TeamInfoEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  // Search Teams
  async searchTeams(teamName: string): Promise<TeamInfoEntity[]> {
    try {
      const teams = await this.teamInfoRepository.find({
        where: [{ teamName: Like(teamName) }],
        order: {
          teamName: 'ASC',
        },
      });
      return teams;
    } catch (error) {
      throw new Error('Error searching');
    }
  }

  // Search Programmers
  async searchProgrammers(
    name: string,
    email: string,
    gitHubUsername: string,
  ): Promise<ProfileEntity[]> {
    try {
      console.log(name);

      const programmers = await this.profileRepository.find({
        where: [
          { name: Like(name) },
          { email: Like(email) },
          { gitHubUsername: Like(gitHubUsername) },
        ],
        order: {
          id: 'ASC',
        },
      });
      return programmers;
    } catch (error) {
      throw new Error('Error searching');
    }
  }
}
