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
export class TeamInfoController {
  //   Team Post Request
  @Post('team')
  @UsePipes(new ValidationPipe())
  createTeam() {}

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
  updateTeamName() {}

  //   Delete Team
  @Delete('team/:teamId')
  @UsePipes(new ValidationPipe())
  deleteTeam() {}
}
