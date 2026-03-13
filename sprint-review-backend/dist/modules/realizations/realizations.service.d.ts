import { Model } from 'mongoose';
import { Realization } from './schemas/realization.schema';
import { CreateRealizationDto, UpdateRealizationDto } from './dto/realization.dto';
export declare class RealizationsService {
    private readonly model;
    constructor(model: Model<Realization>);
    createOrReplace(dto: CreateRealizationDto): Promise<Realization>;
    findBySprint(sprintId: string): Promise<Realization>;
    update(sprintId: string, dto: UpdateRealizationDto): Promise<Realization>;
    remove(sprintId: string): Promise<void>;
}
