/* eslint-disable prettier/prettier */
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
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ProfileDTO } from './profile.dto';
import { ProfileService } from './profile.service';
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
    @UploadedFile() file: Express.Multer.File,
    @Body() profileInfo: ProfileDTO,
  ) {
    const fileName = file ? file.filename : null;
    const result = { ...profileInfo, profilePicture: fileName };
    return this.profileService.createUser(result);
  }

  // Get Programmer Profile
  @Get('profile')
  getProfile() {
    return this.profileService.getAllProfileInfo();
  }

  // Update Programmer Profile
  @Put('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  updateProfile(
    @Param('programmerId', ParseIntPipe) programmerId: number,
    @Body() profileInfo: ProfileDTO,
  ) {
    return this.profileService.updateProfile(programmerId, profileInfo);
  }

  // Partially Update Password
  @Patch('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  updatePassword(
    @Param('programmerId', ParseIntPipe) programmerId: number,
    @Body() updatePassword: UpdatePasswordDTO,
  ) {
    return this.profileService.updateProfilePassword(
      programmerId,
      updatePassword,
    );
  }

  // Delete Programmer Profile
  @Delete('profile/:programmerId')
  @UsePipes(new ValidationPipe())
  deleteProgrammerProfile(
    @Param('programmerId', ParseIntPipe) programmerId: number,
  ) {
    return this.profileService.deleteProfile(programmerId);
  }

  // Get Profile Pic
  @Get('/profilePic/:id')
  async getProfilePicture(@Param('id') id, @Res() res) {
    const profile = await this.profileService.getProfileById(id);

    res.sendFile(profile.profilePicture, {
      root: './src/programmer/profile/ProfilePics',
    });
  }
}
