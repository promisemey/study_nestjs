import { Test, TestingModule } from '@nestjs/testing';
import { Nest1Controller } from './nest_1.controller';

describe('Nest1Controller', () => {
  let controller: Nest1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Nest1Controller],
    }).compile();

    controller = module.get<Nest1Controller>(Nest1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
