// company.controller.ts
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompanyService } from './company.service';
import { CreateCompanyDTO } from './company.dto';
import { MulterError, diskStorage } from 'multer';
import { CreateAvailableJobsDTO } from './jobs.dto';
import { AvailableJobsService } from './jobs.service';
import { AppliedJobsEntity } from 'src/Recruiter/applied_jobs.entity';
import { AppliedJobsService } from 'src/Recruiter/Jobs/applied_jobs.service';
import { InterviewListEntity } from 'src/Recruiter/interview_list.entity';
import { InterviewListService } from 'src/Recruiter/Jobs/interview-list.service';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly availableJobsService: AvailableJobsService,
    private readonly appliedJobsService: AppliedJobsService,
    private readonly interviewListService: InterviewListService,
  ) {}

  @Post('create-company')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('imageName', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/)) cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },

      limits: { fileSize: 6000000 },

      storage: diskStorage({
        destination: './uploads',

        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  createCompany(
    @Body() companyDTO: CreateCompanyDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const fileName = file ? file.filename : null;
      const result = { ...companyDTO, imageName: fileName };

      return this.companyService.createCompanyEntity(result);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Jobs
  @Post('create-job')
  @UsePipes(new ValidationPipe())
  createAvailableJobs(@Body() availableJobsDTO: CreateAvailableJobsDTO) {
    try {
      console.log(availableJobsDTO);
      return this.availableJobsService.createAvailableJobsEntity(
        availableJobsDTO,
      );
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Jobs
  @Post('applied-job')
  async createAppliedJob(
    @Body() appliedJobData: Partial<AppliedJobsEntity>,
  ): Promise<AppliedJobsEntity> {
    return this.appliedJobsService.createAppliedJob(appliedJobData);
  }

  @Post('interview-list')
  async createInterviewList(
    @Body() interviewListData: Partial<InterviewListEntity>,
  ): Promise<InterviewListEntity> {
    return this.interviewListService.createInterviewList(interviewListData);
  }

  @Get('interview-list')
  async getAllInterviewLists(): Promise<InterviewListEntity[]> {
    return this.interviewListService.findAllInterviewLists();
  }

  @Get('interview-list/:email')
  async getInterviewList(
    @Param('email') email: string,
  ): Promise<InterviewListEntity[]> {
    const interviewLists =
      await this.interviewListService.findInterviewListByEmail(email);
    if (!interviewLists || interviewLists.length === 0) {
      throw new NotFoundException('Interview lists not found');
    }
    return interviewLists;
  }
}
