/* eslint-disable @typescript-eslint/no-unused-vars */
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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ValidateProgrammerProfile } from './Profile.dto';
import { ProfileService } from './profile.service';
import { UpdatePasswordDTO } from './update-password.dto';

@Controller('programmer/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // Post on Database
  @Post('createProfile')
  @UsePipes(new ValidationPipe())
  createProfile(@Body() profileInfo: ValidateProgrammerProfile) {
    return this.profileService.createUser(profileInfo);
  }

  // Get all profile Infromation
  @Get('getAllProfileInfo')
  getAllUser() {
    return this.profileService.getAllProfileInfo();
  }

  // Get Profile by ID from database
  @Get('getProfile/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.getProfileById(id);
  }

  // Get Profile by Name from database
  @Get('getProfileByName/:name')
  getUserByName(@Param('name') name: string) {
    return this.profileService.getProfileByName(name);
  }

  // Update profile on Database
  @Put('updateProfile/:id')
  @UsePipes(new ValidationPipe())
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profileInfo: ValidateProgrammerProfile,
  ) {
    return this.profileService.updateProfile(id, profileInfo);
  }

  // Update password on Database
  @Patch('updateProfilePassword/:id')
  @UsePipes(new ValidationPipe())
  updateProfilePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ) {
    return this.profileService.updateProfilePassword(id, updatePasswordDTO);
  }

  // Delete Profile
  @Delete('deleteProfile/:id')
  deleteProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.deleteProfile(id);
  }

  // Search Profile
  @Get('searchProfile/:name')
  searchProfile(@Param('name') name: string) {
    return this.profileService.searchAllProfileInfo(name);
  }

  @Post('login')
  login(@Body() programmerProfile: ValidateProgrammerProfile) {
    // return this.profileService.loginProgile();
  }

  // Image Upload
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/)) cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 60000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return file;
  // }
  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }
}
