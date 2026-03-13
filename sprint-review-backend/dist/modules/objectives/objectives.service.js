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
exports.ObjectivesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objective_schema_1 = require("./schemas/objective.schema");
let ObjectivesService = class ObjectivesService {
    constructor(model) {
        this.model = model;
    }
    async createOrReplace(dto) {
        return this.model.findOneAndUpdate({ sprintId: dto.sprintId }, { $set: dto }, { new: true, upsert: true }).exec();
    }
    async findBySprint(sprintId) {
        const doc = await this.model.findOne({ sprintId }).exec();
        if (!doc)
            throw new common_1.NotFoundException(`Objectifs introuvables pour le sprint "${sprintId}"`);
        return doc;
    }
    async update(sprintId, dto) {
        const updated = await this.model
            .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
            .exec();
        return updated;
    }
    async remove(sprintId) {
        const result = await this.model.deleteOne({ sprintId }).exec();
        if (result.deletedCount === 0)
            throw new common_1.NotFoundException(`Objectifs introuvables pour "${sprintId}"`);
    }
};
exports.ObjectivesService = ObjectivesService;
exports.ObjectivesService = ObjectivesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(objective_schema_1.Objective.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ObjectivesService);
//# sourceMappingURL=objectives.service.js.map