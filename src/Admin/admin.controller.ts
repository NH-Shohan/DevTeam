/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  Patch,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ValidateAdminProfile } from './admin.dto';
import { AdminEntityService } from './admin.service';

const recruiters = [];
const companies = [];
const users = [];

// Admin Controller
// Staging added

@Controller('admin')
export class AdminController {
  constructor(private appService: AdminEntityService) {}

  // Read all Admin
  @Get('get-admins')
  getAdmin() {
    return this.appService.getAllAdminEntitys();
  }

  //   Create Admin
  @Post('create-admin')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('imageName', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/)) cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },

      limits: { fileSize: 6000000 },

      storage: diskStorage({
        destination: './uploads',

        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  createAdmin(
    @Body() profile: ValidateAdminProfile,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // You can now use both 'profile' and 'file' to create the admin entity
    const fileName = file ? file.filename : null;
    const result = { ...profile, imageName: fileName };

    return this.appService.createAdminEntity(result);
  }

  // Read own admin
  @Get('me/:email')
  getUser(@Param('email') email: string) {
    return this.appService.getAdminEntityById(email);
  }

  // Update Admin full profile
  @Put('update-admin/:id')
  @UsePipes(new ValidationPipe())
  updateProfile(
    @Param('id', ParseIntPipe) id: number,

    @Body() profileInfo: ValidateAdminProfile,
  ) {
    const updated = this.appService.updateAdminEntity(id, profileInfo);
    return {
      updated,
      msg: 'Successfully updated',
    };
  }

  // Upload Admin Photo
  @Post('upload-admin-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/)) cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },

      limits: { fileSize: 6000000 },

      storage: diskStorage({
        destination: './uploads',

        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  // View Profile photo
  @Get('/get-admin-image/:email')
  async getProfilePicture(@Param('email') email, @Res() res) {
    try {
      const profile = await this.appService.getAdminEntityById(email);
      res.sendFile(profile.imageName, {
        root: './uploads',
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

  // Show all Recruiters
  @Get('recruiters')
  getRecruiters(): any {
    return { message: 'Recruiters retrieved successfully', data: recruiters };
  }

  @Post('approve-recruiters')
  approveRecruiters(@Body() body): any {
    return { message: 'Recruiters approved successfully' };
  }

  @Post('reject-recruiters')
  rejectRecruiters(@Body() body): any {
    return { message: 'Recruiters rejected successfully' };
  }

  @Get('companies')
  getCompanies(): any {
    return { message: 'Companies retrieved successfully', data: companies };
  }

  @Post('approve-companies')
  approveCompanies(@Body() body): any {
    return { message: 'Companies approved successfully' };
  }

  @Post('reject-companies')
  rejectCompanies(@Body() body): any {
    return { message: 'Companies rejected successfully' };
  }

  // Update Admin property
  @Patch('update-company/:companyId')
  updateCompany(@Param('companyId') companyId: string, @Body() patchData): any {
    return {
      message: 'Company updated (partial) successfully',
      data: {},
    };
  }

  @Get('programmer')
  getAllUsers(): any {
    return { message: 'Users retrieved successfully', data: users };
  }

  @Delete('remove-programmer/:userId')
  removeUser(@Param('userId') userId: string): any {
    return { message: 'User removed successfully' };
  }

  @Get('company-growth')
  getCompanyGrowth(): any {
    return {
      message: 'Company growth data retrieved successfully',
      data: {},
    };
  }

  @Get('programmer-growth')
  getUserGrowth(): any {
    return {
      message: 'User growth data retrieved successfully',
      data: {},
    };
  }

  @Get('recruiter-growth')
  getRecruiterGrowth(): any {
    return {
      message: 'Recruiter growth data retrieved successfully',
      data: {},
    };
  }

  @Post('add-admin-moderator')
  addAdminModerator(@Body() body): any {
    return { message: 'Admin/Moderator added successfully' };
  }

  @Put('update-recruiter/:recruiterId')
  updateRecruiter(
    @Param('recruiterId') recruiterId: string,
    @Body() updateData,
  ): any {
    return {
      message: 'Recruiter updated successfully',
      data: {},
    };
  }
}
