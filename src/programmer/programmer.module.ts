import { Module } from '@nestjs/common';
import { CertificationsModule } from './certifications/certification.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './project/project.module';
import { SearchModule } from './search/search.module';
import { TeamInfoModule } from './team-info/team-info.module';

@Module({
  imports: [
    ExperienceModule,
    ProjectModule,
    TeamInfoModule,
    CertificationsModule,
    SearchModule,
  ],
})
export class ProgrammerModule {}
