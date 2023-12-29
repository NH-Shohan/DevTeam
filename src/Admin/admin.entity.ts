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
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nationalId: string;

  @Column({ nullable: true }) // Allow null values for imageName
  imageName: string | null;

  // Additional fields based on ValidateAdminProfile DTO
  @Column()
  photo: string; // Assuming it's a FileList, you may need to adjust this based on your form implementation

  @Column({
    type: 'enum',
    enum: ['executive', 'moderator'],
  })
  role: 'executive' | 'moderator';

  @Column('simple-array', { default: [] })
  permissions: ('creating' | 'adding' | 'deleting')[];
}

@Entity('All3Relation')
export class RelationEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => ProfileEntity, (candidateProfile) => candidateProfile.email, {
    cascade: true,
  })
  @JoinColumn()
  candidateProfile: ProfileEntity;

  @Column()
  date: string;
  @Column()
  googleMeetLink: string;
}
