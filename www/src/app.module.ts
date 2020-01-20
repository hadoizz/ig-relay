import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotsModule } from './bots/bots.module';
import { StreamingModule } from './streaming/streaming.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { JobsModule } from './jobs/jobs.module';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { Job } from './entities/job.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    BotsModule,
    StreamingModule,
    AccountsModule,
    JobsModule,
    UsersModule,
    LogsModule,

    //appservice
    TypeOrmModule.forFeature([User, Account, Job])
  ],
  providers: [AppService]
})
export class AppModule {}
