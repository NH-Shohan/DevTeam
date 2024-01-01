import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CertificationEntity } from '../certifications/certification.entity';
import { UsersEntity } from 'src/Relation/user.entity';

@Entity('ProgrammerProfile')
export class ProfileEntity {
  @Generated()
  id: number;

  @Column()
  name: string;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  gitHubUsername: string;

  @Column({ nullable: true })
  imageName: string | null;

  @Column()
  photo: string;

  @Column()
  bio: string;

  @Column()
  contactInformation: string;

  @Column()
  location: string;

  @Column()
  socialMediaLinks: string;

  @Column()
  education: string;

  @Column()
  projects: string;

  @Column()
  experiences: number;

  @ManyToOne(() => UsersEntity, (user) => user.email, { cascade: true })
  @JoinColumn({ name: 'email' })
  user: UsersEntity;

  @OneToMany(() => CertificationEntity, (profile) => profile.certificate)
  profile: CertificationEntity[];
}
