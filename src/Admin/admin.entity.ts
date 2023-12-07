/* eslint-disable prettier/prettier */
import { ProgrammerProfileEntity } from 'src/programmer/test/profile.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  imageName: string;
}

@Entity('All3Relation')
export class RelationEntity {
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
