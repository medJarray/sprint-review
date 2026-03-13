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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentResponseDto = exports.UploadAttachmentDto = exports.AttachmentCategory = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var AttachmentCategory;
(function (AttachmentCategory) {
    AttachmentCategory["DEMO"] = "demo";
    AttachmentCategory["METRICS"] = "metrics";
    AttachmentCategory["BACKLOG"] = "backlog";
    AttachmentCategory["REALIZATIONS"] = "realizations";
    AttachmentCategory["GENERAL"] = "general";
})(AttachmentCategory || (exports.AttachmentCategory = AttachmentCategory = {}));
class UploadAttachmentDto {
}
exports.UploadAttachmentDto = UploadAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identifiant du sprint', example: 'sprint-default' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadAttachmentDto.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Catégorie de la pièce jointe',
        enum: AttachmentCategory,
        example: 'general',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(AttachmentCategory),
    __metadata("design:type", String)
], UploadAttachmentDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description de la pièce jointe', example: 'Capture écran de la démo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadAttachmentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nom de l\'auteur de l\'upload', example: 'Jean Dupont' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadAttachmentDto.prototype, "uploadedBy", void 0);
class AttachmentResponseDto {
}
exports.AttachmentResponseDto = AttachmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "originalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AttachmentResponseDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "objectKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "bucket", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "uploadedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "downloadUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], AttachmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], AttachmentResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=attachment.dto.js.map