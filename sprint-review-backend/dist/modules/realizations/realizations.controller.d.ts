import { RealizationsService } from './realizations.service';
import { CreateRealizationDto, UpdateRealizationDto } from './dto/realization.dto';
export declare class RealizationsController {
    private readonly service;
    constructor(service: RealizationsService);
    createOrReplace(dto: CreateRealizationDto): Promise<import("./schemas/realization.schema").Realization>;
    findBySprint(sprintId: string): Promise<import("./schemas/realization.schema").Realization>;
    update(sprintId: string, dto: UpdateRealizationDto): Promise<import("./schemas/realization.schema").Realization>;
    remove(sprintId: string): Promise<void>;
}
