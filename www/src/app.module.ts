import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotsModule } from './bots/bots.module';
import { StreamingModule } from './streaming/streaming.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { JobsModule } from './jobs/jobs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    BotsModule,
    StreamingModule,
    AccountsModule,
    JobsModule,
    UsersModule
  ]
})
export class AppModule {}
