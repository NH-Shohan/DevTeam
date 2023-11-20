import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Growth')
export class GrowthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  programmer: number;

  @Column()
  recruiter: number;

  @Column()
  company: number;

  @Column()
  date: string;
}
