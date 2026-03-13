export declare enum AttachmentCategory {
    DEMO = "demo",
    METRICS = "metrics",
    BACKLOG = "backlog",
    REALIZATIONS = "realizations",
    GENERAL = "general"
}
export declare class UploadAttachmentDto {
    sprintId: string;
    category?: AttachmentCategory;
    description?: string;
    uploadedBy?: string;
}
export declare class AttachmentResponseDto {
    _id: string;
    sprintId: string;
    originalName: string;
    fileName: string;
    mimeType: string;
    size: number;
    objectKey: string;
    bucket: string;
    category?: string;
    description?: string;
    uploadedBy?: string;
    downloadUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
