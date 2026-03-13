import { Model } from 'mongoose';
import { BacklogEvolution } from './schemas/backlog-evolution.schema';
import { CreateBacklogEvolutionDto, UpdateBacklogEvolutionDto } from './dto/backlog-evolution.dto';
export declare class BacklogEvolutionService {
    private readonly model;
    constructor(model: Model<BacklogEvolution>);
    createOrReplace(dto: CreateBacklogEvolutionDto): Promise<BacklogEvolution>;
    findBySprint(sprintId: string): Promise<BacklogEvolution>;
    update(sprintId: string, dto: UpdateBacklogEvolutionDto): Promise<BacklogEvolution>;
    remove(sprintId: string): Promise<void>;
}
