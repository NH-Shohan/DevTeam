import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('programmer')
export class SearchController {
  // Search Teams
  @Get('/search/teams')
  @UsePipes(new ValidationPipe())
  searchTeams(
    @Query('teamName') teamName: string,
    @Query('teamMembers') teamMembers: string,
  ) {
    return { teamName, teamMembers };
  }

  // Search Programmers
  @Get('/search/programmers')
  @UsePipes(new ValidationPipe())
  searchProgrammers(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('githubUsername') githubUsername: string,
  ) {
    return { name, email, githubUsername };
  }
}
