import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CertificationEntity } from '../certifications/certification.entity';

@Entity('ProgrammerProfile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Full Name' })
  name: string;

  @Column({ name: 'Email Address' })
  email: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'GitHub Username' })
  gitHubUsername: string;

  @Column({ name: 'Profile Picture' })
  profilePicture: string;

  @Column({ name: 'Biography' })
  bio: string;

  @Column({ name: 'Contact Information' })
  contactInformation: string;

  @Column({ name: 'Location' })
  location: string;

  @Column({ name: 'Social Media Links' })
  socialMediaLinks: string;

  @Column({ name: 'Education' })
  education: string;

  @Column({ name: 'Projects' })
  projects: string;

  @Column({ name: 'Work Experiences' })
  experiences: number;

  @OneToMany(() => CertificationEntity, (profile) => profile.certificate)
  profile: CertificationEntity[];
}
