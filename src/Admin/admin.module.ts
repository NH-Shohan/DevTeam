/* eslint-disable prettier/prettier */
// import { AdminService } from './admin.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminEntity } from './admin.entity';
// import { AppService } from 'src/app.service';
import { AdminEntityService } from './admin.service';
import { GrowthEntityService } from './gowth.service';
import { GrowthEntity } from './growth.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    TypeOrmModule.forFeature([GrowthEntity]),
  ],
  controllers: [AdminController],
  providers: [AdminEntityService, GrowthEntityService],
})
export class AdminModule {}
