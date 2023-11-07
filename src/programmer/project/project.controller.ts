import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('programmer')
export class ProjectController {
  //   Add Project
  @Post('project')
  @UsePipes(new ValidationPipe())
  addProject() {}

  //   Get All Projects
  @Get('project')
  @UsePipes(new ValidationPipe())
  getAllProjects() {}

  //   Get single Project Details
  @Get('project/:projectId')
  @UsePipes(new ValidationPipe())
  getSingleProjectDetails() {}

  //   Update Project
  @Put('project/:projectId')
  @UsePipes(new ValidationPipe())
  updateProject() {}

  //   Partially Update Project Link
  @Patch('project/:projectId')
  @UsePipes(new ValidationPipe())
  updateProjectLink() {}

  //   Delete Project
  @Delete('project/:projectId')
  @UsePipes(new ValidationPipe())
  deleteProject() {}
}
