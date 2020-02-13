import { Module } from '@nestjs/common'
import { BotsService } from './bots.service'
import { BotsController } from './bots.controller'
import { ConfigModule } from '../config/config.module'
import { LogsModule } from '../logs/logs.module'
import { AccountsModule } from '../accounts/accounts.module'

@Module({
  providers: [BotsService],
  controllers: [BotsController],
  imports: [ConfigModule, LogsModule, AccountsModule],
  exports: [BotsService]
})
export class BotsModule {}
