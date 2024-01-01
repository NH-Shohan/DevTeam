import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('programmer')
export class SearchController {
  constructor(private searchService: SearchService) {}

  // Search Teams
  @Get('/search/teams')
  @UsePipes(new ValidationPipe())
  searchTeams(@Body('teamName') teamName: string) {
    try {
      return this.searchService.searchTeams(teamName);
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

  // Search Programmers
  @Get('/search/programmers')
  @UsePipes(new ValidationPipe())
  searchProgrammers(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('gitHubUsername') gitHubUsername: string,
  ) {
    try {
      const result = this.searchService.searchProgrammers(
        name,
        email,
        gitHubUsername,
      );
      return result;
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
