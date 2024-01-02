// admin.entity.ts
import { UsersEntity } from 'src/Relation/user.entity';
import {
  Column,
  Entity,
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Generated,
  PrimaryColumn,
} from 'typeorm';

@Entity('admin')
@EventSubscriber() // implements EntitySubscriberInterface
export class AdminEntity {
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

  @Column()
  nationalId: string;

  @Column({ nullable: true })
  imageName: string | null;

  @Column()
  photo: string;

  @Column({
    type: 'enum',
    enum: ['executive', 'moderator'],
  })
  role: 'executive' | 'moderator';

  @Column('simple-array', { default: [] })
  permissions: ('creating' | 'adding' | 'deleting')[];

  @ManyToOne(() => UsersEntity, (user) => user.email, { cascade: true })
  // @JoinColumn({ name: 'user_email', referencedColumnName: 'email' })
  @JoinColumn({ name: 'email' })
  user: UsersEntity;
}
