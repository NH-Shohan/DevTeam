import { Module } from '@nestjs/common';
import { TeamInfoController } from './team-info.controller';
import { TeamInfoService } from './team-info.service';

@Module({
  controllers: [TeamInfoController],
  providers: [TeamInfoService],
})
export class TeamInfoModule {}
