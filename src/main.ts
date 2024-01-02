/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30000000,
      },
    }),
  );

  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  await app.listen(3333);
}
bootstrap();

// Programmer comment
