import { Module } from '@nestjs/common';
import { CertificationsModule } from './certifications/certification.module';
import { ExperienceModule } from './experience/experience.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { SearchModule } from './search/search.module';
import { TeamInfoModule } from './team-info/team-info.module';
import { ProgrammerProfileModule } from './test/profile.module';

@Module({
  imports: [
    ExperienceModule,
    ProjectModule,
    TeamInfoModule,
    ProfileModule,
    CertificationsModule,
    SearchModule,
    ProgrammerProfileModule,
  ],
})
export class ProgrammerModule {}
