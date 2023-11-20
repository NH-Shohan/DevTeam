/* eslint-disable prettier/prettier */
import { ProgrammerProfileEntity } from 'src/programmer/test/profile.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

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

@Entity('Interview')
export class InterviewEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => ProgrammerProfileEntity, candidateProfile => candidateProfile.email, {
    cascade: true
  })
  @JoinColumn()
  candidateProfile: ProgrammerProfileEntity;
  
  @Column()
  date: string;
  @Column()
  googleMeetLink: string
  
}
