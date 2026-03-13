import { Response } from 'express';
import { AttachmentsService } from './attachments.service';
import { UploadAttachmentDto, AttachmentCategory } from './dto/attachment.dto';
export declare class AttachmentsController {
    private readonly attachmentsService;
    constructor(attachmentsService: AttachmentsService);
    upload(file: Express.Multer.File, dto: UploadAttachmentDto): Promise<import("./schemas/attachment.schema").AttachmentDocument>;
    findBySprintId(sprintId: string, category?: AttachmentCategory): Promise<any[]>;
    findById(id: string): Promise<any>;
    download(id: string, res: Response): Promise<void>;
    delete(id: string): Promise<{
        deleted: boolean;
        originalName: string;
    }>;
    deleteBySprintId(sprintId: string): Promise<{
        deletedCount: number;
    }>;
}
