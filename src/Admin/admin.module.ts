/* eslint-disable prettier/prettier */
// import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminEntity } from './admin.entity';
import { Module } from '@nestjs/common';
// import { AppService } from 'src/app.service';
import { AdminEntityService } from './admin.service';
import { AdminRecruiterEntityService } from './adminRecruiterEntity.service';
import { AdminRecruiterEntity } from './AdminRecruiter.entity';
import { GrowthEntityService } from './gowth.service';
import { GrowthEntity } from './growth.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    TypeOrmModule.forFeature([AdminRecruiterEntity]),
    TypeOrmModule.forFeature([GrowthEntity]),
  ],
  controllers: [AdminController],
  providers: [
    AdminEntityService,
    AdminRecruiterEntityService,
    GrowthEntityService,
  ],
})
export class AdminModule {}
