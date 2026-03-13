import { PagesService } from './pages.service';
import { CreatePageDto, UpdatePageDto } from './dto/page.dto';
export declare class PagesController {
    private readonly service;
    constructor(service: PagesService);
    create(dto: CreatePageDto): Promise<import("./schemas/page.schema").Page>;
    replaceAll(sprintId: string, body: {
        pages: CreatePageDto[];
    }): Promise<import("./schemas/page.schema").Page[]>;
    findAll(sprintId: string): Promise<import("./schemas/page.schema").Page[]>;
    findOne(sprintId: string, pageId: string): Promise<import("./schemas/page.schema").Page>;
    update(sprintId: string, pageId: string, dto: UpdatePageDto): Promise<import("./schemas/page.schema").Page>;
    remove(sprintId: string, pageId: string): Promise<void>;
}
