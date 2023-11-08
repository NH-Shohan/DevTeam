import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CertificationDTO } from './certification.dto';

@Controller('programmer')
export class CertificationsController {
  //   Add Certification
  @Post('certifications')
  @UsePipes(new ValidationPipe())
  addCertification(@Body() certificationsInfo: CertificationDTO) {
    return certificationsInfo;
  }

  //   Get All Certifications
  @Get('certifications')
  @UsePipes(new ValidationPipe())
  getAllCertifications(@Body() certificationsInfo: CertificationDTO) {
    return certificationsInfo;
  }

  //   Update Certification
  @Put('certifications/:certificationId')
  @UsePipes(new ValidationPipe())
  updateCertifications(
    @Param('certificationId', ParseIntPipe) certificationId: number,
    @Body() certificationsInfo: CertificationDTO,
  ) {
    return { certificationId, certificationsInfo };
  }

  //   Delete Certification
  @Delete('certifications/:certificationId')
  @UsePipes(new ValidationPipe())
  deleteCertification(
    @Param('certificationId', ParseIntPipe) certificationId: number,
  ) {
    return certificationId;
  }
}
