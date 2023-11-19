import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '../profile/profile.entity';
import { TeamInfoEntity } from '../team-info/team-info.entity';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamInfoEntity, ProfileEntity])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
