import { Module } from '@nestjs/common'
import { DevController } from './dev.controller'
import { BotModule } from '../bot/bot.module'
import { devProviders } from './dev.providers'

@Module({
  controllers: [DevController],
  providers: [...devProviders],
  imports: [BotModule]
})
export class DevModule {}