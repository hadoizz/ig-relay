import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Log } from './log.entity';
import { Followed } from './followed.entity';
import { Account } from '../accounts/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Log, Followed, Account]), AuthModule],
  providers: [LogsService],
  controllers: [LogsController],
  exports: [LogsService]
})
export class LogsModule {}
