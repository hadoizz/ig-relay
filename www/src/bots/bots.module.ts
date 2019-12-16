import { Module } from '@nestjs/common'
import { BotsService } from './bots.service'
import { BotsController } from './bots.controller'
import { DevService } from './dev/dev.service'
import { ConfigService } from '../config/config.service'

@Module({
  providers: [BotsService, ConfigService, DevService],
  controllers: [BotsController]
})
export class BotsModule {}
