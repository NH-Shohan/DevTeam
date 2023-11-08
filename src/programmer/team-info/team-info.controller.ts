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
import { TeamInfoDTO } from './team-info.dto';
import { UpdateTeamNameDTO } from './update-team-name.dto';

@Controller('programmer')
export class TeamInfoController {
  //   Team Post Request
  @Post('team')
  @UsePipes(new ValidationPipe())
  createTeam(@Body() teamInfo: TeamInfoDTO) {
    return teamInfo;
  }

  //   Get All Teams Information
  @Get('team')
  @UsePipes(new ValidationPipe())
  getAllTeams(@Body() teamInfo: TeamInfoDTO) {
    return teamInfo;
  }

  //   Get single Team Information
  @Get('team/:teamId')
  @UsePipes(new ValidationPipe())
  getSingleTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    return teamId;
  }

  //   Update Team Information
  @Put('team/:teamId')
  @UsePipes(new ValidationPipe())
  updateTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() teamInfo: TeamInfoDTO,
  ) {
    return { teamId, teamInfo };
  }

  //   Update Team Name
  @Patch('team/:teamId')
  @UsePipes(new ValidationPipe())
  updateTeamName(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() teamInfo: UpdateTeamNameDTO,
  ) {
    return { teamId, teamInfo };
  }

  //   Delete Team
  @Delete('team/:teamId')
  @UsePipes(new ValidationPipe())
  deleteTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    return teamId;
  }
}
