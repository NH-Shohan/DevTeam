import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProgrammerProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgrammerProfileEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProgrammerProfileModule {}
