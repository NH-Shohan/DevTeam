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

  //   get image

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

  //interview list
  @Get('interview-list')
  getInterviewList(): any {
    return {
      message: 'Interview list retrieved successfully',
      data: interviews,
    };
  }

  //set interview
  @Post('set-interview')
  setInterview(@Body() body): any {
    const returnVariable = {
      message: 'Interview set successfully',
      data: body,
    };
    return returnVariable;
  }

  //update interview

  @Put('update-interview/:interviewId')
  updateInterview(
    @Param('interviewId') interviewId: string,
    @Body() updateData,
  ): any {
    return {
      message: 'Interview updated successfully',
      data: {
        updateData,
      },
    };
  }

  //delete interview
  @Delete('delete-interview/:developerEmail')
  deleteInterview(@Param('developerEmail') developerEmail: string): any {
    return {
      message: 'interview deleted successfully',
      data: 'deletedInterview',
    };
  }

  //view interviewteam
  @Post('interview-team')
  interviewTeam(@Body() body): any {
    return { message: 'Team members interviewed successfully' };
  }

  @Get('company-requests')
  getCompanyRequests(): any {
    return {
      message: 'Company requests retrieved successfully',
      data: jobRequests,
    };
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

  //remove candidate

  @Delete('delete-candidate/:id')
  deleteProfile(@Param('id', ParseIntPipe) id: number) {
    this.appService.deleteRecruiterEntity(id);
    return 'success';
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
  @Post('reject-candidates')
  rejectCandidates(@Body() body): any {
    return this.appService.rejectCandidates(body);
  }

  //approve company request
  @Post('approve-interview-request')
  approveInterviewRequest(@Body() body): any {
    return this.appService.approveInterviewRequest(body);
  }

  //Reject company request
  @Post('reject-company-request')
  rejectCompanyRequest(@Body() body): any {
    return this.appService.rejectCompanyRequest(body);
  }

  //Full Recruiter team
  @Post('recruit-team')
  recruitTeam(@Body() body): any {
    return this.appService.recruitTeam(body);
  }

  //View message from Candidate
  @Get('messages-from-candidates')
  getMessagesFromCandidates(): any {
    return this.appService.getMessagesFromCandidates();
  }

  //View message from companies
  @Get('messages-from-companies')
  getMessagesFromCompanies(): any {
    return this.appService.getMessagesFromCompanies();
  }
}
