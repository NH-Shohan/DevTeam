import {
  Controller,
  Get,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller()
export class TeamInfoController {
  //   Team Post Request
  @Post('team')
  @UsePipes(new ValidationPipe())
  createTeam() {
    return 'Hello Team';
  }

  //   Get All Teams Information
  @Get('team')
  @UsePipes(new ValidationPipe())
  getAllTeams() {}

  //   Get single Team Information
  @Get('team/:teamId')
  @UsePipes(new ValidationPipe())
  getSingleTeam() {}

  //   Update Team Information
  @Put('team/:teamId')
  @UsePipes(new ValidationPipe())
  updateTeam() {}

  //   Update Team Name
  @Patch('team/:teamId')
  @UsePipes(new ValidationPipe())
  UpdateTeamName() {}

  //   Delete Team
  @Patch('team/:teamId')
  @UsePipes(new ValidationPipe())
  DeleteTeam() {}
}
