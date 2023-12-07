import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Admin/admin.module';
import { CompanyModule } from './company/company.module';
import { ProgrammerModule } from './programmer/programmer.module';
import { RecruiterModule } from './Recruiter/recruiter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'DevTeam',
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: false,
    }),
    AdminModule,
    RecruiterModule,
    ProgrammerModule,
    CompanyModule,
  ],
})
export class AppModule {}
