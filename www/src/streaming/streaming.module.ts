import { Module, MiddlewareConsumer } from '@nestjs/common';
import { StreamingController } from './streaming.controller';
import { BotsModule } from '../bots/bots.module';
import { SSEMiddleware } from 'nestjs-sse'

@Module({
  controllers: [StreamingController],
  imports: [BotsModule]
})
export class StreamingModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(SSEMiddleware)
      .forRoutes(StreamingController)
  }
}
