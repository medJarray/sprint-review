import { Model } from 'mongoose';
import { Page } from './schemas/page.schema';
import { CreatePageDto, UpdatePageDto } from './dto/page.dto';
export declare class PagesService {
    private readonly model;
    constructor(model: Model<Page>);
    create(dto: CreatePageDto): Promise<Page>;
    findAllBySprint(sprintId: string): Promise<Page[]>;
    findOne(sprintId: string, pageId: string): Promise<Page>;
    update(sprintId: string, pageId: string, dto: UpdatePageDto): Promise<Page>;
    remove(sprintId: string, pageId: string): Promise<void>;
    removeAllBySprint(sprintId: string): Promise<void>;
    replaceAllBySprint(sprintId: string, pages: CreatePageDto[]): Promise<Page[]>;
}
