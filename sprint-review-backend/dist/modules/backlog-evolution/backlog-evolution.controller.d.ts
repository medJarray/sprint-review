import { BacklogEvolutionService } from './backlog-evolution.service';
import { CreateBacklogEvolutionDto, UpdateBacklogEvolutionDto } from './dto/backlog-evolution.dto';
export declare class BacklogEvolutionController {
    private readonly service;
    constructor(service: BacklogEvolutionService);
    createOrReplace(dto: CreateBacklogEvolutionDto): Promise<import("./schemas/backlog-evolution.schema").BacklogEvolution>;
    findBySprint(sprintId: string): Promise<import("./schemas/backlog-evolution.schema").BacklogEvolution>;
    update(sprintId: string, dto: UpdateBacklogEvolutionDto): Promise<import("./schemas/backlog-evolution.schema").BacklogEvolution>;
    remove(sprintId: string): Promise<void>;
}
