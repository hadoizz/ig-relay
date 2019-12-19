import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotsModule } from './bots/bots.module';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BotsModule,
    StreamingModule
  ],
  controllers: [AppController]
})
export class AppModule {}
