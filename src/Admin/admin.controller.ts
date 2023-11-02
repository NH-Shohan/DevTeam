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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ValidateAdminProfile } from './admin.dto';
import { AdminEntityService } from './admin.service';

const recruiters = [];
const companies = [];
const users = [];

@Controller('admin')
export class AdminController {
  constructor(private readonly appService: AdminEntityService) {}
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

  @Post('reject-companies')
  rejectCompanies(@Body() body): any {
    return { message: 'Companies rejected successfully' };
  }

  @Post('approve-companies')
  approveCompanies(@Body() body): any {
    return { message: 'Companies approved successfully' };
  }

  @Get('companies')
  getCompanies(): any {
    return { message: 'Companies retrieved successfully', data: companies };
  }

  @Get('users')
  getAllUsers(): any {
    return { message: 'Users retrieved successfully', data: users };
  }

  @Delete('remove-user/:userId')
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

  @Get('user-growth')
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

  // Update profile on Database

  @Put('update-admin/:id')
  @UsePipes(new ValidationPipe())
  updateProfile(
    @Param('id', ParseIntPipe) id: number,

    @Body() profileInfo: ValidateAdminProfile,
  ) {
    return this.appService.updateAdminEntity(id, profileInfo);
  }

  @Patch('update-company/:companyId')
  updateCompany(@Param('companyId') companyId: string, @Body() patchData): any {
    return {
      message: 'Company updated (partial) successfully',
      data: {},
    };
  }

  //   lab-2
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) userId: number) {
    return { userId };
  }

  @Post('create-admin')
  @UsePipes(new ValidationPipe())
  createAdmin(@Body() profile: ValidateAdminProfile) {
    return this.appService.createAdminEntity(profile);
  }

  @Get('get-admins')
  getAllUser() {
    return this.appService.getAllAdminEntitys();
  }

  @Post('upload')
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

  @Get('/get-admin-image/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }
}
