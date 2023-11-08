import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExperienceDTO } from './experience.dto';

@Controller('programmer')
export class ExperienceController {
  //   Add Work Experience
  @Post('experience')
  @UsePipes(new ValidationPipe())
  addWorkExperience(@Body() experienceInfo: ExperienceDTO) {
    return experienceInfo;
  }

  //   Get All Work Experiences
  @Get('experience')
  @UsePipes(new ValidationPipe())
  getAllWorkExperiences(@Body() experienceInfo: ExperienceDTO) {
    return experienceInfo;
  }

  //   Get single Work Experience Details
  @Get('experience/:experienceId')
  @UsePipes(new ValidationPipe())
  getSingleWorkExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
  ) {
    return experienceId;
  }

  //   Update Work Experience
  @Put('experience/:experienceId')
  @UsePipes(new ValidationPipe())
  updateWorkExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
    @Body() experienceInfo: ExperienceDTO,
  ) {
    return { experienceId, experienceInfo };
  }

  //   Delete Work Experience
  @Delete('experience/:experienceId')
  @UsePipes(new ValidationPipe())
  deleteWorkExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
  ) {
    return experienceId;
  }
}
