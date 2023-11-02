import { Module } from '@nestjs/common';
import { CompanyProfileController } from './company_profile.controller';

@Module({
    imports : [],
    controllers : [CompanyProfileController],

})
export class CompanyProfileModule {}