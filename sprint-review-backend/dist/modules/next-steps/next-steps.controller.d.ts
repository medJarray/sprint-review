import { NextStepsService } from './next-steps.service';
import { CreateNextStepDto, UpdateNextStepDto } from './dto/next-step.dto';
export declare class NextStepsController {
    private readonly service;
    constructor(service: NextStepsService);
    createOrReplace(dto: CreateNextStepDto): Promise<import("./schemas/next-step.schema").NextStep>;
    findBySprint(sprintId: string): Promise<import("./schemas/next-step.schema").NextStep>;
    update(sprintId: string, dto: UpdateNextStepDto): Promise<import("./schemas/next-step.schema").NextStep>;
    remove(sprintId: string): Promise<void>;
}
