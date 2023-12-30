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
    private recruiterEntityRepository: Repository<RecruiterEntity>,
  ) {}

  async createAvailableJobsEntity(
    availableJobsDTO: CreateAvailableJobsDTO,
  ): Promise<AvailableJobsEntity> {
    const { company_email, interviewers, ...rest } = availableJobsDTO;

    const company = await this.companyRepository.findOne({
      where: { email: company_email },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const interviewersEntities = await this.recruiterEntityRepository
      .createQueryBuilder('recruiter')
      .where('recruiter.email IN (:...interviewers)', { interviewers })
      .getMany();

    const availableJobsEntity = this.availableJobsRepository.create({
      ...rest,
      company,
      interviewers: interviewersEntities,
    });

    return this.availableJobsRepository.save(availableJobsEntity);
  }
}

// @Injectable()
// export class AvailableJobsService {
//   constructor(
//     @InjectRepository(AvailableJobsEntity)
//     private readonly availableJobsRepository: Repository<AvailableJobsEntity>,
//   ) {}

//   async createAvailableJobsEntity(
//     availableJobsDTO: AvailableJobsEntity,
//   ): Promise<AvailableJobsEntity> {
//     const availableJobsEntity =
//       this.availableJobsRepository.create(availableJobsDTO);
//     return this.availableJobsRepository.save(availableJobsEntity);
//   }
// }
