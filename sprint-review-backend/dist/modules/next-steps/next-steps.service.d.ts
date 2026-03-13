import { Model } from 'mongoose';
import { NextStep } from './schemas/next-step.schema';
import { CreateNextStepDto, UpdateNextStepDto } from './dto/next-step.dto';
export declare class NextStepsService {
    private readonly model;
    constructor(model: Model<NextStep>);
    createOrReplace(dto: CreateNextStepDto): Promise<NextStep>;
    findBySprint(sprintId: string): Promise<NextStep>;
    update(sprintId: string, dto: UpdateNextStepDto): Promise<NextStep>;
    remove(sprintId: string): Promise<void>;
}
