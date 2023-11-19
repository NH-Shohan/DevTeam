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
import { TeamInfoDTO } from './team-info.dto';
import { TeamInfoService } from './team-info.service';
import { UpdateTeamNameDTO } from './update-team-name.dto';

@Controller('programmer')
export class TeamInfoController {
  constructor(private teamInfoService: TeamInfoService) {}

  // Team Post Request
  @Post('team')
  @UsePipes(new ValidationPipe())
  createTeam(@Body() teamInfo: TeamInfoDTO) {
    try {
      return this.teamInfoService.postTeamInformation(teamInfo);
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

  // Get All Teams Information
  @Get('team')
  @UsePipes(new ValidationPipe())
  getAllTeams() {
    try {
      return this.teamInfoService.getAllTeamInfo();
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

  // Get single Team Information
  @Get('team/:teamId')
  @UsePipes(new ValidationPipe())
  getSingleTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    try {
      return this.teamInfoService.getTeamInfoById(teamId);
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

  // Update Team Information
  @Put('team/:teamId')
  @UsePipes(new ValidationPipe())
  updateTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() teamInfo: TeamInfoDTO,
  ) {
    try {
      return this.teamInfoService.updateTeamInfo(teamId, teamInfo);
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

  // Update Team Name
  @Patch('team/:teamId')
  @UsePipes(new ValidationPipe())
  updateTeamName(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() teamInfo: UpdateTeamNameDTO,
  ) {
    try {
      return this.teamInfoService.updateTeamName(teamId, teamInfo.newTeamName);
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

  // Delete Team
  @Delete('team/:teamId')
  @UsePipes(new ValidationPipe())
  deleteTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    try {
      return this.teamInfoService.deleteTeamInfo(teamId);
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
