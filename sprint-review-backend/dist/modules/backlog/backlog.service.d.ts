import { Model } from 'mongoose';
import { Backlog } from './schemas/backlog.schema';
import { CreateBacklogDto, UpdateBacklogDto } from './dto/backlog.dto';
export declare class BacklogService {
    private readonly model;
    constructor(model: Model<Backlog>);
    createOrReplace(dto: CreateBacklogDto): Promise<Backlog>;
    findBySprint(sprintId: string): Promise<Backlog>;
    update(sprintId: string, dto: UpdateBacklogDto): Promise<Backlog>;
    remove(sprintId: string): Promise<void>;
}
