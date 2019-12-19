import { Module } from '@nestjs/common'
import { BotsService } from './bots.service'
import { BotsController } from './bots.controller'
import { DevService } from './dev/dev.service'
import { ConfigModule } from '../config/config.module'

@Module({
  providers: [BotsService, DevService],
  controllers: [BotsController],
  imports: [ConfigModule],
  exports: [BotsService]
})
export class BotsModule {}
