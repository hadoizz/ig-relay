import { Module } from '@nestjs/common'
import { BotsService } from './bots.service'
import { BotsController } from './bots.controller'
import { ConfigModule } from '../config/config.module'

@Module({
  providers: [BotsService],
  controllers: [BotsController],
  imports: [ConfigModule],
  exports: [BotsService]
})
export class BotsModule {}
