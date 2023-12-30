// interview_list.entity.ts
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppliedJobsEntity } from './applied_jobs.entity';
import { ProfileEntity } from 'src/programmer/profile/profile.entity';
import { RecruiterEntity } from './recruiter.entity';
import { CompanyEntity } from 'src/company/company.entity';
@Entity('interview_list')
export class InterviewListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppliedJobsEntity, (appliedJob) => appliedJob.id)
  appliedJob: AppliedJobsEntity;

  @ManyToOne(() => ProfileEntity, (programmer) => programmer.email)
  programmer: ProfileEntity;

  @ManyToOne(() => RecruiterEntity, (recruiter) => recruiter.email)
  recruiter: RecruiterEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.email)
  company: CompanyEntity;

  @Column({ nullable: true })
  googleMeetLink: string;

  @Column({ nullable: true })
  dateTime: Date;

  // Add other columns or relationships as needed
}
