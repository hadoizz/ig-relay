import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../config/config.module';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';

describe('BotsService', () => {
  let service: BotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotsService],
      controllers: [BotsController],
      imports: [ConfigModule],
      exports: [BotsService],
    }).compile();

    service = module.get<BotsService>(BotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
