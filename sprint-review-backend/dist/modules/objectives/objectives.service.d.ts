import { Model } from 'mongoose';
import { Objective } from './schemas/objective.schema';
import { CreateObjectiveDto, UpdateObjectiveDto } from './dto/objective.dto';
export declare class ObjectivesService {
    private readonly model;
    constructor(model: Model<Objective>);
    createOrReplace(dto: CreateObjectiveDto): Promise<Objective>;
    findBySprint(sprintId: string): Promise<Objective>;
    update(sprintId: string, dto: UpdateObjectiveDto): Promise<Objective>;
    remove(sprintId: string): Promise<void>;
}
