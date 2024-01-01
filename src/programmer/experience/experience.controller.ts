import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExperienceDTO } from './experience.dto';
import { ExperienceService } from './experience.service';

@Controller('programmer')
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  // Add Work Experience
  @Post('experience')
  @UsePipes(new ValidationPipe())
  addWorkExperience(@Body() experienceInfo: ExperienceDTO) {
    try {
      return this.experienceService.addWorkExperience(experienceInfo);
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

  // Get All Work Experiences
  @Get('experience')
  @UsePipes(new ValidationPipe())
  getAllWorkExperiences() {
    try {
      return this.experienceService.getAllWorkExperiences();
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

  // Get single Work Experience Details
  @Get('experience/:experienceId')
  @UsePipes(new ValidationPipe())
  getSingleWorkExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
  ) {
    try {
      return this.experienceService.getSingleWorkExperienceById(experienceId);
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

  // Update Work Experience
  @Put('experience/:experienceId')
  @UsePipes(new ValidationPipe())
  updateWorkExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
    @Body() experienceInfo: ExperienceDTO,
  ) {
    try {
      return this.experienceService.updateWorkExperience(
        experienceId,
        experienceInfo,
      );
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

  // Delete Work Experience
  @Delete('experience/:experienceId')
  @UsePipes(new ValidationPipe())
  deleteWorkExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
  ) {
    try {
      return this.experienceService.deleteWorkExperience(experienceId);
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
}
