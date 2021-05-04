import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SSEMiddleware } from 'nestjs-sse';
import { BotsModule } from '../bots/bots.module';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';

@Module({
  controllers: [StreamingController],
  imports: [BotsModule],
  providers: [StreamingService],
})
export class StreamingModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SSEMiddleware).forRoutes(StreamingController);
  }
}
