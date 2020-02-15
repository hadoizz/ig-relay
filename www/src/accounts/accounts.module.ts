import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AuthModule } from '../auth/auth.module';
import { Account } from '../entities/account.entity';
import { UsersModule } from '../users/users.module';
import { Log } from '../entities/log.entity';
import { User } from '../entities/user.entity';
import { Followed } from '../entities/followed.entity';
import { Job } from '../entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Job, Log, User, Followed]), AuthModule, UsersModule],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService]
})
export class AccountsModule {}
