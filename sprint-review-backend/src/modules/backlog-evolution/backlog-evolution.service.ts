import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BacklogEvolution } from './schemas/backlog-evolution.schema';
import { CreateBacklogEvolutionDto, UpdateBacklogEvolutionDto } from './dto/backlog-evolution.dto';

@Injectable()
export class BacklogEvolutionService {
  constructor(@InjectModel(BacklogEvolution.name) private readonly model: Model<BacklogEvolution>) {}

  async createOrReplace(dto: CreateBacklogEvolutionDto): Promise<BacklogEvolution> {
    return this.model.findOneAndUpdate(
      { sprintId: dto.sprintId },
      { $set: dto },
      { new: true, upsert: true },
    ).exec() as Promise<BacklogEvolution>;
  }

  async findBySprint(sprintId: string): Promise<BacklogEvolution> {
    const doc = await this.model.findOne({ sprintId }).exec();
    if (!doc) throw new NotFoundException(`Évolution backlog introuvable pour le sprint "${sprintId}"`);
    return doc;
  }

  async update(sprintId: string, dto: UpdateBacklogEvolutionDto): Promise<BacklogEvolution> {
    const updated = await this.model
      .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
      .exec();
    return updated as BacklogEvolution;
  }

  async remove(sprintId: string): Promise<void> {
    const result = await this.model.deleteOne({ sprintId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Évolution backlog introuvable pour "${sprintId}"`);
  }
}
