import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotsModule } from './bots/bots.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [
    //TypeOrmModule.forRoot(),
    BotsModule,
    StreamingModule
  ]
})
export class AppModule {}
