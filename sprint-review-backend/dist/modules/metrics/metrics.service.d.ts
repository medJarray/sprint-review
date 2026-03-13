import { Model } from 'mongoose';
import { Metric } from './schemas/metric.schema';
import { CreateMetricDto, UpdateMetricDto } from './dto/metric.dto';
export declare class MetricsService {
    private readonly model;
    constructor(model: Model<Metric>);
    createOrReplace(dto: CreateMetricDto): Promise<Metric>;
    findBySprint(sprintId: string): Promise<Metric>;
    update(sprintId: string, dto: UpdateMetricDto): Promise<Metric>;
    remove(sprintId: string): Promise<void>;
}
