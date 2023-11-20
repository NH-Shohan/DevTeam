/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
// import { AppService } from 'src/app.service';
import { RecruiterEntity } from './recruiter.entity';
import { RecruiterController } from './recruiter.controller';
import { InterviewEntityService, RecruiterEntityService } from './recruiter.service';
@Module({
  imports: [TypeOrmModule.forFeature([RecruiterEntity])],
  controllers: [RecruiterController],
  providers: [
    RecruiterEntityService, 
    // InterviewEntityService
  ],
})
export class RecruiterModule {}
