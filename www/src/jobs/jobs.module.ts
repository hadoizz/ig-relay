import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { BotsModule } from '../bots/bots.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), BotsModule],
  providers: [JobsService],
  controllers: [JobsController]
})
export class JobsModule {}
