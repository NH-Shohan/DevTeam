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
export class ProfileController {
  //   Create Programmer Profile
  @Post('profile')
  @UsePipes(new ValidationPipe())
  createProgrammerProfile() {}

  //   Get Programmer Profile
  @Get('profile')
  @UsePipes(new ValidationPipe())
  getProgrammerProfile() {}

  //   Update Programmer Profile
  @Put('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  updateProgrammerProfile() {}

  //   Partially Update GitHub Username
  @Patch('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  UpdateGitHubUsername() {}

  //   Delete Programmer Profile
  @Delete('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  deleteProgrammerProfile() {}
}
