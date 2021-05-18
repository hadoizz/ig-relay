import { Test, TestingModule } from '@nestjs/testing';
import { BotsModule } from '../bots/bots.module';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';

describe('StreamingService', () => {
  let service: StreamingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamingController],
      imports: [BotsModule],
      providers: [StreamingService],
    }).compile();

    service = module.get<StreamingService>(StreamingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
