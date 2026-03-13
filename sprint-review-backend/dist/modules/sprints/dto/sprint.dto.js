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
exports.UpdateSprintDto = exports.CreateSprintDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSprintDto {
}
exports.CreateSprintDto = CreateSprintDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identifiant unique du sprint (généré côté frontend)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSprintDto.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du sprint' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSprintDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Numéro du sprint' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSprintDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Objectif principal' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSprintDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date de début (ex: 2026-01-12)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSprintDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date de fin' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSprintDto.prototype, "endDate", void 0);
class UpdateSprintDto extends (0, swagger_1.PartialType)(CreateSprintDto) {
}
exports.UpdateSprintDto = UpdateSprintDto;
//# sourceMappingURL=sprint.dto.js.map