import { Injectable, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/Relation/user.entity';
import { AdminEntity } from 'src/Admin/admin.entity';
import { RecruiterEntity } from 'src/Recruiter/recruiter.entity';
import { ProfileEntity } from 'src/programmer/profile/profile.entity';
import { CompanyEntity } from 'src/company/company.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    @InjectRepository(RecruiterEntity)
    private readonly recruiterRepository: Repository<RecruiterEntity>,
    @InjectRepository(ProfileEntity)
    private readonly programmerRepository: Repository<ProfileEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async loginUser(
    email: string,
    password: string,
    @Session() session: Record<string, any>,
  ): Promise<boolean> {
    // Find user by email in the users table
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      return false; // User not found
    }

    let passwordMatch = false;

    // Check which table the user belongs to and verify the password
    const admin = await this.adminRepository.findOne({
      where: { email, password },
    });
    const recruiter = await this.recruiterRepository.findOne({
      where: { email, password },
    });
    const programmer = await this.programmerRepository.findOne({
      where: { email, password },
    });
    const company = await this.companyRepository.findOne({
      where: { email, password },
    });

    if (admin) {
      // Create session for admin
      session.email = email;
      session.role = 'admin';
      passwordMatch = true;
    } else if (recruiter) {
      // Create session for recruiter
      session.email = email;
      session.role = 'recruiter';
      passwordMatch = true;
    } else if (programmer) {
      // Create session for programmer
      session.email = email;
      session.role = 'programmer';
      passwordMatch = true;
    } else if (company) {
      // Create session for company
      session.email = email;
      session.role = 'company';
      passwordMatch = true;
    }

    console.log(session);
    return passwordMatch;
  }

  async getAdminProfileByEmail(email: string): Promise<AdminEntity | null> {
    return this.adminRepository.findOne({ where: { email } });
  }

  async getRecruiterProfileByEmail(
    email: string,
  ): Promise<RecruiterEntity | null> {
    return this.recruiterRepository.findOne({ where: { email } });
  }

  async getProgrammerProfileByEmail(
    email: string,
  ): Promise<ProfileEntity | null> {
    return this.programmerRepository.findOne({ where: { email } });
  }

  async getCompanyProfileByEmail(email: string): Promise<CompanyEntity | null> {
    return this.companyRepository.findOne({ where: { email } });
  }
}
