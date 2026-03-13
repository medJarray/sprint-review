import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Realization } from './schemas/realization.schema';
import { CreateRealizationDto, UpdateRealizationDto } from './dto/realization.dto';

@Injectable()
export class RealizationsService {
  constructor(@InjectModel(Realization.name) private readonly model: Model<Realization>) {}

  async createOrReplace(dto: CreateRealizationDto): Promise<Realization> {
    return this.model.findOneAndUpdate(
      { sprintId: dto.sprintId },
      { $set: dto },
      { new: true, upsert: true },
    ).exec() as Promise<Realization>;
  }

  async findBySprint(sprintId: string): Promise<Realization> {
    const doc = await this.model.findOne({ sprintId }).exec();
    if (!doc) throw new NotFoundException(`Réalisations introuvables pour le sprint "${sprintId}"`);
    return doc;
  }

  async update(sprintId: string, dto: UpdateRealizationDto): Promise<Realization> {
    const updated = await this.model
      .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
      .exec();
    return updated as Realization;
  }

  async remove(sprintId: string): Promise<void> {
    const result = await this.model.deleteOne({ sprintId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Réalisations introuvables pour "${sprintId}"`);
  }
}
