import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppService } from './app.service';
import { BotsModule } from './bots/bots.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [
    BotsModule,
    StreamingModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
