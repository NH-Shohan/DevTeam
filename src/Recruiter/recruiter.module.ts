/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppService } from 'src/app.service';
import { RecruiterController } from './recruiter.controller';
import {
  CandidateEntity,
  InterviewEntity,
  RecruiterEntity,
} from './recruiter.entity';
import { RecruiterEntityService } from './recruiter.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecruiterEntity,
      InterviewEntity,
      CandidateEntity,
    ]),
  ],
  controllers: [RecruiterController],
  providers: [
    RecruiterEntityService,
    // InterviewEntityService
  ],
})
export class RecruiterModule {}
