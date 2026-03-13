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
exports.PagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pages_service_1 = require("./pages.service");
const page_dto_1 = require("./dto/page.dto");
let PagesController = class PagesController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    replaceAll(sprintId, body) {
        return this.service.replaceAllBySprint(sprintId, body.pages);
    }
    findAll(sprintId) {
        return this.service.findAllBySprint(sprintId);
    }
    findOne(sprintId, pageId) {
        return this.service.findOne(sprintId, pageId);
    }
    update(sprintId, pageId, dto) {
        return this.service.update(sprintId, pageId, dto);
    }
    remove(sprintId, pageId) {
        return this.service.remove(sprintId, pageId);
    }
};
exports.PagesController = PagesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une page pour un sprint' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_dto_1.CreatePageDto]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':sprintId/batch'),
    (0, swagger_1.ApiOperation)({ summary: 'Remplacer toutes les pages d\'un sprint en batch' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "replaceAll", null);
__decorate([
    (0, common_1.Get)(':sprintId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les pages d\'un sprint' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':sprintId/:pageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une page' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    (0, swagger_1.ApiParam)({ name: 'pageId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Param)('pageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':sprintId/:pageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une page' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    (0, swagger_1.ApiParam)({ name: 'pageId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Param)('pageId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, page_dto_1.UpdatePageDto]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':sprintId/:pageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une page' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    (0, swagger_1.ApiParam)({ name: 'pageId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Param)('pageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "remove", null);
exports.PagesController = PagesController = __decorate([
    (0, swagger_1.ApiTags)('pages'),
    (0, common_1.Controller)('pages'),
    __metadata("design:paramtypes", [pages_service_1.PagesService])
], PagesController);
//# sourceMappingURL=pages.controller.js.map