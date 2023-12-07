import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamInfoController } from './team-info.controller';
import { TeamInfoEntity } from './team-info.entity';
import { TeamInfoService } from './team-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamInfoEntity])],
  controllers: [TeamInfoController],
  providers: [TeamInfoService],
})
export class TeamInfoModule {}
