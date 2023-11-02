import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('ProgrammerProfile')
export class ProgrammerProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
