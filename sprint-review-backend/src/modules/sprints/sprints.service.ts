import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sprint } from './schemas/sprint.schema';
import { CreateSprintDto, UpdateSprintDto } from './dto/sprint.dto';

@Injectable()
export class SprintsService {
  constructor(@InjectModel(Sprint.name) private readonly sprintModel: Model<Sprint>) {}

  async create(dto: CreateSprintDto): Promise<Sprint> {
    return this.sprintModel.create(dto);
  }

  async findAll(): Promise<Sprint[]> {
    return this.sprintModel.find().sort({ number: -1 }).exec();
  }

  async findBySprintId(sprintId: string): Promise<Sprint> {
    const sprint = await this.sprintModel.findOne({ sprintId }).exec();
    if (!sprint) throw new NotFoundException(`Sprint "${sprintId}" introuvable`);
    return sprint;
  }

  async update(sprintId: string, dto: UpdateSprintDto): Promise<Sprint> {
    const updated = await this.sprintModel
      .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
      .exec();
    return updated as Sprint;
  }

  async remove(sprintId: string): Promise<void> {
    const result = await this.sprintModel.deleteOne({ sprintId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Sprint "${sprintId}" introuvable`);
  }
}
