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
  constructor(private readonly appService: RecruiterEntityService) { }

  @Get("get-recruiters")
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
    // You can now use both 'profile' and 'file' to create the admin entity
    const fileName = file.filename;
    const result = { ...profile, image: fileName };
 
    return this.appService.createRecruiterEntity(result);
  }

  
  @Get("get-recruiter/:email")
  getMyProfile(): any {
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


  //   get image

  @Get('/get-recruiter-image/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './recruiter-uploads' });
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
  deleteInterview(@Param('developerEmail') developerEmail:string):any{
    return{
      message:'interview deleted successfully',
      data:'deletedInterview'
    }

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
    return "success";
  }
  //see all candidates
  @Get('show-candidates')
  getCandidates(): any {
    return { message: 'Candidates retrieved successfully', data: candidates };
  }

  // @Get('candidate-requests')
  // getCandidateRequestsForJob(): any {
  //   return {
  //     message: 'Candidate requests retrieved successfully',
  //     data: {},
  //   };
  // }

  
   
  //Approve Candidate
  @Post('approve-candidates')
  approveCandidatesForJob(@Body() body): any {
    return { message: 'Candidates approved successfully' };
  }
  //Reject Candidate
  @Post('reject-candidates')
  rejectCandidates(@Body() body): any {
    return { message: 'Candidates rejected successfully' };
  }

 //approve company request
  @Post('approve-interview-request')
  approveInterviewRequest(@Body() body): any {
    return { message: 'Interview requests approved successfully', data: body };
  }

  //Reject company request
  @Post('reject-company-request')
  rejectCompanyRequest(@Body() body): any {
    return { message: 'Candidates rejected successfully' };
  }

  //Full Recruiter team
  @Post('recruit-team')
  recruitTeam(@Body() body): any {
    return { message: 'Team members recruited successfully' };
  }

  //View message from Candidate
  @Get('messages-from-candidates')
  getMessagesFromCandidates(): any {
    return {
      message: 'Messages from candidates retrieved successfully',
      data: {},
    };
  }

  //View message from companies
  @Get('messages-from-companies')
  getMessagesFromCompanies(): any {
    return {
      message: 'Messages from companies retrieved successfully',
      data: {},
    };
  }

  
   

  

  //   Lab-2

  // @Get(':id')
  // getUser(@Param('id', ParseIntPipe) userId: number) {
  //   return { msg: 'recruiter er kaaj', userId: userId };
  // }

  //   file upload
  



  

  // Delete candidate

  



  

}
