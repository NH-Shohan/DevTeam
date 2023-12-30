// company.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDTO } from './company.dto';
import { UsersEntity } from 'src/Relation/user.entity';

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
}
