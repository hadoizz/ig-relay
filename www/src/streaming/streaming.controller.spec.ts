import { Test, TestingModule } from '@nestjs/testing';
import { StreamingController } from './streaming.controller';

describe('Streaming Controller', () => {
  let controller: StreamingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamingController],
    }).compile();

    controller = module.get<StreamingController>(StreamingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
