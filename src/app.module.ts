import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { RecruiterController } from './Recruiter/Recruiter.controller';
// import { AdminController } from './Admin/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Admin/admin.module';
// import { RecruiterModule } from './Recruiter/recruiter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'DevTeam', //Change to your database name
      autoLoadEntities: true,
      synchronize: true,
    }),
    AdminModule,
    // RecruiterModule,
  ],
  // controllers: [AppController, RecruiterController],
  // providers: [AppService],
})
export class AppModule {}
