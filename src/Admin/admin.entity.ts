/* eslint-disable prettier/prettier */
import { ProfileEntity } from 'src/programmer/profile/profile.entity';
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
    () => ProfileEntity,
    (candidateProfile) => candidateProfile.email,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  candidateProfile: ProfileEntity;

  @Column()
  date: string;
  @Column()
  googleMeetLink: string;
}
