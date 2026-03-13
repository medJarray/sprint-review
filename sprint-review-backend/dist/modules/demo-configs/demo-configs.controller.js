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
exports.DemoConfigsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const demo_configs_service_1 = require("./demo-configs.service");
const demo_config_dto_1 = require("./dto/demo-config.dto");
let DemoConfigsController = class DemoConfigsController {
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
exports.DemoConfigsController = DemoConfigsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer/remplacer la config démo d\'un sprint (upsert)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [demo_config_dto_1.CreateDemoConfigDto]),
    __metadata("design:returntype", void 0)
], DemoConfigsController.prototype, "createOrReplace", null);
__decorate([
    (0, common_1.Get)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la config démo d\'un sprint' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemoConfigsController.prototype, "findBySprint", null);
__decorate([
    (0, common_1.Put)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour la config démo' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, demo_config_dto_1.UpdateDemoConfigDto]),
    __metadata("design:returntype", void 0)
], DemoConfigsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer la config démo' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemoConfigsController.prototype, "remove", null);
exports.DemoConfigsController = DemoConfigsController = __decorate([
    (0, swagger_1.ApiTags)('demo-configs'),
    (0, common_1.Controller)('demo-configs'),
    __metadata("design:paramtypes", [demo_configs_service_1.DemoConfigsService])
], DemoConfigsController);
//# sourceMappingURL=demo-configs.controller.js.map