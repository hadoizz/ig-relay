import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../config/config.module';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';

describe('Bots Controller', () => {
  let controller: BotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotsService],
      controllers: [BotsController],
      imports: [ConfigModule],
      exports: [BotsService],
    }).compile();

    controller = module.get<BotsController>(BotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
