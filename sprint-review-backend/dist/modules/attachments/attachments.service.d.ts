import { Model } from 'mongoose';
import { AttachmentDocument } from './schemas/attachment.schema';
import { MinioService } from '../minio/minio.service';
import { UploadAttachmentDto } from './dto/attachment.dto';
import { Readable } from 'stream';
export declare class AttachmentsService {
    private readonly attachmentModel;
    private readonly minioService;
    private readonly logger;
    constructor(attachmentModel: Model<AttachmentDocument>, minioService: MinioService);
    upload(file: Express.Multer.File, dto: UploadAttachmentDto): Promise<AttachmentDocument>;
    findBySprintId(sprintId: string, category?: string): Promise<any[]>;
    findById(id: string): Promise<any>;
    download(id: string): Promise<{
        stream: Readable;
        attachment: AttachmentDocument;
    }>;
    delete(id: string): Promise<{
        deleted: boolean;
        originalName: string;
    }>;
    deleteBySprintId(sprintId: string): Promise<{
        deletedCount: number;
    }>;
}
