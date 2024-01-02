// available-jobs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { AvailableJobsEntity } from './jobs.entity';
import { CreateAvailableJobsDTO } from './jobs.dto';
import { RecruiterEntity } from 'src/Recruiter/recruiter.entity';

@Injectable()
export class AvailableJobsService {
  constructor(
    @InjectRepository(AvailableJobsEntity)
    private readonly availableJobsRepository: Repository<AvailableJobsEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(RecruiterEntity)
    private readonly recruiterEntityRepository: Repository<RecruiterEntity>,
  ) {}

  async createAvailableJobsEntity(
    availableJobsDTO: CreateAvailableJobsDTO,
  ): Promise<AvailableJobsEntity> {
    const { company_email, interviewer, ...rest } = availableJobsDTO;

    const company = await this.companyRepository.findOne({
      where: { email: company_email },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const interviewerEmail = await this.recruiterEntityRepository.findOne({
      where: { email: interviewer },
    });
    console.log(interviewerEmail);
    const availableJobsEntity = this.availableJobsRepository.create({
      ...rest,
      company,
      interviewer: interviewerEmail,
    });

    return this.availableJobsRepository.save(availableJobsEntity);
  }

  async findAllAvailableJobs(): Promise<AvailableJobsEntity[]> {
    return this.availableJobsRepository.find({
      relations: ['company', 'interviewer', 'appliedJobs'],
    });
  }

  async findAllAvailableJobsByEmail(
    email: string,
  ): Promise<AvailableJobsEntity[]> {
    return this.availableJobsRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('job.interviewer', 'interviewer')
      .leftJoinAndSelect('job.appliedJobs', 'appliedJobs')
      .where('company.email = :email OR interviewer.email = :email', { email })
      .getMany();
  }

  // async deleteAvailableJob(id: number): Promise<void> {
  //   // Check if the available job exists
  //   const job = await this.availableJobsRepository.findOne({
  //     where: { id: id },
  //   });
  //   if (!job) {
  //     throw new NotFoundException(`Available job with ID ${id} not found`);
  //   }

  //   // Delete the available job
  //   await this.availableJobsRepository.remove(job);
  // }
}
