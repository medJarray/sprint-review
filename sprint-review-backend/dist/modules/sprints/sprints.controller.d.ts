import { SprintsService } from './sprints.service';
import { CreateSprintDto, UpdateSprintDto } from './dto/sprint.dto';
export declare class SprintsController {
    private readonly sprintsService;
    constructor(sprintsService: SprintsService);
    create(dto: CreateSprintDto): Promise<import("./schemas/sprint.schema").Sprint>;
    findAll(): Promise<import("./schemas/sprint.schema").Sprint[]>;
    findOne(sprintId: string): Promise<import("./schemas/sprint.schema").Sprint>;
    update(sprintId: string, dto: UpdateSprintDto): Promise<import("./schemas/sprint.schema").Sprint>;
    remove(sprintId: string): Promise<void>;
}
