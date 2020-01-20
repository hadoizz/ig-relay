import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../entities/job.entity';
import { BotsModule } from '../bots/bots.module';
import { AccountsModule } from '../accounts/accounts.module';
import { User } from '../entities/user.entity';
import { LogsModule } from '../logs/logs.module';
import { Account } from '../entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, User, Account]), BotsModule, AccountsModule, LogsModule],
  providers: [JobsService],
  controllers: [JobsController]
}) 
export class JobsModule {}
