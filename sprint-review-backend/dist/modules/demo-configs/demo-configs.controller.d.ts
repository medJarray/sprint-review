import { DemoConfigsService } from './demo-configs.service';
import { CreateDemoConfigDto, UpdateDemoConfigDto } from './dto/demo-config.dto';
export declare class DemoConfigsController {
    private readonly service;
    constructor(service: DemoConfigsService);
    createOrReplace(dto: CreateDemoConfigDto): Promise<import("./schemas/demo-config.schema").DemoConfig>;
    findBySprint(sprintId: string): Promise<import("./schemas/demo-config.schema").DemoConfig>;
    update(sprintId: string, dto: UpdateDemoConfigDto): Promise<import("./schemas/demo-config.schema").DemoConfig>;
    remove(sprintId: string): Promise<void>;
}
