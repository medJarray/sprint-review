import { Test, TestingModule } from '@nestjs/testing';
import { SprintsController } from './sprints.controller';
import { SprintsService } from './sprints.service';

const mockSprint = {
  sprintId: 'sprint-1',
  name: 'Sprint 1',
  number: 1,
  goal: 'Deliver MVP',
};

describe('SprintsController', () => {
  let controller: SprintsController;
  let service: SprintsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprintsController],
      providers: [
        {
          provide: SprintsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockSprint),
            findAll: jest.fn().mockResolvedValue([mockSprint]),
            findBySprintId: jest.fn().mockResolvedValue(mockSprint),
            update: jest.fn().mockResolvedValue(mockSprint),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<SprintsController>(SprintsController);
    service = module.get<SprintsService>(SprintsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a sprint', async () => {
    const result = await controller.create(mockSprint as any);
    expect(result).toEqual(mockSprint);
    expect(service.create).toHaveBeenCalledWith(mockSprint);
  });

  it('should find all sprints', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockSprint]);
  });

  it('should find one sprint', async () => {
    const result = await controller.findOne('sprint-1');
    expect(result).toEqual(mockSprint);
    expect(service.findBySprintId).toHaveBeenCalledWith('sprint-1');
  });

  it('should update a sprint', async () => {
    const result = await controller.update('sprint-1', { name: 'Updated' } as any);
    expect(result).toEqual(mockSprint);
  });

  it('should delete a sprint', async () => {
    const result = await controller.remove('sprint-1');
    expect(result).toBeUndefined();
  });
});
