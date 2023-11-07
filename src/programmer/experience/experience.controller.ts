import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('programmer')
export class ExperienceController {
  //   Add Work Experience
  @Post('experience')
  @UsePipes(new ValidationPipe())
  addWorkExperience() {}

  //   Get All Work Experiences
  @Get('experience')
  @UsePipes(new ValidationPipe())
  getAllWorkExperiences() {}

  //   Get single Work Experience Details
  @Get('experience/:experienceId')
  @UsePipes(new ValidationPipe())
  getSingleWorkExperience() {}

  //   Update Work Experience
  @Put('experience/:experienceId')
  @UsePipes(new ValidationPipe())
  updateWorkExperience() {}

  //   Delete Work Experience
  @Delete('experience/:experienceId')
  @UsePipes(new ValidationPipe())
  deleteWorkExperience() {}
}
