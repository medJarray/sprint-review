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
exports.SprintsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sprints_service_1 = require("./sprints.service");
const sprint_dto_1 = require("./dto/sprint.dto");
let SprintsController = class SprintsController {
    constructor(sprintsService) {
        this.sprintsService = sprintsService;
    }
    create(dto) {
        return this.sprintsService.create(dto);
    }
    findAll() {
        return this.sprintsService.findAll();
    }
    findOne(sprintId) {
        return this.sprintsService.findBySprintId(sprintId);
    }
    update(sprintId, dto) {
        return this.sprintsService.update(sprintId, dto);
    }
    remove(sprintId) {
        return this.sprintsService.remove(sprintId);
    }
};
exports.SprintsController = SprintsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau sprint' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sprint_dto_1.CreateSprintDto]),
    __metadata("design:returntype", void 0)
], SprintsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lister tous les sprints' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SprintsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un sprint par son ID' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId', description: 'Identifiant unique du sprint' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SprintsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un sprint' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId', description: 'Identifiant unique du sprint' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sprint_dto_1.UpdateSprintDto]),
    __metadata("design:returntype", void 0)
], SprintsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un sprint' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId', description: 'Identifiant unique du sprint' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SprintsController.prototype, "remove", null);
exports.SprintsController = SprintsController = __decorate([
    (0, swagger_1.ApiTags)('sprints'),
    (0, common_1.Controller)('sprints'),
    __metadata("design:paramtypes", [sprints_service_1.SprintsService])
], SprintsController);
//# sourceMappingURL=sprints.controller.js.map