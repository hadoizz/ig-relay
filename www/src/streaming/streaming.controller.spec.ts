import { Test, TestingModule } from '@nestjs/testing';
import { BotsModule } from '../bots/bots.module';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';

describe('Streaming Controller', () => {
  let controller: StreamingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamingController],
      imports: [BotsModule],
      providers: [StreamingService],
    }).compile();

    controller = module.get<StreamingController>(StreamingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
