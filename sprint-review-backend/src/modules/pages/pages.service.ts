import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './schemas/page.schema';
import { CreatePageDto, UpdatePageDto } from './dto/page.dto';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private readonly model: Model<Page>) {}

  async create(dto: CreatePageDto): Promise<Page> {
    return this.model.create(dto);
  }

  async findAllBySprint(sprintId: string): Promise<Page[]> {
    return this.model.find({ sprintId }).sort({ order: 1 }).exec();
  }

  async findOne(sprintId: string, pageId: string): Promise<Page> {
    const doc = await this.model.findOne({ sprintId, pageId }).exec();
    if (!doc) throw new NotFoundException(`Page "${pageId}" introuvable pour le sprint "${sprintId}"`);
    return doc;
  }

  async update(sprintId: string, pageId: string, dto: UpdatePageDto): Promise<Page> {
    const updated = await this.model
      .findOneAndUpdate({ sprintId, pageId }, { $set: dto }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Page "${pageId}" introuvable`);
    return updated;
  }

  async remove(sprintId: string, pageId: string): Promise<void> {
    const result = await this.model.deleteOne({ sprintId, pageId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Page "${pageId}" introuvable`);
  }

  async removeAllBySprint(sprintId: string): Promise<void> {
    await this.model.deleteMany({ sprintId }).exec();
  }

  /** Remplacer toutes les pages d'un sprint en batch */
  async replaceAllBySprint(sprintId: string, pages: CreatePageDto[]): Promise<Page[]> {
    await this.model.deleteMany({ sprintId }).exec();
    const docs = pages.map((p) => ({ ...p, sprintId }));
    return this.model.insertMany(docs) as unknown as Page[];
  }
}
