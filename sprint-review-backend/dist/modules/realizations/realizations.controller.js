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
exports.RealizationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const realizations_service_1 = require("./realizations.service");
const realization_dto_1 = require("./dto/realization.dto");
let RealizationsController = class RealizationsController {
    constructor(service) {
        this.service = service;
    }
    createOrReplace(dto) {
        return this.service.createOrReplace(dto);
    }
    findBySprint(sprintId) {
        return this.service.findBySprint(sprintId);
    }
    update(sprintId, dto) {
        return this.service.update(sprintId, dto);
    }
    remove(sprintId) {
        return this.service.remove(sprintId);
    }
};
exports.RealizationsController = RealizationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer/remplacer les réalisations d\'un sprint (upsert)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [realization_dto_1.CreateRealizationDto]),
    __metadata("design:returntype", void 0)
], RealizationsController.prototype, "createOrReplace", null);
__decorate([
    (0, common_1.Get)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les réalisations d\'un sprint' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RealizationsController.prototype, "findBySprint", null);
__decorate([
    (0, common_1.Put)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour les réalisations' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, realization_dto_1.UpdateRealizationDto]),
    __metadata("design:returntype", void 0)
], RealizationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer les réalisations d\'un sprint' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RealizationsController.prototype, "remove", null);
exports.RealizationsController = RealizationsController = __decorate([
    (0, swagger_1.ApiTags)('realizations'),
    (0, common_1.Controller)('realizations'),
    __metadata("design:paramtypes", [realizations_service_1.RealizationsService])
], RealizationsController);
//# sourceMappingURL=realizations.controller.js.map