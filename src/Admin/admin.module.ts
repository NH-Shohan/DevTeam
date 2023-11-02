/* eslint-disable prettier/prettier */
// import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminEntity } from './admin.entity';
import { Module } from '@nestjs/common';
// import { AppService } from 'src/app.service';
import { AdminEntityService } from './admin.service';
@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [AdminController],
  providers: [AdminEntityService],
})
export class AdminModule {}
