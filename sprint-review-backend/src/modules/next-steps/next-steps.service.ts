import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NextStep } from './schemas/next-step.schema';
import { CreateNextStepDto, UpdateNextStepDto } from './dto/next-step.dto';

@Injectable()
export class NextStepsService {
  constructor(@InjectModel(NextStep.name) private readonly model: Model<NextStep>) {}

  async createOrReplace(dto: CreateNextStepDto): Promise<NextStep> {
    return this.model.findOneAndUpdate(
      { sprintId: dto.sprintId },
      { $set: dto },
      { new: true, upsert: true },
    ).exec() as Promise<NextStep>;
  }

  async findBySprint(sprintId: string): Promise<NextStep> {
    const doc = await this.model.findOne({ sprintId }).exec();
    if (!doc) throw new NotFoundException(`Next Steps introuvables pour le sprint "${sprintId}"`);
    return doc;
  }

  async update(sprintId: string, dto: UpdateNextStepDto): Promise<NextStep> {
    const updated = await this.model
      .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
      .exec();
    return updated as NextStep;
  }

  async remove(sprintId: string): Promise<void> {
    const result = await this.model.deleteOne({ sprintId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Next Steps introuvables pour "${sprintId}"`);
  }
}
