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
exports.UpdateObjectiveDto = exports.CreateObjectiveDto = exports.TextItemDto = exports.ObjectiveItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class ObjectiveItemDto {
}
exports.ObjectiveItemDto = ObjectiveItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObjectiveItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObjectiveItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ObjectiveItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ObjectiveItemDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ObjectiveItemDto.prototype, "scope", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ObjectiveItemDto.prototype, "epicLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ObjectiveItemDto.prototype, "borderColor", void 0);
class TextItemDto {
}
exports.TextItemDto = TextItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TextItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TextItemDto.prototype, "text", void 0);
class CreateObjectiveDto {
}
exports.CreateObjectiveDto = CreateObjectiveDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateObjectiveDto.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [ObjectiveItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ObjectiveItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateObjectiveDto.prototype, "objectives", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [TextItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TextItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateObjectiveDto.prototype, "successCriteria", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [TextItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TextItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateObjectiveDto.prototype, "constraints", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [TextItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TextItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateObjectiveDto.prototype, "dodItems", void 0);
class UpdateObjectiveDto extends (0, swagger_1.PartialType)(CreateObjectiveDto) {
}
exports.UpdateObjectiveDto = UpdateObjectiveDto;
//# sourceMappingURL=objective.dto.js.map