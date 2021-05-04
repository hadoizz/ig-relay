import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';

@Module({
  providers: [BotsService],
  controllers: [BotsController],
  imports: [ConfigModule],
  exports: [BotsService],
})
export class BotsModule {}
