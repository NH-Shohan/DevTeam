/* eslint-disable prettier/prettier */
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
  Res,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ProfileDTO } from './profile.dto';
import { ProfileService } from './profile.service';
import { SessionGuard } from './session.gaurd';
import { UpdatePasswordDTO } from './update-password.dto';

@Controller('programmer')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // Create Programmer Profile
  @Post('profile')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      fileFilter: (_req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/)) cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 80000000 }, // 80MB
      storage: diskStorage({
        destination: './src/programmer/profile/ProfilePics',
        filename: function (_req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  createProfile(
    @Session() session,
    @UploadedFile() file: Express.Multer.File,
    @Body() profileInfo: ProfileDTO,
  ) {
    try {
      session.email = profileInfo.email;
      const fileName = file ? file.filename : null;
      const result = { ...profileInfo, profilePicture: fileName };
      return this.profileService.createUser(result);
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

  @Get('test')
  GetTest() {
    return 'Hello Hoye gese';
  }

  // Get Programmer Profile
  @Get('profile')
  @UseGuards(SessionGuard)
  getProfile() {
    try {
      return this.profileService.getAllProfileInfo();
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

  // Update Programmer Profile
  @Put('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  updateProfile(
    @Param('programmerId', ParseIntPipe) programmerId: number,
    @Body() profileInfo: ProfileDTO,
  ) {
    try {
      return this.profileService.updateProfile(programmerId, profileInfo);
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

  // Partially Update Password
  @Patch('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  updatePassword(
    @Param('programmerId', ParseIntPipe) programmerId: number,
    @Body() updatePassword: UpdatePasswordDTO,
  ) {
    try {
      return this.profileService.updateProfilePassword(
        programmerId,
        updatePassword,
      );
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

  // Delete Programmer Profile
  @Delete('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  deleteProgrammerProfile(
    @Param('programmerId', ParseIntPipe) programmerId: number,
  ) {
    try {
      return this.profileService.deleteProfile(programmerId);
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

  // Get Profile Pic
  @Get('/profilePic/:id')
  async getProfilePicture(@Param('id') id, @Res() res) {
    try {
      const profile = await this.profileService.getProfileById(id);
      res.sendFile(profile.profilePicture, {
        root: './src/programmer/profile/ProfilePics',
      });
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
