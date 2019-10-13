import { Module } from '@nestjs/common'
import { DevModule } from './dev/dev.module'
import { BotModule } from './bot/bot.module'

@Module({
  imports: [
    DevModule, 
    BotModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
