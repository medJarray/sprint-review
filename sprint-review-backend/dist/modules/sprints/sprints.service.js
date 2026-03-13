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
exports.SprintsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sprint_schema_1 = require("./schemas/sprint.schema");
let SprintsService = class SprintsService {
    constructor(sprintModel) {
        this.sprintModel = sprintModel;
    }
    async create(dto) {
        return this.sprintModel.create(dto);
    }
    async findAll() {
        return this.sprintModel.find().sort({ number: -1 }).exec();
    }
    async findBySprintId(sprintId) {
        const sprint = await this.sprintModel.findOne({ sprintId }).exec();
        if (!sprint)
            throw new common_1.NotFoundException(`Sprint "${sprintId}" introuvable`);
        return sprint;
    }
    async update(sprintId, dto) {
        const updated = await this.sprintModel
            .findOneAndUpdate({ sprintId }, { $set: { ...dto, sprintId } }, { new: true, upsert: true })
            .exec();
        return updated;
    }
    async remove(sprintId) {
        const result = await this.sprintModel.deleteOne({ sprintId }).exec();
        if (result.deletedCount === 0)
            throw new common_1.NotFoundException(`Sprint "${sprintId}" introuvable`);
    }
};
exports.SprintsService = SprintsService;
exports.SprintsService = SprintsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(sprint_schema_1.Sprint.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SprintsService);
//# sourceMappingURL=sprints.service.js.map