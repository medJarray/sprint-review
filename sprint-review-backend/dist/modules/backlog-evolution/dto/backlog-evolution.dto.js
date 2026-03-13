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
exports.UpdateBacklogEvolutionDto = exports.CreateBacklogEvolutionDto = exports.PrioritizationMatrixDto = exports.MatrixItemDto = exports.BacklogChangeDto = exports.EpicProgressDto = exports.BacklogHealthDataDto = exports.DistributionItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class DistributionItemDto {
}
exports.DistributionItemDto = DistributionItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DistributionItemDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DistributionItemDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DistributionItemDto.prototype, "pct", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DistributionItemDto.prototype, "color", void 0);
class BacklogHealthDataDto {
}
exports.BacklogHealthDataDto = BacklogHealthDataDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BacklogHealthDataDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BacklogHealthDataDto.prototype, "readyPercent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BacklogHealthDataDto.prototype, "avgAge", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [DistributionItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DistributionItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BacklogHealthDataDto.prototype, "distribution", void 0);
class EpicProgressDto {
}
exports.EpicProgressDto = EpicProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "epicId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EpicProgressDto.prototype, "pct", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EpicProgressDto.prototype, "done", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EpicProgressDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EpicProgressDto.prototype, "targetSprint", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "bgColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "borderColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "badgeBg", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "badgeText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "barColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "targetColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EpicProgressDto.prototype, "pctColor", void 0);
class BacklogChangeDto {
}
exports.BacklogChangeDto = BacklogChangeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BacklogChangeDto.prototype, "added", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BacklogChangeDto.prototype, "removed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BacklogChangeDto.prototype, "reprioritized", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], BacklogChangeDto.prototype, "reasons", void 0);
class MatrixItemDto {
}
exports.MatrixItemDto = MatrixItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MatrixItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MatrixItemDto.prototype, "storyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MatrixItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MatrixItemDto.prototype, "points", void 0);
class PrioritizationMatrixDto {
}
exports.PrioritizationMatrixDto = PrioritizationMatrixDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [MatrixItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MatrixItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PrioritizationMatrixDto.prototype, "quickWins", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [MatrixItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MatrixItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PrioritizationMatrixDto.prototype, "majorProjects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [MatrixItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MatrixItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PrioritizationMatrixDto.prototype, "fillIns", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [MatrixItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MatrixItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PrioritizationMatrixDto.prototype, "timeSinks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PrioritizationMatrixDto.prototype, "insights", void 0);
class CreateBacklogEvolutionDto {
}
exports.CreateBacklogEvolutionDto = CreateBacklogEvolutionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBacklogEvolutionDto.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: BacklogHealthDataDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BacklogHealthDataDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", BacklogHealthDataDto)
], CreateBacklogEvolutionDto.prototype, "backlogHealth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [EpicProgressDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EpicProgressDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateBacklogEvolutionDto.prototype, "epicsProgress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: BacklogChangeDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BacklogChangeDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", BacklogChangeDto)
], CreateBacklogEvolutionDto.prototype, "backlogChanges", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: PrioritizationMatrixDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PrioritizationMatrixDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PrioritizationMatrixDto)
], CreateBacklogEvolutionDto.prototype, "prioritizationMatrix", void 0);
class UpdateBacklogEvolutionDto extends (0, swagger_1.PartialType)(CreateBacklogEvolutionDto) {
}
exports.UpdateBacklogEvolutionDto = UpdateBacklogEvolutionDto;
//# sourceMappingURL=backlog-evolution.dto.js.map