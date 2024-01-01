// interview_list.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Unique,
} from 'typeorm';
import { AppliedJobsEntity } from './applied_jobs.entity';
import { ProfileEntity } from 'src/programmer/profile/profile.entity';
import { RecruiterEntity } from './recruiter.entity';
import { CompanyEntity } from 'src/company/company.entity';
@Entity('interview_list')
@Unique(['appliedJob'])
export class InterviewListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppliedJobsEntity, (appliedJob) => appliedJob.id, {
    eager: true,
  })
  appliedJob: AppliedJobsEntity;

  @ManyToOne(() => RecruiterEntity, (recruiter) => recruiter.email, {
    eager: true,
  })
  recruiter: RecruiterEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.email, { eager: true })
  company: CompanyEntity;

  //   @ManyToOne(() => ProfileEntity, (programmerData) => programmerData.email)
  //   @JoinColumn({ name: 'programmerData' })
  //   programmerData: ProfileEntity;

  @Column({ nullable: true })
  googleMeetLink: string;

  @Column({ nullable: true })
  dateTime: Date;

  // Add other columns or relationships as needed
}
