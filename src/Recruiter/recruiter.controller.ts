/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  Patch,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { ValidateRecruiterProfile } from './recruiter.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { RecruiterEntityService } from './recruiter.service';

// recruiter
const interviews = [];
const jobRequests = [];
const candidates = [];

@Controller('recruiter')
export class RecruiterController {
  constructor(private readonly appService: RecruiterEntityService) {}
  @Get('interview-list')
  getInterviewList(): any {
    return {
      message: 'Interview list retrieved successfully',
      data: interviews,
    };
  }

  @Get('company-requests')
  getCompanyRequests(): any {
    return {
      message: 'Company requests retrieved successfully',
      data: jobRequests,
    };
  }

  @Get('candidates')
  getCandidates(): any {
    return { message: 'Candidates retrieved successfully', data: candidates };
  }

  @Get('candidate-requests')
  getCandidateRequestsForJob(): any {
    return {
      message: 'Candidate requests retrieved successfully',
      data: {},
    };
  }

  @Post('approve-candidates')
  approveCandidatesForJob(@Body() body): any {
    return { message: 'Candidates approved successfully' };
  }

  @Post('reject-candidates')
  rejectCandidates(@Body() body): any {
    return { message: 'Candidates rejected successfully' };
  }

  @Post('recruit-team')
  recruitTeam(@Body() body): any {
    return { message: 'Team members recruited successfully' };
  }

  @Post('interview-team')
  interviewTeam(@Body() body): any {
    return { message: 'Team members interviewed successfully' };
  }

  @Post('set-interview')
  setInterview(@Body() body): any {
    const returnVariable = {
      message: 'Interview set successfully',
      data: body,
    };
    return returnVariable;
  }

  @Post('approve-interview-request')
  approveInterviewRequest(@Body() body): any {
    return { message: 'Interview requests approved successfully', data: body };
  }

  @Get('messages-from-candidates')
  getMessagesFromCandidates(): any {
    return {
      message: 'Messages from candidates retrieved successfully',
      data: {},
    };
  }

  @Get('messages-from-companies')
  getMessagesFromCompanies(): any {
    return {
      message: 'Messages from companies retrieved successfully',
      data: {},
    };
  }

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

  @Delete('delete-candidate/:candidateId')
  deleteCandidate(@Param('candidateId') candidateId: string): any {
    // Find the candidate by ID in the 'candidates' array
    // const candidateIndex = candidates.findIndex(
    //   (candidate) => candidate.id === candidateId,
    // );

    // if (candidateIndex !== -1) {
    //   // If found, remove the candidate from the array
    //   const deletedCandidate = candidates.splice(candidateIndex, 1)[0];
    //   return {
    //     message: 'Candidate deleted successfully',
    //     data: deletedCandidate,
    //   };
    // } else {
    //   return { message: 'Candidate not found' };
    // }

    return {
      message: 'Candidate deleted successfully',
      data: 'deletedCandidate',
    };
  }

  //   Lab-2

  // @Get(':id')
  // getUser(@Param('id', ParseIntPipe) userId: number) {
  //   return { msg: 'recruiter er kaaj', userId: userId };
  // }

  //   file upload
  @Post('recruiter-upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },

      limits: { fileSize: 5000000 },

      storage: diskStorage({
        destination: './recruiter-uploads',

        filename: function (req, file, cb) {
          cb(null, Date.now() + 'rokeya' + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { msg: 'success', file: file };
  }

  //   get image

  @Get('/get-recruiter-image/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './recruiter-uploads' });
  }



  // creates
  @Post('create-recruiter')
  @UsePipes(new ValidationPipe())
  createRecruiter(@Body() profile: ValidateRecruiterProfile) {
    return this.appService.createRecruiterEntity(profile);
  }

  // Delete Recruiter

  @Delete('delete-recruiter/:id')
  deleteProfile(@Param('id', ParseIntPipe) id: number) {
    this.appService.deleteRecruiterEntity(id);
    return "success";
    }

  @Get("Show-recruiter")
  getViewRecruiter():any{
    return this.appService.getAllRecruiterEntitys();
    }

    // Update profile on Database

  @Put('update-recruiter/:id')
  @UsePipes(new ValidationPipe())
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedProfile: ValidateRecruiterProfile,
  ) {

    return this.appService.updateRecruiterEntity(id, updatedProfile);

  }

}
