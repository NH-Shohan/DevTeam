import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AdminModule } from './Admin/admin.module';
import { ProgrammerModule } from './programmer/programmer.module';
import { UsersEntity } from './Relation/user.entity';
import { UsersController } from './Relation/user.controller';
import { UsersService } from './Relation/user.service';
import { AdminEntity } from './Admin/admin.entity';
import { GrowthEntity } from './Admin/growth.entity';
import { AdminController } from './Admin/admin.controller';
import { AdminEntityService } from './Admin/admin.service';
import { GrowthEntityService } from './Admin/gowth.service';

import { AvailableJobsEntity } from './company/jobs.entity';
import { CompanyEntity } from './company/company.entity';
import { CompanyService } from './company/company.service';
import { AvailableJobsService } from './company/jobs.service';
import { CompanyController } from './company/company.controller';

import { RecruiterController } from './Recruiter/recruiter.controller';

import { RecruiterEntityService } from './Recruiter/recruiter.service';

import {
  CandidateEntity,
  InterviewEntity,
  RecruiterEntity,
} from './Recruiter/recruiter.entity';
import { ProfileEntity } from './programmer/profile/profile.entity';
import { ProfileController } from './programmer/profile/profile.controller';
import { ProfileService } from './programmer/profile/profile.service';
import { AuthController } from './Auth/auth.controller';
import { AuthService } from './Auth/auth.service';
import { InterviewListEntity } from './Recruiter/interview_list.entity';
import { AppliedJobsEntity } from './Recruiter/applied_jobs.entity';
import { AppliedJobsService } from './Recruiter/Jobs/applied_jobs.service';
import { InterviewListService } from './Recruiter/Jobs/interview-list.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'DevTeam',
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      // dropSchema:true
    }),
    TypeOrmModule.forFeature([
      AdminEntity,
      UsersEntity,
      GrowthEntity,
      // global
      RecruiterEntity,
      InterviewEntity,
      CandidateEntity,
      CompanyEntity,
      AvailableJobsEntity,

      // programmer
      ProfileEntity,

      // Interview
      AppliedJobsEntity,
      InterviewListEntity,
    ]),
    // GlobalModule,
    // AdminModule,
    ProgrammerModule,
  ],
  controllers: [
    UsersController,
    AdminController,
    // global
    RecruiterController,
    CompanyController,

    // programmer
    ProfileController,

    // login
    AuthController,
  ],
  providers: [
    UsersService,
    AdminEntityService,
    GrowthEntityService,
    // global
    RecruiterEntityService,
    CompanyService,
    AvailableJobsService,

    // programmer
    ProfileService,

    // login
    AuthService,

    // interview
    AppliedJobsService,
    InterviewListService,
  ],
})
export class AppModule {}
