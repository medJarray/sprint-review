import { BacklogService } from './backlog.service';
import { CreateBacklogDto, UpdateBacklogDto } from './dto/backlog.dto';
export declare class BacklogController {
    private readonly service;
    constructor(service: BacklogService);
    createOrReplace(dto: CreateBacklogDto): Promise<import("./schemas/backlog.schema").Backlog>;
    findBySprint(sprintId: string): Promise<import("./schemas/backlog.schema").Backlog>;
    update(sprintId: string, dto: UpdateBacklogDto): Promise<import("./schemas/backlog.schema").Backlog>;
    remove(sprintId: string): Promise<void>;
}
