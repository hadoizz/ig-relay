import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotsModule } from './bots/bots.module';
import { StreamingModule } from './streaming/streaming.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BotsModule,
    StreamingModule,
    AuthModule
  ]
})
export class AppModule {}
