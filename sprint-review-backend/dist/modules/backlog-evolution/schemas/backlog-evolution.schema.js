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
exports.BacklogEvolutionSchema = exports.BacklogEvolution = exports.PrioritizationMatrixSchema = exports.PrioritizationMatrix = exports.MatrixItemSchema = exports.MatrixItem = exports.BacklogChangeSchema = exports.BacklogChange = exports.EpicProgressSchema = exports.EpicProgress = exports.BacklogHealthDataSchema = exports.BacklogHealthData = exports.DistributionItemSchema = exports.DistributionItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let DistributionItem = class DistributionItem {
};
exports.DistributionItem = DistributionItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DistributionItem.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], DistributionItem.prototype, "count", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], DistributionItem.prototype, "pct", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DistributionItem.prototype, "color", void 0);
exports.DistributionItem = DistributionItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], DistributionItem);
exports.DistributionItemSchema = mongoose_1.SchemaFactory.createForClass(DistributionItem);
let BacklogHealthData = class BacklogHealthData {
};
exports.BacklogHealthData = BacklogHealthData;
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BacklogHealthData.prototype, "totalItems", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BacklogHealthData.prototype, "readyPercent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], BacklogHealthData.prototype, "avgAge", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.DistributionItemSchema], default: [] }),
    __metadata("design:type", Array)
], BacklogHealthData.prototype, "distribution", void 0);
exports.BacklogHealthData = BacklogHealthData = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], BacklogHealthData);
exports.BacklogHealthDataSchema = mongoose_1.SchemaFactory.createForClass(BacklogHealthData);
let EpicProgress = class EpicProgress {
};
exports.EpicProgress = EpicProgress;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EpicProgress.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EpicProgress.prototype, "epicId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EpicProgress.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], EpicProgress.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], EpicProgress.prototype, "pct", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], EpicProgress.prototype, "done", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], EpicProgress.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], EpicProgress.prototype, "targetSprint", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], EpicProgress.prototype, "bgColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], EpicProgress.prototype, "borderColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], EpicProgress.prototype, "badgeBg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], EpicProgress.prototype, "badgeText", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], EpicProgress.prototype, "barColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], EpicProgress.prototype, "targetColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], EpicProgress.prototype, "pctColor", void 0);
exports.EpicProgress = EpicProgress = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], EpicProgress);
exports.EpicProgressSchema = mongoose_1.SchemaFactory.createForClass(EpicProgress);
let BacklogChange = class BacklogChange {
};
exports.BacklogChange = BacklogChange;
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BacklogChange.prototype, "added", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BacklogChange.prototype, "removed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BacklogChange.prototype, "reprioritized", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], BacklogChange.prototype, "reasons", void 0);
exports.BacklogChange = BacklogChange = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], BacklogChange);
exports.BacklogChangeSchema = mongoose_1.SchemaFactory.createForClass(BacklogChange);
let MatrixItem = class MatrixItem {
};
exports.MatrixItem = MatrixItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MatrixItem.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MatrixItem.prototype, "storyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MatrixItem.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], MatrixItem.prototype, "points", void 0);
exports.MatrixItem = MatrixItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], MatrixItem);
exports.MatrixItemSchema = mongoose_1.SchemaFactory.createForClass(MatrixItem);
let PrioritizationMatrix = class PrioritizationMatrix {
};
exports.PrioritizationMatrix = PrioritizationMatrix;
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.MatrixItemSchema], default: [] }),
    __metadata("design:type", Array)
], PrioritizationMatrix.prototype, "quickWins", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.MatrixItemSchema], default: [] }),
    __metadata("design:type", Array)
], PrioritizationMatrix.prototype, "majorProjects", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.MatrixItemSchema], default: [] }),
    __metadata("design:type", Array)
], PrioritizationMatrix.prototype, "fillIns", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.MatrixItemSchema], default: [] }),
    __metadata("design:type", Array)
], PrioritizationMatrix.prototype, "timeSinks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], PrioritizationMatrix.prototype, "insights", void 0);
exports.PrioritizationMatrix = PrioritizationMatrix = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], PrioritizationMatrix);
exports.PrioritizationMatrixSchema = mongoose_1.SchemaFactory.createForClass(PrioritizationMatrix);
let BacklogEvolution = class BacklogEvolution extends mongoose_2.Document {
};
exports.BacklogEvolution = BacklogEvolution;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Référence au sprint' }),
    (0, mongoose_1.Prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", String)
], BacklogEvolution.prototype, "sprintId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.BacklogHealthDataSchema, default: {} }),
    __metadata("design:type", BacklogHealthData)
], BacklogEvolution.prototype, "backlogHealth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.EpicProgressSchema], default: [] }),
    __metadata("design:type", Array)
], BacklogEvolution.prototype, "epicsProgress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.BacklogChangeSchema, default: {} }),
    __metadata("design:type", BacklogChange)
], BacklogEvolution.prototype, "backlogChanges", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.PrioritizationMatrixSchema, default: {} }),
    __metadata("design:type", PrioritizationMatrix)
], BacklogEvolution.prototype, "prioritizationMatrix", void 0);
exports.BacklogEvolution = BacklogEvolution = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'backlog_evolution' })
], BacklogEvolution);
exports.BacklogEvolutionSchema = mongoose_1.SchemaFactory.createForClass(BacklogEvolution);
//# sourceMappingURL=backlog-evolution.schema.js.map