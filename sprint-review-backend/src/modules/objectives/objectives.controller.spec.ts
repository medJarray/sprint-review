import { Test, TestingModule } from '@nestjs/testing';
import { ObjectivesController } from './objectives.controller';
import { ObjectivesService } from './objectives.service';

const mockObjective = {
  sprintId: 'sprint-1',
  items: [{ text: 'Deliver feature X', achieved: true }],
};

describe('ObjectivesController', () => {
  let controller: ObjectivesController;
  let service: ObjectivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectivesController],
      providers: [
        {
          provide: ObjectivesService,
          useValue: {
            createOrReplace: jest.fn().mockResolvedValue(mockObjective),
            findBySprint: jest.fn().mockResolvedValue(mockObjective),
            update: jest.fn().mockResolvedValue(mockObjective),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<ObjectivesController>(ObjectivesController);
    service = module.get<ObjectivesService>(ObjectivesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create objectives', async () => {
    const result = await controller.createOrReplace(mockObjective as any);
    expect(result).toEqual(mockObjective);
  });

  it('should find objectives by sprint', async () => {
    const result = await controller.findBySprint('sprint-1');
    expect(result).toEqual(mockObjective);
    expect(service.findBySprint).toHaveBeenCalledWith('sprint-1');
  });

  it('should update objectives', async () => {
    const result = await controller.update('sprint-1', mockObjective as any);
    expect(result).toEqual(mockObjective);
  });

  it('should delete objectives', async () => {
    const result = await controller.remove('sprint-1');
    expect(result).toBeUndefined();
  });
});
