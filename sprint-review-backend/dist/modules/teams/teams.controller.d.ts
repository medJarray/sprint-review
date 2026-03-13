import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    create(dto: CreateTeamDto): Promise<import("./schemas/team.schema").Team>;
    findAll(sprintId: string): Promise<import("./schemas/team.schema").Team[]>;
    findOne(sprintId: string, teamId: string): Promise<import("./schemas/team.schema").Team>;
    update(sprintId: string, teamId: string, dto: UpdateTeamDto): Promise<import("./schemas/team.schema").Team>;
    remove(sprintId: string, teamId: string): Promise<void>;
}
