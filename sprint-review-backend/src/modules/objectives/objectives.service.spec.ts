import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { ObjectivesService } from './objectives.service';
import { Objective } from './schemas/objective.schema';

const mockObjective = {
  sprintId: 'sprint-1',
  items: [
    { text: 'Deliver feature X', achieved: true },
    { text: 'Fix bug Y', achieved: false },
  ],
};

describe('ObjectivesService', () => {
  let service: ObjectivesService;
  let model: any;

  beforeEach(async () => {
    model = {
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockObjective),
      }),
      findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockObjective),
      }),
      deleteOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectivesService,
        { provide: getModelToken(Objective.name), useValue: model },
      ],
    }).compile();

    service = module.get<ObjectivesService>(ObjectivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrReplace', () => {
    it('should upsert objectives', async () => {
      const result = await service.createOrReplace(mockObjective as any);
      expect(result).toEqual(mockObjective);
      expect(model.findOneAndUpdate).toHaveBeenCalled();
    });
  });

  describe('findBySprint', () => {
    it('should return objectives for a sprint', async () => {
      const result = await service.findBySprint('sprint-1');
      expect(result).toEqual(mockObjective);
    });

    it('should throw NotFoundException if not found', async () => {
      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.findBySprint('not-found')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update objectives', async () => {
      const result = await service.update('sprint-1', mockObjective as any);
      expect(result).toEqual(mockObjective);
    });
  });

  describe('remove', () => {
    it('should remove objectives', async () => {
      await expect(service.remove('sprint-1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if not found', async () => {
      model.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });
      await expect(service.remove('not-found')).rejects.toThrow(NotFoundException);
    });
  });
});
