import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { Sprint } from './schemas/sprint.schema';

const mockSprint = {
  sprintId: 'sprint-1',
  name: 'Sprint 1',
  number: 1,
  goal: 'Deliver MVP',
  startDate: '2026-01-01',
  endDate: '2026-01-14',
};

describe('SprintsService', () => {
  let service: SprintsService;
  let model: any;

  beforeEach(async () => {
    model = {
      create: jest.fn().mockResolvedValue(mockSprint),
      find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([mockSprint]),
        }),
      }),
      findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSprint),
      }),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSprint),
      }),
      deleteOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SprintsService,
        { provide: getModelToken(Sprint.name), useValue: model },
      ],
    }).compile();

    service = module.get<SprintsService>(SprintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a sprint', async () => {
      const result = await service.create(mockSprint as any);
      expect(result).toEqual(mockSprint);
      expect(model.create).toHaveBeenCalledWith(mockSprint);
    });
  });

  describe('findAll', () => {
    it('should return all sprints sorted by number desc', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockSprint]);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findBySprintId', () => {
    it('should return a sprint by sprintId', async () => {
      const result = await service.findBySprintId('sprint-1');
      expect(result).toEqual(mockSprint);
    });

    it('should throw NotFoundException if sprint not found', async () => {
      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.findBySprintId('not-found')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a sprint', async () => {
      const result = await service.update('sprint-1', { name: 'Updated' } as any);
      expect(result).toEqual(mockSprint);
    });
  });

  describe('remove', () => {
    it('should remove a sprint', async () => {
      await expect(service.remove('sprint-1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if sprint not found', async () => {
      model.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });
      await expect(service.remove('not-found')).rejects.toThrow(NotFoundException);
    });
  });
});
