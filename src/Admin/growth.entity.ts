/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('growth')
export class GrowthEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  programmer: string;
  @Column()
  recruiter: string;
  @Column()
  company: string;
  @Column()
  date: string;
}
