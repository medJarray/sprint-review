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
exports.TeamsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const teams_service_1 = require("./teams.service");
const team_dto_1 = require("./dto/team.dto");
let TeamsController = class TeamsController {
    constructor(teamsService) {
        this.teamsService = teamsService;
    }
    create(dto) {
        return this.teamsService.create(dto);
    }
    findAll(sprintId) {
        return this.teamsService.findAllBySprint(sprintId);
    }
    findOne(sprintId, teamId) {
        return this.teamsService.findOne(sprintId, teamId);
    }
    update(sprintId, teamId, dto) {
        return this.teamsService.update(sprintId, teamId, dto);
    }
    remove(sprintId, teamId) {
        return this.teamsService.remove(sprintId, teamId);
    }
};
exports.TeamsController = TeamsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une équipe pour un sprint' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_dto_1.CreateTeamDto]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les équipes d\'un sprint' }),
    (0, swagger_1.ApiQuery)({ name: 'sprintId', description: 'ID du sprint' }),
    __param(0, (0, common_1.Query)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':sprintId/:teamId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une équipe' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    (0, swagger_1.ApiParam)({ name: 'teamId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':sprintId/:teamId'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une équipe' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    (0, swagger_1.ApiParam)({ name: 'teamId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Param)('teamId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, team_dto_1.UpdateTeamDto]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':sprintId/:teamId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une équipe' }),
    (0, swagger_1.ApiParam)({ name: 'sprintId' }),
    (0, swagger_1.ApiParam)({ name: 'teamId' }),
    __param(0, (0, common_1.Param)('sprintId')),
    __param(1, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "remove", null);
exports.TeamsController = TeamsController = __decorate([
    (0, swagger_1.ApiTags)('teams'),
    (0, common_1.Controller)('teams'),
    __metadata("design:paramtypes", [teams_service_1.TeamsService])
], TeamsController);
//# sourceMappingURL=teams.controller.js.map