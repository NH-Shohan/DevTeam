import {
  Controller,
  Post,
  Body,
  Session,
  Res,
  UseGuards,
  Get,
  Request,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AdminEntityService } from 'src/Admin/admin.service';
import { RecruiterEntityService } from 'src/Recruiter/recruiter.service';
import { CompanyService } from 'src/company/company.service';
import { ProfileService } from 'src/programmer/profile/profile.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly adminService: AdminEntityService,
    // private readonly recruiterService: RecruiterEntityService,
    // private readonly companyService: CompanyService,
    // private readonly programmerService: ProfileService,
  ) {}

  @Post('login')
  async loginUser(
    @Body() loginData: { email: string; password: string },
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ): Promise<any> {
    const passwordMatch = await this.authService.loginUser(
      loginData.email,
      loginData.password,
      session,
    );

    if (passwordMatch) {
      // Return the session to the frontend
      return res
        .status(200)
        .json({ session, success: true, role: session.role });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  // @UseGuards()
  @Get('get-user/:email')
  async getProfile(@Param('email') email: string) {
    // const { email } = req.user;

    // Check if the email exists in any of the tables and fetch the profile
    const adminProfile = await this.authService.getAdminProfileByEmail(email);
    if (adminProfile) {
      return adminProfile;
    }

    const recruiterProfile =
      await this.authService.getRecruiterProfileByEmail(email);
    if (recruiterProfile) {
      return recruiterProfile;
    }

    const programmerProfile =
      await this.authService.getProgrammerProfileByEmail(email);
    if (programmerProfile) {
      return programmerProfile;
    }

    const companyProfile =
      await this.authService.getCompanyProfileByEmail(email);
    if (companyProfile) {
      return companyProfile;
    }

    return null; // No matching profile found
  }
}
