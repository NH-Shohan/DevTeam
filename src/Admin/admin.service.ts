/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm'; // change this to your entity class
import { RecruiterEntity } from 'src/Recruiter/recruiter.entity';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { AdminEntity } from './admin.entity';
import { UsersEntity } from 'src/Relation/user.entity';

MailerModule.forRoot({
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
      user: '',
      pass: '',
    },
  },
});

@Injectable()
export class AdminEntityService {
  constructor(
    @InjectRepository(AdminEntity)
    private AdminEntityRepository: Repository<AdminEntity>,
    @InjectRepository(UsersEntity)
    private UsersEntityRepository: Repository<UsersEntity>,
  ) {}
  // AdminEntityRepository is the local repository
  async createAdminEntity(adminEntity: AdminEntity): Promise<AdminEntity> {
    try {
      // const admin = new AdminEntity();
      // // Set other properties of admin...

      const existingUser = await this.UsersEntityRepository.findOne({
        where: { email: adminEntity.email },
      });

      if (existingUser) {
        throw new Error('Email address is already in use');
      }

      const user = new UsersEntity();
      user.email = adminEntity.email;
      user.role = 'admin';

      adminEntity.user = user;

      return this.AdminEntityRepository.save(adminEntity);
      // this.UsersEntityRepository.save(user);

      // return adminEntity;
      // return this.AdminEntityRepository.save(adminEntity);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // Handle duplicate email error
        throw new Error('Email address is already in use');
      }
      // Handle other errors or rethrow
      throw new Error('Email address is already in use');
    }
  }
  async getAllAdminEntitys(): Promise<AdminEntity[]> {
    return this.AdminEntityRepository.find();
  }
  async getAdminEntityById(email: string): Promise<AdminEntity> {
    return this.AdminEntityRepository.findOneBy({ email: email });
  }

  private mailerService: MailerService;

  async signIn(email: string, password: string): Promise<AdminEntity> {
    // await this.mailerService.sendMail({
    //   to: email,
    //   subject: 'Email',
    //   text: 'Done',
    // });
    return this.AdminEntityRepository.findOneBy({
      email: email,
      password: password,
    });
  }

  // // Admin Profile Update
  // async updateAdminEntity(
  //   id: number,
  //   updatedAdminEntity: ValidateAdminProfile,
  // ): Promise<AdminEntity> {
  //   await this.AdminEntityRepository.update(id, updatedAdminEntity);
  //   const profile = this.AdminEntityRepository.findOneBy({ id: id });
  //   return profile;
  // }

  async deleteAdminEntity(id: number): Promise<void> {
    await this.AdminEntityRepository.delete(id);
  }
}

// Relation
// @Injectable()
// export class All3RelationService {
//   constructor(
//     @InjectRepository(RelationEntity)
//     private AdminEntityRepository: Repository<RelationEntity>,
//   ) {}

//   async getAllAdminEntitys(): Promise<RelationEntity[]> {
//     return this.AdminEntityRepository.find();
//   }
// }

// Relation
@Injectable()
export class RecruiterEntityServiceFromAdmin {
  constructor(
    @InjectRepository(RecruiterEntity)
    private RecruiterEntityRepository: Repository<RecruiterEntity>,
  ) {}
  // RecruiterEntityRepository is the local repository
  async createRecruiterEntity(
    Profile: RecruiterEntity,
  ): Promise<RecruiterEntity> {
    return this.RecruiterEntityRepository.save(Profile);
  }
  async getAllRecruiterEntitys(): Promise<RecruiterEntity[]> {
    return this.RecruiterEntityRepository.find();
  }
  async getRecruiterEntityById(id: number): Promise<RecruiterEntity> {
    return this.RecruiterEntityRepository.findOneBy({ id: id });
  }
  async updateRecruiterEntity(
    id: number,
    updatedRecruiterEntity: RecruiterEntity,
  ): Promise<RecruiterEntity> {
    await this.RecruiterEntityRepository.update(id, updatedRecruiterEntity);
    return this.RecruiterEntityRepository.findOneBy({ id: id });
  }
  async deleteRecruiterEntity(id: number): Promise<void> {
    await this.RecruiterEntityRepository.delete(id);
  }
}
