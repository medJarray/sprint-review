import { ObjectivesService } from './objectives.service';
import { CreateObjectiveDto, UpdateObjectiveDto } from './dto/objective.dto';
export declare class ObjectivesController {
    private readonly service;
    constructor(service: ObjectivesService);
    createOrReplace(dto: CreateObjectiveDto): Promise<import("./schemas/objective.schema").Objective>;
    findBySprint(sprintId: string): Promise<import("./schemas/objective.schema").Objective>;
    update(sprintId: string, dto: UpdateObjectiveDto): Promise<import("./schemas/objective.schema").Objective>;
    remove(sprintId: string): Promise<void>;
}
