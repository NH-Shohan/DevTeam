/* eslint-disable prettier/prettier */

import { UsersEntity } from 'src/Relation/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('recruiter')
@Unique(['email'])
export class RecruiterEntity {
  @Generated()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  imageName: string | null;

  @Column()
  photo: string;

  @Column('simple-array', { default: [] })
  expertiseSkills: string[];

  @Column('simple-array', { default: [] })
  projectLinks: string[];

  @Column()
  linkedInLink: string;

  @ManyToOne(() => UsersEntity, (user) => user.email, { cascade: true })
  @JoinColumn({ name: 'email' })
  user: UsersEntity;
}

// @Entity('Interview_Unfinished')
// export class InterviewEntityError {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @OneToOne(() => ProfileEntity, (candidateProfile) => candidateProfile.email, {
//     cascade: true,
//   })
//   @JoinColumn()
//   candidateProfile: ProfileEntity;

//   @Column()
//   date: string;

//   @Column()
//   googleMeetLink: string;
// }

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
