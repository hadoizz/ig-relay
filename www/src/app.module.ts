import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppService } from './app.service';
import { BotsModule } from './bots/bots.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [BotsModule, StreamingModule],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
