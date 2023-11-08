import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileControllerTest } from './profile.controller';
import { ProgrammerProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgrammerProfileEntity])],
  controllers: [ProfileControllerTest],
  providers: [ProfileService],
})
export class ProgrammerProfileModule {}
