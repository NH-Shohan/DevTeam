// company.entity.ts
import {
  Entity,
  Column,
  Unique,
  PrimaryColumn,
  Generated,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AvailableJobsEntity } from './jobs.entity';
import { UsersEntity } from 'src/Relation/user.entity';

@Entity('company')
@Unique(['email'])
export class CompanyEntity {
  @Generated()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @PrimaryColumn({ type: 'varchar' })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  imageName: string | null;

  @Column()
  photo: string;

  @Column()
  ownerName: string;

  @Column()
  licenseNo: string;

  @Column()
  ownerNID: string;

  @OneToMany(
    () => AvailableJobsEntity,
    (availableJobs) => availableJobs.company,
  )
  availableJobs: AvailableJobsEntity[];

  @ManyToOne(() => UsersEntity, (user) => user.email, { cascade: true })
  @JoinColumn({ name: 'email' })
  user: UsersEntity;
}
