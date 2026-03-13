import { StylesService } from './styles.service';
import { CreateStyleDto, UpdateStyleDto } from './dto/style.dto';
export declare class StylesController {
    private readonly service;
    constructor(service: StylesService);
    createOrReplace(dto: CreateStyleDto): Promise<import("./schemas/style.schema").Style>;
    findBySprint(sprintId: string): Promise<import("./schemas/style.schema").Style>;
    update(sprintId: string, dto: UpdateStyleDto): Promise<import("./schemas/style.schema").Style>;
    remove(sprintId: string): Promise<void>;
}
