import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

const mockTeam = {
  sprintId: 'sprint-1',
  teamId: 'team-1',
  name: 'Team Alpha',
};

describe('TeamsController', () => {
  let controller: TeamsController;
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        {
          provide: TeamsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockTeam),
            findAllBySprint: jest.fn().mockResolvedValue([mockTeam]),
            findOne: jest.fn().mockResolvedValue(mockTeam),
            update: jest.fn().mockResolvedValue(mockTeam),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a team', async () => {
    const result = await controller.create(mockTeam as any);
    expect(result).toEqual(mockTeam);
  });

  it('should find all teams by sprint', async () => {
    const result = await controller.findAll('sprint-1');
    expect(result).toEqual([mockTeam]);
    expect(service.findAllBySprint).toHaveBeenCalledWith('sprint-1');
  });

  it('should find one team', async () => {
    const result = await controller.findOne('sprint-1', 'team-1');
    expect(result).toEqual(mockTeam);
  });

  it('should update a team', async () => {
    const result = await controller.update('sprint-1', 'team-1', { name: 'Updated' } as any);
    expect(result).toEqual(mockTeam);
  });

  it('should delete a team', async () => {
    const result = await controller.remove('sprint-1', 'team-1');
    expect(result).toBeUndefined();
  });
});
