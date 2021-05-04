import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import 'reflect-metadata';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT || 8080, '0.0.0.0');

  console.log(`Server listening on port: ${process.env.PORT || 8080}`);
  if (process.env.NODE_ENV === 'production') console.log('Production mode');
})();
