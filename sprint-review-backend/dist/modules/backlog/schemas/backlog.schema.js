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
exports.BacklogSchema = exports.Backlog = exports.TechTaskSchema = exports.TechTask = exports.EnablerSchema = exports.Enabler = exports.UserStoryDetailSchema = exports.UserStoryDetail = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let UserStoryDetail = class UserStoryDetail {
};
exports.UserStoryDetail = UserStoryDetail;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserStoryDetail.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserStoryDetail.prototype, "storyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserStoryDetail.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], UserStoryDetail.prototype, "points", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], UserStoryDetail.prototype, "asA", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], UserStoryDetail.prototype, "iWant", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], UserStoryDetail.prototype, "soThat", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserStoryDetail.prototype, "ac", void 0);
exports.UserStoryDetail = UserStoryDetail = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], UserStoryDetail);
exports.UserStoryDetailSchema = mongoose_1.SchemaFactory.createForClass(UserStoryDetail);
let Enabler = class Enabler {
};
exports.Enabler = Enabler;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Enabler.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Enabler.prototype, "epicId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Enabler.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Enabler.prototype, "bgColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Enabler.prototype, "textColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Enabler.prototype, "iconColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.UserStoryDetailSchema], default: [] }),
    __metadata("design:type", Array)
], Enabler.prototype, "stories", void 0);
exports.Enabler = Enabler = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Enabler);
exports.EnablerSchema = mongoose_1.SchemaFactory.createForClass(Enabler);
let TechTask = class TechTask {
};
exports.TechTask = TechTask;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TechTask.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TechTask.prototype, "taskId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TechTask.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], TechTask.prototype, "points", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['tech', 'bug'], default: 'tech' }),
    __metadata("design:type", String)
], TechTask.prototype, "type", void 0);
exports.TechTask = TechTask = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TechTask);
exports.TechTaskSchema = mongoose_1.SchemaFactory.createForClass(TechTask);
let Backlog = class Backlog extends mongoose_2.Document {
};
exports.Backlog = Backlog;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Référence au sprint' }),
    (0, mongoose_1.Prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", String)
], Backlog.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Enablers (épiques) avec leurs user stories' }),
    (0, mongoose_1.Prop)({ type: [exports.EnablerSchema], default: [] }),
    __metadata("design:type", Array)
], Backlog.prototype, "enablers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tâches techniques et bugs' }),
    (0, mongoose_1.Prop)({ type: [exports.TechTaskSchema], default: [] }),
    __metadata("design:type", Array)
], Backlog.prototype, "techTasks", void 0);
exports.Backlog = Backlog = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'backlogs' })
], Backlog);
exports.BacklogSchema = mongoose_1.SchemaFactory.createForClass(Backlog);
//# sourceMappingURL=backlog.schema.js.map