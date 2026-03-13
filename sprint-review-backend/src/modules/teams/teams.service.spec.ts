import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './schemas/team.schema';

const mockTeam = {
  sprintId: 'sprint-1',
  teamId: 'team-1',
  name: 'Team Alpha',
};

describe('TeamsService', () => {
  let service: TeamsService;
  let model: any;

  beforeEach(async () => {
    model = {
      create: jest.fn().mockResolvedValue(mockTeam),
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockTeam]),
      }),
      findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTeam),
      }),
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTeam),
      }),
      deleteOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      }),
      deleteMany: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 2 }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        { provide: getModelToken(Team.name), useValue: model },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a team', async () => {
      const result = await service.create(mockTeam as any);
      expect(result).toEqual(mockTeam);
    });
  });

  describe('findAllBySprint', () => {
    it('should return teams for a sprint', async () => {
      const result = await service.findAllBySprint('sprint-1');
      expect(result).toEqual([mockTeam]);
      expect(model.find).toHaveBeenCalledWith({ sprintId: 'sprint-1' });
    });
  });

  describe('findOne', () => {
    it('should return a team', async () => {
      const result = await service.findOne('sprint-1', 'team-1');
      expect(result).toEqual(mockTeam);
    });

    it('should throw NotFoundException if not found', async () => {
      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.findOne('sprint-1', 'no-team')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a team', async () => {
      const result = await service.update('sprint-1', 'team-1', { name: 'Updated' } as any);
      expect(result).toEqual(mockTeam);
    });

    it('should throw NotFoundException if not found', async () => {
      model.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.update('sprint-1', 'no-team', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a team', async () => {
      await expect(service.remove('sprint-1', 'team-1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if not found', async () => {
      model.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });
      await expect(service.remove('sprint-1', 'no-team')).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeAllBySprint', () => {
    it('should remove all teams for a sprint', async () => {
      await expect(service.removeAllBySprint('sprint-1')).resolves.toBeUndefined();
      expect(model.deleteMany).toHaveBeenCalledWith({ sprintId: 'sprint-1' });
    });
  });
});
