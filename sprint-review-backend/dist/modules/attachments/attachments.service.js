"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AttachmentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attachment_schema_1 = require("./schemas/attachment.schema");
const minio_service_1 = require("../minio/minio.service");
const uuid_1 = require("uuid");
const path = require("path");
let AttachmentsService = AttachmentsService_1 = class AttachmentsService {
    constructor(attachmentModel, minioService) {
        this.attachmentModel = attachmentModel;
        this.minioService = minioService;
        this.logger = new common_1.Logger(AttachmentsService_1.name);
    }
    async upload(file, dto) {
        const ext = path.extname(file.originalname);
        const uniqueName = `${(0, uuid_1.v4)()}${ext}`;
        const objectKey = `${dto.sprintId}/${dto.category || 'general'}/${uniqueName}`;
        await this.minioService.uploadFile(objectKey, file.buffer, file.size, file.mimetype);
        const attachment = new this.attachmentModel({
            sprintId: dto.sprintId,
            originalName: file.originalname,
            fileName: uniqueName,
            mimeType: file.mimetype,
            size: file.size,
            objectKey,
            bucket: this.minioService.getBucketName(),
            category: dto.category || 'general',
            description: dto.description,
            uploadedBy: dto.uploadedBy,
        });
        const saved = await attachment.save();
        this.logger.log(`📎 Pièce jointe "${file.originalname}" enregistrée (sprint: ${dto.sprintId})`);
        return saved;
    }
    async findBySprintId(sprintId, category) {
        const filter = { sprintId };
        if (category)
            filter.category = category;
        const attachments = await this.attachmentModel
            .find(filter)
            .sort({ createdAt: -1 })
            .lean()
            .exec();
        return Promise.all(attachments.map(async (att) => ({
            ...att,
            downloadUrl: await this.minioService.getPresignedUrl(att.objectKey, 3600),
        })));
    }
    async findById(id) {
        const attachment = await this.attachmentModel.findById(id).lean().exec();
        if (!attachment) {
            throw new common_1.NotFoundException(`Pièce jointe "${id}" introuvable`);
        }
        return {
            ...attachment,
            downloadUrl: await this.minioService.getPresignedUrl(attachment.objectKey, 3600),
        };
    }
    async download(id) {
        const attachment = await this.attachmentModel.findById(id).exec();
        if (!attachment) {
            throw new common_1.NotFoundException(`Pièce jointe "${id}" introuvable`);
        }
        const stream = await this.minioService.downloadFile(attachment.objectKey);
        return { stream, attachment };
    }
    async delete(id) {
        const attachment = await this.attachmentModel.findById(id).exec();
        if (!attachment) {
            throw new common_1.NotFoundException(`Pièce jointe "${id}" introuvable`);
        }
        await this.minioService.deleteFile(attachment.objectKey);
        await this.attachmentModel.findByIdAndDelete(id).exec();
        this.logger.log(`🗑️ Pièce jointe "${attachment.originalName}" supprimée`);
        return { deleted: true, originalName: attachment.originalName };
    }
    async deleteBySprintId(sprintId) {
        const attachments = await this.attachmentModel.find({ sprintId }).exec();
        await Promise.all(attachments.map((att) => this.minioService.deleteFile(att.objectKey)));
        const result = await this.attachmentModel.deleteMany({ sprintId }).exec();
        this.logger.log(`🗑️ ${result.deletedCount} pièce(s) jointe(s) supprimée(s) pour le sprint ${sprintId}`);
        return { deletedCount: result.deletedCount };
    }
};
exports.AttachmentsService = AttachmentsService;
exports.AttachmentsService = AttachmentsService = AttachmentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attachment_schema_1.Attachment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        minio_service_1.MinioService])
], AttachmentsService);
//# sourceMappingURL=attachments.service.js.map