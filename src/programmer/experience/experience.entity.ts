import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ProgrammerExperience')
export class ExperienceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Job Title' })
  jobTitle: string;

  @Column({ name: 'Company' })
  company: string;

  @Column({ name: 'Location' })
  location: string;

  @Column({ name: 'Start Date' })
  startDate: Date;

  @Column({ name: 'End Date' })
  endDate: Date;

  @Column({ name: 'Description' })
  description: string;
}
