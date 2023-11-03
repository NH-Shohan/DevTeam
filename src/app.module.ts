import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Admin/admin.module';
import { CompanyModule } from './company/company.module';
import { ProgrammerModule } from './programmer/programmer.module';

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
      synchronize: true,
    }),
    AdminModule,
    ProgrammerModule,
    CompanyModule,
  ],
})
export class AppModule {}
