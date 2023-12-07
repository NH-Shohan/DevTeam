import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceController } from './experience.controller';
import { ExperienceEntity } from './experience.entity';
import { ExperienceService } from './experience.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceEntity])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
