import { Model } from 'mongoose';
import { Style } from './schemas/style.schema';
import { CreateStyleDto, UpdateStyleDto } from './dto/style.dto';
export declare class StylesService {
    private readonly model;
    constructor(model: Model<Style>);
    createOrReplace(dto: CreateStyleDto): Promise<Style>;
    findBySprint(sprintId: string): Promise<Style>;
    update(sprintId: string, dto: UpdateStyleDto): Promise<Style>;
    remove(sprintId: string): Promise<void>;
}
