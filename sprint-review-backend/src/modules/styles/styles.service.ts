import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Style } from './schemas/style.schema';
import { CreateStyleDto, UpdateStyleDto } from './dto/style.dto';

@Injectable()
export class StylesService {
  constructor(@InjectModel(Style.name) private readonly model: Model<Style>) {}

  async createOrReplace(dto: CreateStyleDto): Promise<Style> {
    return this.model.findOneAndUpdate(
      { sprintId: dto.sprintId },
      { $set: dto },
      { new: true, upsert: true },
    ).exec() as Promise<Style>;
  }

  async findBySprint(sprintId: string): Promise<Style> {
    const doc = await this.model.findOne({ sprintId }).exec();
    if (!doc) throw new NotFoundException(`Styles introuvables pour le sprint "${sprintId}"`);
    return doc;
  }

  async update(sprintId: string, dto: UpdateStyleDto): Promise<Style> {
    const updated = await this.model
      .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
      .exec();
    return updated as Style;
  }

  async remove(sprintId: string): Promise<void> {
    const result = await this.model.deleteOne({ sprintId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Styles introuvables pour "${sprintId}"`);
  }
}
