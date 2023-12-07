/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ValidateRecruiterProfile } from './recruiter.dto';
import { RecruiterEntityService } from './recruiter.service';
import { SessionGuard } from './session.guard';

// recruiter
const interviews = [];
const jobRequests = [];
const candidates = [];
// Hello

@Controller('recruiter')
export class RecruiterController {
  constructor(private appService: RecruiterEntityService) {}

  @Get('get-recruiters')
  getViewRecruiter(): any {
    return this.appService.getAllRecruiterEntitys();
  }

  @Post('create-recruiter')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('image', {
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
  createRecruiter(
    @Body() profile: ValidateRecruiterProfile,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const fileName = file.filename;
      const result = { ...profile, image: fileName };

      return this.appService.createRecruiterEntity(result);
    } catch (error) {
      console.error('Error creating recruiter:', error.message);
      throw new Error('Error creating recruiter');
    }
  }

  //Full Recruiter team
  @Post('recruit-team')
  recruitTeam(@Body() body): any {
    return this.appService.recruitTeam(body);
  }

  @Get('get-recruiter/:id')
  @UseGuards(SessionGuard)
  getMyProfile(@Param('id') id): any {
    return this.appService.getRecruiterEntityById(id);
  }

  @Post('signin')
  async signIn(
    @Session() session,
    @Body() body: ValidateRecruiterProfile,
  ): Promise<any> {
    try {
      const user = await this.appService.signIn(body.email, body.password);
      if (user) {
        session.email = user.email;
        return { status: 'success' };
      } else {
        throw new HttpException(
          'Invalid username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Update profile on Database

  @Put('update-recruiter/:id')
  @UsePipes(new ValidationPipe())
  updateProfile(
    @Param('id', ParseIntPipe) id: number,

    @Body() profileInfo: ValidateRecruiterProfile,
  ) {
    const updated = this.appService.updateRecruiterEntity(id, profileInfo);
    return {
      updated,
      msg: 'Successfully updated',
    };
  }

  // getimage

  @Get('/get-recruiter-image/:id')
  async getProfilePicture(@Param('id') id, @Res() res) {
    try {
      const profile = await this.appService.getRecruiterEntityById(id);
      res.sendFile(profile.image, {
        root: './uploads',
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Interview
  // ------------------------------------------------

  // Get Interview List
  @Get('interview-list')
  async getInterviewList(): Promise<any> {
    return this.appService.getInterviewList();
  }

  // Set Interview
  @Post('set-interview')
  @UsePipes(new ValidationPipe())
  async setInterview(@Body() interviewInfo): Promise<any> {
    return this.appService.setInterview(interviewInfo);
  }

  // Update Interview
  @Put('update-interview/:interviewId')
  @UsePipes(new ValidationPipe())
  async updateInterview(
    @Param('interviewId') interviewId: string,
    @Body() updateData,
  ): Promise<any> {
    return this.appService.updateInterview(interviewId, updateData);
  }

  // Delete Interview
  @Delete('delete-interview/:developerEmail')
  async deleteInterview(
    @Param('developerEmail') developerEmail: string,
  ): Promise<any> {
    return this.appService.deleteInterview(developerEmail);
  }

  //view interviewteam
  // @Post('interview-team')
  // interviewTeam(@Body() body): any {
  //   return { message: 'Team members interviewed successfully' };
  // }

  // Candidate
  // --------------------------------------------

  //remove candidate
  @Delete('delete-candidate/:id')
  deleteProfile(@Param('id', ParseIntPipe) id: number) {
    this.appService.deleteRecruiterEntity(id);
    return 'success';
  }

  //Approve Candidate
  @Post('create-candidate')
  createCandidateTest(@Body() body): any {
    return this.appService.createCandidate(body);
  }

  //see all candidates
  @Get('show-candidates')
  getCandidates(): any {
    return this.appService.getCandidates();
  }

  //Approve Candidate
  @Post('approve-candidates')
  approveCandidatesForJob(@Body() body): any {
    return this.appService.approveCandidatesForJob(body);
  }

  //Reject Candidate
  @Delete('reject-candidates')
  rejectCandidates(@Body() body): any {
    return this.appService.rejectCandidates(body);
  }

  // update candidate status
  @Patch('update-candidate/:candidateId')
  updateCandidate(
    @Param('candidateId') candidateId: string,
    @Body() patchData,
  ): any {
    return {
      message: 'Candidate updated (partial) successfully',
      data: {
        patchData,
      },
    };
  }

  // Others
  // ----------------------------------------------

  //approve company request
  @Patch('approve-interview-request/:id')
  approveInterviewRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
  ): any {
    return this.appService.approveInterviewRequest(id, body);
  }

  // company request
  @Get('company-requests')
  getCompanyRequests(): any {
    return {
      message: 'Company requests retrieved successfully',
      data: jobRequests,
    };
  }

  //Reject company request
  @Delete('reject-company-request')
  rejectCompanyRequest(@Body() body): any {
    return this.appService.rejectCompanyRequest(body);
  }

  //View message from Candidate
  @Get('messages-from-candidates')
  getMessagesFromCandidates(): any {
    return this.appService.getMessagesFromCandidates();
  }
}
