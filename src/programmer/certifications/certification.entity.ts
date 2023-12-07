import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';

@Entity('ProgrammerCertification')
export class CertificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Certification Name' })
  certificationName: string;

  @Column({ name: 'Issuing Organization' })
  issuingOrganization: string;

  @Column({ name: 'Issue Date' })
  issueDate: Date;

  @Column({ name: 'Subject' })
  subject: string;

  @ManyToOne(() => ProfileEntity, (certificate) => certificate.profile)
  certificate: ProfileEntity;
}
