import { MetricsService } from './metrics.service';
import { CreateMetricDto, UpdateMetricDto } from './dto/metric.dto';
export declare class MetricsController {
    private readonly service;
    constructor(service: MetricsService);
    createOrReplace(dto: CreateMetricDto): Promise<import("./schemas/metric.schema").Metric>;
    findBySprint(sprintId: string): Promise<import("./schemas/metric.schema").Metric>;
    update(sprintId: string, dto: UpdateMetricDto): Promise<import("./schemas/metric.schema").Metric>;
    remove(sprintId: string): Promise<void>;
}
