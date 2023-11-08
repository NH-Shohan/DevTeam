import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectDTO } from './project.dto';
import { UpdateProjectLinkDTO } from './update-project-link.dto';

@Controller('programmer')
export class ProjectController {
  //   Add Project
  @Post('project')
  @UsePipes(new ValidationPipe())
  addProject(@Body() projectInfo: ProjectDTO) {
    return projectInfo;
  }

  //   Get All Projects
  @Get('project')
  @UsePipes(new ValidationPipe())
  getAllProjects(@Body() projectInfo: ProjectDTO) {
    return projectInfo;
  }

  //   Get single Project Details
  @Get('project/:projectId')
  @UsePipes(new ValidationPipe())
  getSingleProjectDetails(@Param('projectId', ParseIntPipe) projectId: number) {
    return projectId;
  }

  //   Update Project
  @Put('project/:projectId')
  @UsePipes(new ValidationPipe())
  updateProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() projectInfo: ProjectDTO,
  ) {
    return { projectId, projectInfo };
  }

  //   Partially Update Project Link
  @Patch('project/:projectId')
  @UsePipes(new ValidationPipe())
  updateProjectLink(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() projectInfo: UpdateProjectLinkDTO,
  ) {
    return { projectId, projectInfo };
  }

  //   Delete Project
  @Delete('project/:projectId')
  @UsePipes(new ValidationPipe())
  deleteProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return projectId;
  }
}
