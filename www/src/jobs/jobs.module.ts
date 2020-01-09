import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { BotsModule } from '../bots/bots.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), BotsModule, AccountsModule],
  providers: [JobsService],
  controllers: [JobsController]
})
export class JobsModule {}
