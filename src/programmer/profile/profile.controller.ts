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
import { ProfileDTO } from './profile.dto';
import { UpdatePasswordDTO } from './update-password.dto';

@Controller('programmer')
export class ProfileController {
  //   Create Programmer Profile
  @Post('profile')
  @UsePipes(new ValidationPipe())
  createProgrammerProfile(@Body() profileInfo: ProfileDTO) {
    return profileInfo;
  }

  //   Get Programmer Profile
  @Get('profile')
  @UsePipes(new ValidationPipe())
  getProgrammerProfile(@Body() profileInfo: ProfileDTO) {
    return profileInfo;
  }

  //   Update Programmer Profile
  @Put('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  updateProgrammerProfile(
    @Param('programmerId', ParseIntPipe) programmerId: number,
    @Body() profileInfo: ProfileDTO,
  ) {
    return { programmerId, profileInfo };
  }

  //   Partially Update Password
  @Patch('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  updatePassword(
    @Param('programmerId', ParseIntPipe) programmerId: number,
    @Body() profileInfo: UpdatePasswordDTO,
  ) {
    return { programmerId, profileInfo };
  }

  //   Delete Programmer Profile
  @Delete('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  deleteProgrammerProfile(
    @Param('programmerId', ParseIntPipe) programmerId: number,
  ) {
    return programmerId;
  }
}
