import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ProgrammerTeamInfo')
export class TeamInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Team Name' })
  teamName: string;

  @Column({ name: 'Team Members' })
  teamMembers: string;

  @Column({ name: 'Description' })
  description: string;
}
