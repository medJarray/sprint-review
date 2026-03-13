import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Metric } from './schemas/metric.schema';
import { CreateMetricDto, UpdateMetricDto } from './dto/metric.dto';

@Injectable()
export class MetricsService {
  constructor(@InjectModel(Metric.name) private readonly model: Model<Metric>) {}

  async createOrReplace(dto: CreateMetricDto): Promise<Metric> {
    return this.model.findOneAndUpdate(
      { sprintId: dto.sprintId },
      { $set: dto },
      { new: true, upsert: true },
    ).exec() as Promise<Metric>;
  }

  async findBySprint(sprintId: string): Promise<Metric> {
    const doc = await this.model.findOne({ sprintId }).exec();
    if (!doc) throw new NotFoundException(`Métriques introuvables pour le sprint "${sprintId}"`);
    return doc;
  }

  async update(sprintId: string, dto: UpdateMetricDto): Promise<Metric> {
    const updated = await this.model
      .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
      .exec();
    return updated as Metric;
  }

  async remove(sprintId: string): Promise<void> {
    const result = await this.model.deleteOne({ sprintId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Métriques introuvables pour "${sprintId}"`);
  }
}
