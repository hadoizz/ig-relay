import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AuthModule } from '../auth/auth.module';
import { Account } from '../entities/account.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User]), AuthModule],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService]
})
export class AccountsModule {}
