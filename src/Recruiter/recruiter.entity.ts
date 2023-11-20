/* eslint-disable prettier/prettier */
import { ProgrammerProfileEntity } from 'src/programmer/test/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('recruiter')
export class RecruiterEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  image: string;
}

@Entity('Interview_Unfinished')
export class InterviewEntityError {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(
    () => ProgrammerProfileEntity,
    (candidateProfile) => candidateProfile.email,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  candidateProfile: ProgrammerProfileEntity;

  @Column()
  date: string;

  @Column()
  googleMeetLink: string;
}

@Entity('Interview')
export class InterviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  status: string;

  @Column()
  date: string;

  @Column()
  googleMeetLink: string;
}

@Entity('Candidate')
export class CandidateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  date: string;

  @Column()
  status: string;

  @Column()
  googleMeetLink: string;
}
