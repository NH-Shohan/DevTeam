// company.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDTO } from './company.dto';
import { UsersEntity } from 'src/Relation/user.entity';
import { RecruiterEntity } from 'src/Recruiter/recruiter.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(UsersEntity)
    private UsersEntityRepository: Repository<UsersEntity>,
  ) {}

  async createCompanyEntity(
    companyDTO: CreateCompanyDTO,
  ): Promise<CompanyEntity> {
    // Check if the email already exists in the users table
    const existingUser = await this.UsersEntityRepository.findOne({
      where: { email: companyDTO.email },
    });

    if (existingUser) {
      throw new Error('Email address is already in use');
    }

    // If the email doesn't exist, proceed to create company and user entities
    const companyEntity = this.companyRepository.create(companyDTO);

    const user = new UsersEntity();
    user.email = companyDTO.email;
    user.role = 'company';

    companyEntity.user = user;

    // Save both company and user entities
    await this.companyRepository.save(companyEntity);

    return companyEntity;
  }

  async getCompanies() {
    return this.companyRepository.find();
  }

  async getRecruiterEntityById(email: string): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOneBy({ email });

    if (!company) {
      throw new NotFoundException('company not found');
    }

    return company;
  }
  async deleteCompany(email: string) {
    const result = await this.companyRepository.delete({ email });

    if (result.affected === 0) {
      throw new NotFoundException('Company not found');
    }

    return { message: 'Company deleted successfully' };
  }
}
