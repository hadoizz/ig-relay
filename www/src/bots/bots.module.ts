import { Module } from '@nestjs/common'
import { BotsService } from './bots.service'
import { BotsController } from './bots.controller'
import { ConfigModule } from '../config/config.module'
import { LogsModule } from '../logs/logs.module'

@Module({
  providers: [BotsService],
  controllers: [BotsController],
  imports: [ConfigModule, LogsModule],
  exports: [BotsService]
})
export class BotsModule {}
