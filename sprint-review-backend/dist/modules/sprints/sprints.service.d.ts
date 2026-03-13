import { Model } from 'mongoose';
import { Sprint } from './schemas/sprint.schema';
import { CreateSprintDto, UpdateSprintDto } from './dto/sprint.dto';
export declare class SprintsService {
    private readonly sprintModel;
    constructor(sprintModel: Model<Sprint>);
    create(dto: CreateSprintDto): Promise<Sprint>;
    findAll(): Promise<Sprint[]>;
    findBySprintId(sprintId: string): Promise<Sprint>;
    update(sprintId: string, dto: UpdateSprintDto): Promise<Sprint>;
    remove(sprintId: string): Promise<void>;
}
