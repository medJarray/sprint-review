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
exports.UpdateMetricDto = exports.CreateMetricDto = exports.SprintMetricsBaseDto = exports.QualityGateDto = exports.InsightItemDto = exports.VelocityEntryDto = exports.KpiCardDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class KpiCardDto {
}
exports.KpiCardDto = KpiCardDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KpiCardDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KpiCardDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KpiCardDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KpiCardDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KpiCardDto.prototype, "badgeText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['up', 'down', 'stable', 'check', 'smile']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KpiCardDto.prototype, "badgeType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KpiCardDto.prototype, "subText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KpiCardDto.prototype, "borderColor", void 0);
class VelocityEntryDto {
}
exports.VelocityEntryDto = VelocityEntryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VelocityEntryDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VelocityEntryDto.prototype, "value", void 0);
class InsightItemDto {
}
exports.InsightItemDto = InsightItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsightItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsightItemDto.prototype, "text", void 0);
class QualityGateDto {
}
exports.QualityGateDto = QualityGateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QualityGateDto.prototype, "unitTests", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QualityGateDto.prototype, "sonarGrade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QualityGateDto.prototype, "e2eTests", void 0);
class SprintMetricsBaseDto {
}
exports.SprintMetricsBaseDto = SprintMetricsBaseDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SprintMetricsBaseDto.prototype, "plannedPoints", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SprintMetricsBaseDto.prototype, "completedPoints", void 0);
class CreateMetricDto {
}
exports.CreateMetricDto = CreateMetricDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMetricDto.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: SprintMetricsBaseDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SprintMetricsBaseDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", SprintMetricsBaseDto)
], CreateMetricDto.prototype, "sprintMetrics", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [KpiCardDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => KpiCardDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMetricDto.prototype, "kpiCards", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [Number] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMetricDto.prototype, "burndownIdeal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [Number] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMetricDto.prototype, "burndownReal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [VelocityEntryDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => VelocityEntryDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMetricDto.prototype, "velocityHistory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [InsightItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InsightItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMetricDto.prototype, "insightsGood", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [InsightItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InsightItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMetricDto.prototype, "insightsBad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: QualityGateDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => QualityGateDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", QualityGateDto)
], CreateMetricDto.prototype, "qualityGate", void 0);
class UpdateMetricDto extends (0, swagger_1.PartialType)(CreateMetricDto) {
}
exports.UpdateMetricDto = UpdateMetricDto;
//# sourceMappingURL=metric.dto.js.map