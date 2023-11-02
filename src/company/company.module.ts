import { Module } from '@nestjs/common';
import { CompanyProfileModule } from './company_profile/company_profile.module';


@Module({
    imports : [CompanyProfileModule],
    controllers : [],

})
export class CompanyModule {}