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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const attachments_service_1 = require("./attachments.service");
const attachment_dto_1 = require("./dto/attachment.dto");
let AttachmentsController = class AttachmentsController {
    constructor(attachmentsService) {
        this.attachmentsService = attachmentsService;
    }
    async upload(file, dto) {
        return this.attachmentsService.upload(file, dto);
    }
    async findBySprintId(sprintId, category) {
        return this.attachmentsService.findBySprintId(sprintId, category);
    }
    async findById(id) {
        return this.attachmentsService.findById(id);
    }
    async download(id, res) {
        const { stream, attachment } = await this.attachmentsService.download(id);
        res.set({
            'Content-Type': attachment.mimeType,
            'Content-Disposition': `attachment; filename="${encodeURIComponent(attachment.originalName)}"`,
        });
        stream.pipe(res);
    }
    async delete(id) {
        return this.attachmentsService.delete(id);
    }
    async deleteBySprintId(sprintId) {
        return this.attachmentsService.deleteBySprintId(sprintId);
    }
};
exports.AttachmentsController = AttachmentsController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload une pièce jointe dans MinIO S3' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['file', 'sprintId'],
            properties: {
                file: { type: 'string', format: 'binary', description: 'Fichier à uploader' },
                sprintId: { type: 'string', example: 'sprint-default' },
                category: {
                    type: 'string',
                    enum: Object.values(attachment_dto_1.AttachmentCategory),
                    example: 'general',
                },
                description: { type: 'string', example: 'Capture écran de la démo' },
                uploadedBy: { type: 'string', example: 'Jean Dupont' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
        ],
    }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, attachment_dto_1.UploadAttachmentDto]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)('sprint/:sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Liste toutes les pièces jointes d\'un sprint' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId', example: 'sprint-default' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, enum: attachment_dto_1.AttachmentCategory }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "findBySprintId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupère les détails d\'une pièce jointe (avec URL pré-signée)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID MongoDB de la pièce jointe' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, swagger_1.ApiOperation)({ summary: 'Télécharge le fichier depuis MinIO' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID MongoDB de la pièce jointe' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "download", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprime une pièce jointe (MinIO + base)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID MongoDB de la pièce jointe' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('sprint/:sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprime toutes les pièces jointes d\'un sprint' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId', example: 'sprint-default' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttachmentsController.prototype, "deleteBySprintId", null);
exports.AttachmentsController = AttachmentsController = __decorate([
    (0, swagger_1.ApiTags)('attachments'),
    (0, common_1.Controller)('attachments'),
    __metadata("design:paramtypes", [attachments_service_1.AttachmentsService])
], AttachmentsController);
//# sourceMappingURL=attachments.controller.js.map