import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ProgrammerProject')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Project Name' })
  projectName: string;

  @Column({ name: 'Description' })
  description: string;

  @Column({ name: 'Date Started' })
  dateStarted: Date;

  @Column({ name: 'Date Completed' })
  dateCompleted: Date;

  @Column({ name: 'Technologies Used' })
  technologiesUsed: string;

  @Column({ name: 'Project Link' })
  projectLink: string;
}
