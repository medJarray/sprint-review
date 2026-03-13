import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Backlog } from './schemas/backlog.schema';
import { CreateBacklogDto, UpdateBacklogDto } from './dto/backlog.dto';

@Injectable()
export class BacklogService {
  constructor(@InjectModel(Backlog.name) private readonly model: Model<Backlog>) {}

  async createOrReplace(dto: CreateBacklogDto): Promise<Backlog> {
    return this.model.findOneAndUpdate(
      { sprintId: dto.sprintId },
      { $set: dto },
      { new: true, upsert: true },
    ).exec() as Promise<Backlog>;
  }

  async findBySprint(sprintId: string): Promise<Backlog> {
    const doc = await this.model.findOne({ sprintId }).exec();
    if (!doc) throw new NotFoundException(`Backlog introuvable pour le sprint "${sprintId}"`);
    return doc;
  }

  async update(sprintId: string, dto: UpdateBacklogDto): Promise<Backlog> {
    const updated = await this.model
      .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
      .exec();
    return updated as Backlog;
  }

  async remove(sprintId: string): Promise<void> {
    const result = await this.model.deleteOne({ sprintId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Backlog introuvable pour "${sprintId}"`);
  }
}
