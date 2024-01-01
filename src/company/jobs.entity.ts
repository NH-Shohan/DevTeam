// available-jobs.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { RecruiterEntity } from 'src/Recruiter/recruiter.entity';
import { AppliedJobsEntity } from 'src/Recruiter/applied_jobs.entity';

@Entity('available_jobs')
export class AvailableJobsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompanyEntity, (company) => company.availableJobs, {
    eager: true,
  })
  @JoinColumn({ name: 'company_email' })
  company: CompanyEntity;

  @Column()
  jobDescription: string;

  @Column()
  jobRole: string;

  @Column()
  jobSeat: number;

  @Column()
  jobExpireDate: Date;

  @Column()
  joiningDate: Date;

  @Column('simple-array', { default: [] })
  requiredSkills: string[];

  @ManyToOne(() => RecruiterEntity, (recruiter) => recruiter.email, {
    eager: true,
  })
  @JoinTable()
  interviewer: RecruiterEntity;

  @OneToMany(() => AppliedJobsEntity, (appliedJob) => appliedJob.availableJob)
  appliedJobs: AppliedJobsEntity[];
}
