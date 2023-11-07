import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('programmer')
export class CertificationsController {
  //   Add Certification
  @Post('certifications')
  @UsePipes(new ValidationPipe())
  addCertification() {
    return 'Hello';
  }

  //   Get All Certifications
  @Get('certifications')
  @UsePipes(new ValidationPipe())
  getAllCertifications() {}

  //   Update Certification
  @Put('certifications/:certificationId')
  @UsePipes(new ValidationPipe())
  updateCertifications() {}

  //   Delete Certification
  @Delete('certifications/:certificationId')
  @UsePipes(new ValidationPipe())
  deleteCertification() {}
}
