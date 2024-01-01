/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // somewhere in your initialization file

  // const corsOptions: CorsOptions = {
  //   origin: 'http://localhost:3000', // Specify your frontend origin
  //   credentials: true, // Allow credentials (cookies)
  // };

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

  // Enable CORS
  // Enable CORS

  // app.enableCors(corsOptions);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  await app.listen(3333);
}
bootstrap();

// Programmer comment
