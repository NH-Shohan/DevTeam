// applied_jobs.entity.ts
import { AvailableJobsEntity } from 'src/company/jobs.entity';
import { ProfileEntity } from 'src/programmer/profile/profile.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Generated,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity('applied_jobs')
@Unique(['availableJob', 'programmer'])
export class AppliedJobsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AvailableJobsEntity, (availableJob) => availableJob.id)
  availableJob: AvailableJobsEntity;

  @ManyToOne(() => ProfileEntity, (programmer) => programmer.email)
  programmer: ProfileEntity;

  @Column()
  companyEmail: string;

  // Add other columns or relationships as needed
}
