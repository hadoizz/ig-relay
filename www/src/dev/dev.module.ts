import { Module } from '@nestjs/common'
import { DevController } from './dev.controller'
import { BotService } from '../bot/bot.service'
import { BotModule } from '../bot/bot.module'

@Module({
  controllers: [DevController],
  providers: [BotService],
  imports: [BotModule]
})
export class DevModule {}