import { Model } from 'mongoose';
import { Team } from './schemas/team.schema';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
export declare class TeamsService {
    private readonly teamModel;
    constructor(teamModel: Model<Team>);
    create(dto: CreateTeamDto): Promise<Team>;
    findAllBySprint(sprintId: string): Promise<Team[]>;
    findOne(sprintId: string, teamId: string): Promise<Team>;
    update(sprintId: string, teamId: string, dto: UpdateTeamDto): Promise<Team>;
    remove(sprintId: string, teamId: string): Promise<void>;
    removeAllBySprint(sprintId: string): Promise<void>;
}
