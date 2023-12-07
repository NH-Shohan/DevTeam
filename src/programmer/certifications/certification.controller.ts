import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CertificationDTO } from './certification.dto';
import { CertificationsService } from './certification.service';

@Controller('programmer')
export class CertificationsController {
  constructor(private certificationsService: CertificationsService) {}

  // Add Certification
  @Post('certifications')
  @UsePipes(new ValidationPipe())
  addCertification(@Body() certificationsInfo: CertificationDTO) {
    try {
      return this.certificationsService.addCertification(certificationsInfo);
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

  // Get All Certifications
  @Get('certifications')
  @UsePipes(new ValidationPipe())
  getAllCertifications() {
    try {
      return this.certificationsService.getAllCertifications();
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

  // Update Certification
  @Put('certifications/:certificationId')
  @UsePipes(new ValidationPipe())
  updateCertifications(
    @Param('certificationId', ParseIntPipe) certificationId: number,
    @Body() certificationsInfo: CertificationDTO,
  ) {
    try {
      return this.certificationsService.updateCertifications(
        certificationId,
        certificationsInfo,
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

  // Delete Certification
  @Delete('certifications/:certificationId')
  @UsePipes(new ValidationPipe())
  deleteCertification(
    @Param('certificationId', ParseIntPipe) certificationId: number,
  ) {
    try {
      return this.certificationsService.deleteCertification(certificationId);
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
