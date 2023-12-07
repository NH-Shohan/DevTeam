/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  app.use(
    session({
      secret: 'DevTeam_Secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000, // 1 day
=======
  // somewhere in your initialization file
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 300000,
>>>>>>> a5a257349232ca21b9136ba7df2b3989b9d04c0a
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
