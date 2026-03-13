import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Objective } from './schemas/objective.schema';
import { CreateObjectiveDto, UpdateObjectiveDto } from './dto/objective.dto';

@Injectable()
export class ObjectivesService {
  constructor(@InjectModel(Objective.name) private readonly model: Model<Objective>) {}

  async createOrReplace(dto: CreateObjectiveDto): Promise<Objective> {
    return this.model.findOneAndUpdate(
      { sprintId: dto.sprintId },
      { $set: dto },
      { new: true, upsert: true },
    ).exec() as Promise<Objective>;
  }

  async findBySprint(sprintId: string): Promise<Objective> {
    const doc = await this.model.findOne({ sprintId }).exec();
    if (!doc) throw new NotFoundException(`Objectifs introuvables pour le sprint "${sprintId}"`);
    return doc;
  }

  async update(sprintId: string, dto: UpdateObjectiveDto): Promise<Objective> {
    const updated = await this.model
      .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
      .exec();
    return updated as Objective;
  }

  async remove(sprintId: string): Promise<void> {
    const result = await this.model.deleteOne({ sprintId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Objectifs introuvables pour "${sprintId}"`);
  }
}
