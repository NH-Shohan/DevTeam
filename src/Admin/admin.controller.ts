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
  Session,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ValidateAdminProfile, ValidateModeratorProfile } from './admin.dto';
import { SessionGuard } from './session.guard';
import { GrowthEntityService } from './gowth.service';
import { GrowthEntity } from './growth.entity';
import { AdminEntityService } from './admin.service';
import { AdminEntity } from './admin.entity';

// const recruiters = [];
const companies = [];
const users = [];

// Admin Controller
// Staging added

@Controller('admin')
export class AdminController {
  constructor(
    private appService: AdminEntityService,
    private growthService: GrowthEntityService,
  ) {}

  // Read all Admin
  @Get('get-admins')
  // @UseGuards(SessionGuard)
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
    // console.log(profile);
    // You can now use both 'profile' and 'file' to create the admin entity
    const fileName = file ? file.filename : null;
    const result = { ...profile, imageName: fileName };

    return this.appService.createAdminEntity(result);
  }

  // update admin
  @Put('/update-admin/:email')
  async updateAdmin(
    @Param('email') email: string,
    @Body() updatedAdminData: Partial<AdminEntity>,
  ): Promise<AdminEntity> {
    return this.appService.updateAdminByEmail(email, updatedAdminData);
  }

  // Read own admin
  @Get('me/:email')
  getUser(@Session() session, @Param('email') email: string) {
    console.log(session);
    session.email = email;
    return this.appService.getAdminEntityById(email);
  }

  @Post('signin')
  async signIn(
    @Session() session,
    @Body() body: ValidateAdminProfile,
  ): Promise<any> {
    try {
      const user = await this.appService.signIn(body.email, body.password);
      if (user) {
        session.email = user.email;
        return { status: 'success' };
      } else {
        throw new HttpException(
          'Invalid username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete-admin/:id')
  deleteAdmin(@Param('id') id): any {
    try {
      this.appService.deleteAdminEntity(id);
    } catch (error) {
      console.log(error);
    }
    return { msg: 'Deleted Successfully' };
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

  //   Create Admin
  @Post('create-admin-moderator')
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
  createModerator(
    @Body() profile: ValidateModeratorProfile,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // You can now use both 'profile' and 'file' to create the admin entity
    const fileName = file ? file.filename : null;
    const result = { ...profile, imageName: fileName };

    // return this.appService.createAdminEntity(result);
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

  @Get('programmer')
  getAllUsers(): any {
    return { message: 'Users retrieved successfully', data: users };
  }

  @Delete('remove-programmer/:userId')
  removeUser(@Param('userId') userId: string): any {
    return { message: 'User removed successfully' };
  }

  // Growth
  @Post('create-growth')
  createGrowth(@Body() growth: GrowthEntity) {
    return this.growthService.createGrowth(growth);
  }

  @Get('company-growth')
  getCompanyGrowth(): any {
    return this.growthService.getAllGrowth();
  }

  @Get('programmer-growth')
  getUserGrowth(): any {
    return this.growthService.getAllGrowth();
  }

  @Get('recruiter-growth')
  getRecruiterGrowth(): any {
    return this.growthService.getAllGrowth();
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
