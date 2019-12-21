import { Module, MiddlewareConsumer } from '@nestjs/common';
import { StreamingController } from './streaming.controller';
import { BotsModule } from '../bots/bots.module';
import { SSEMiddleware } from 'nestjs-sse'
import { StreamingService } from './streaming.service';

@Module({
  controllers: [StreamingController],
  imports: [BotsModule],
  providers: [StreamingService]
})
export class StreamingModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(SSEMiddleware)
      .forRoutes(StreamingController)
  }
}
