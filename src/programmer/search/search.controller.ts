import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('programmer')
export class SearchController {
  //   Search Teams
  @Get('/search/teams')
  @UsePipes(new ValidationPipe())
  searchTeams() {}

  //   Search Programmers
  @Get('/search/programmers')
  @UsePipes(new ValidationPipe())
  searchProgrammers() {}
}
