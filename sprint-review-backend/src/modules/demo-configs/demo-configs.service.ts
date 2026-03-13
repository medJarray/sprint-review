import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DemoConfig } from './schemas/demo-config.schema';
import { CreateDemoConfigDto, UpdateDemoConfigDto } from './dto/demo-config.dto';

@Injectable()
export class DemoConfigsService {
  constructor(@InjectModel(DemoConfig.name) private readonly model: Model<DemoConfig>) {}

  async createOrReplace(dto: CreateDemoConfigDto): Promise<DemoConfig> {
    return this.model.findOneAndUpdate(
      { sprintId: dto.sprintId },
      { $set: dto },
      { new: true, upsert: true },
    ).exec() as Promise<DemoConfig>;
  }

  async findBySprint(sprintId: string): Promise<DemoConfig> {
    const doc = await this.model.findOne({ sprintId }).exec();
    if (!doc) throw new NotFoundException(`Config démo introuvable pour le sprint "${sprintId}"`);
    return doc;
  }

  async update(sprintId: string, dto: UpdateDemoConfigDto): Promise<DemoConfig> {
    const updated = await this.model
      .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
      .exec();
    return updated as DemoConfig;
  }

  async remove(sprintId: string): Promise<void> {
    const result = await this.model.deleteOne({ sprintId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Config démo introuvable pour "${sprintId}"`);
  }
}
