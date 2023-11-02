import { Module } from '@nestjs/common';
import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';
import { ProgrammerProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
import { TeamInfoModule } from './team-info/team-info.module';

@Module({
  imports: [
    ProgrammerProfileModule,
    EducationModule,
    ExperienceModule,
    ProjectModule,
    SkillModule,
    TeamInfoModule,
  ],
})
export class ProgrammerModule {}
