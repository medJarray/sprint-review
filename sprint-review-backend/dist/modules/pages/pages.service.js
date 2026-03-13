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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const page_schema_1 = require("./schemas/page.schema");
let PagesService = class PagesService {
    constructor(model) {
        this.model = model;
    }
    async create(dto) {
        return this.model.create(dto);
    }
    async findAllBySprint(sprintId) {
        return this.model.find({ sprintId }).sort({ order: 1 }).exec();
    }
    async findOne(sprintId, pageId) {
        const doc = await this.model.findOne({ sprintId, pageId }).exec();
        if (!doc)
            throw new common_1.NotFoundException(`Page "${pageId}" introuvable pour le sprint "${sprintId}"`);
        return doc;
    }
    async update(sprintId, pageId, dto) {
        const updated = await this.model
            .findOneAndUpdate({ sprintId, pageId }, { $set: dto }, { new: true })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException(`Page "${pageId}" introuvable`);
        return updated;
    }
    async remove(sprintId, pageId) {
        const result = await this.model.deleteOne({ sprintId, pageId }).exec();
        if (result.deletedCount === 0)
            throw new common_1.NotFoundException(`Page "${pageId}" introuvable`);
    }
    async removeAllBySprint(sprintId) {
        await this.model.deleteMany({ sprintId }).exec();
    }
    async replaceAllBySprint(sprintId, pages) {
        await this.model.deleteMany({ sprintId }).exec();
        const docs = pages.map((p) => ({ ...p, sprintId }));
        return this.model.insertMany(docs);
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(page_schema_1.Page.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PagesService);
//# sourceMappingURL=pages.service.js.map