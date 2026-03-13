import { Model } from 'mongoose';
import { DemoConfig } from './schemas/demo-config.schema';
import { CreateDemoConfigDto, UpdateDemoConfigDto } from './dto/demo-config.dto';
export declare class DemoConfigsService {
    private readonly model;
    constructor(model: Model<DemoConfig>);
    createOrReplace(dto: CreateDemoConfigDto): Promise<DemoConfig>;
    findBySprint(sprintId: string): Promise<DemoConfig>;
    update(sprintId: string, dto: UpdateDemoConfigDto): Promise<DemoConfig>;
    remove(sprintId: string): Promise<void>;
}
