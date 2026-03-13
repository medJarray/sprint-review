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
exports.StylesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const styles_service_1 = require("./styles.service");
const style_dto_1 = require("./dto/style.dto");
let StylesController = class StylesController {
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
exports.StylesController = StylesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer/remplacer les styles d\'un sprint (upsert)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [style_dto_1.CreateStyleDto]),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "createOrReplace", null);
__decorate([
    (0, common_1.Get)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les styles d\'un sprint' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "findBySprint", null);
__decorate([
    (0, common_1.Put)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour les styles' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, style_dto_1.UpdateStyleDto]),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer les styles d\'un sprint' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "remove", null);
exports.StylesController = StylesController = __decorate([
    (0, swagger_1.ApiTags)('styles'),
    (0, common_1.Controller)('styles'),
    __metadata("design:paramtypes", [styles_service_1.StylesService])
], StylesController);
//# sourceMappingURL=styles.controller.js.map