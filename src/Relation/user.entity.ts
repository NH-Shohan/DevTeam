import { AdminEntity } from 'src/Admin/admin.entity';
import { RecruiterEntity } from 'src/Recruiter/recruiter.entity';
import { CompanyEntity } from 'src/company/company.entity';
import { ProfileEntity } from 'src/programmer/profile/profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Generated,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @Generated()
  id: number;

  @PrimaryColumn({ unique: true }) // Add unique constraint
  email: string;

  @Column()
  role: string;
}
