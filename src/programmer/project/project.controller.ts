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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectDTO } from './project.dto';
import { ProjectService } from './project.service';
import { UpdateProjectLinkDTO } from './update-project-link.dto';

@Controller('programmer')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  // Add Project
  @Post('project')
  @UsePipes(new ValidationPipe())
  addProject(@Body() projectInfo: ProjectDTO) {
    try {
      return this.projectService.addProject(projectInfo);
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

  // Get All Projects
  @Get('project')
  @UsePipes(new ValidationPipe())
  getAllProjects() {
    try {
      return this.projectService.getAllProjects();
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

  // Get single Project Details
  @Get('project/:projectId')
  @UsePipes(new ValidationPipe())
  getSingleProjectDetails(@Param('projectId', ParseIntPipe) projectId: number) {
    try {
      return this.projectService.getProjectById(projectId);
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

  // Update Project
  @Put('project/:projectId')
  @UsePipes(new ValidationPipe())
  updateProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() projectInfo: ProjectDTO,
  ) {
    try {
      return this.projectService.updateProject(projectId, projectInfo);
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

  // Partially Update Project Link
  @Patch('project/:projectId')
  @UsePipes(new ValidationPipe())
  updateProjectLink(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() projectInfo: UpdateProjectLinkDTO,
  ) {
    try {
      return this.projectService.updateProjectLink(projectId, projectInfo);
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

  // Delete Project
  @Delete('project/:projectId')
  @UsePipes(new ValidationPipe())
  deleteProject(@Param('projectId', ParseIntPipe) projectId: number) {
    try {
      return this.projectService.deleteProject(projectId);
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
