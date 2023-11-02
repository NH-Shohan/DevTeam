import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
} from '@nestjs/common';

@Controller('company')
export class CompanyProfileController {
  @Get('getAllCompanyInfo')
  getCompanyProfile() {
    
  }

  @Get('getCompanyID/:id')
  getCompanyID(@Param() companyId: number) {
    return companyId;
  }

  @Put('updateCompany')
  updateCompany(@Body() updatecompany: string) {
    return updatecompany;
  }

  @Patch('updateCompanyID/:id')
  updateCompanyID(@Body() updateCompanyID: number) {
    return updateCompanyID;
  }

  @Delete('deleteCompanyID/:id')
  deleteCompanyID(@Param('id') company_id: number) {
    return company_id;
  }

  @Post('newCompanyProfile')
  newCompanyProfile(@Body() company_name: string) {
    return company_name;
  }
}
