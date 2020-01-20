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
import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  "type": "mysql",
  "host": process.env.MYSQL_HOST || "localhost",
  "port": 3306,
  "username": process.env.MYSQL_USERNAME || "root",
  "password": process.env.MYSQL_PASSWORD || "",
  "database": process.env.MYSQL_DB || "insta",
  "entities": [__dirname + "/entities/*.entity{.js,.ts}"],
  "synchronize": true
}

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
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
