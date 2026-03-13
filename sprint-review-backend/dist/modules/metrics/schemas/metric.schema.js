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
exports.MetricSchema = exports.Metric = exports.SprintMetricsBaseSchema = exports.SprintMetricsBase = exports.QualityGateSchema = exports.QualityGate = exports.InsightItemSchema = exports.InsightItem = exports.VelocityEntrySchema = exports.VelocityEntry = exports.KpiCardSchema = exports.KpiCard = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let KpiCard = class KpiCard {
};
exports.KpiCard = KpiCard;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], KpiCard.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], KpiCard.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], KpiCard.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], KpiCard.prototype, "unit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], KpiCard.prototype, "badgeText", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['up', 'down', 'stable', 'check', 'smile'], default: 'stable' }),
    __metadata("design:type", String)
], KpiCard.prototype, "badgeType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], KpiCard.prototype, "subText", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], KpiCard.prototype, "borderColor", void 0);
exports.KpiCard = KpiCard = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], KpiCard);
exports.KpiCardSchema = mongoose_1.SchemaFactory.createForClass(KpiCard);
let VelocityEntry = class VelocityEntry {
};
exports.VelocityEntry = VelocityEntry;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], VelocityEntry.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], VelocityEntry.prototype, "value", void 0);
exports.VelocityEntry = VelocityEntry = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], VelocityEntry);
exports.VelocityEntrySchema = mongoose_1.SchemaFactory.createForClass(VelocityEntry);
let InsightItem = class InsightItem {
};
exports.InsightItem = InsightItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InsightItem.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InsightItem.prototype, "text", void 0);
exports.InsightItem = InsightItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], InsightItem);
exports.InsightItemSchema = mongoose_1.SchemaFactory.createForClass(InsightItem);
let QualityGate = class QualityGate {
};
exports.QualityGate = QualityGate;
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], QualityGate.prototype, "unitTests", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], QualityGate.prototype, "sonarGrade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], QualityGate.prototype, "e2eTests", void 0);
exports.QualityGate = QualityGate = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], QualityGate);
exports.QualityGateSchema = mongoose_1.SchemaFactory.createForClass(QualityGate);
let SprintMetricsBase = class SprintMetricsBase {
};
exports.SprintMetricsBase = SprintMetricsBase;
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], SprintMetricsBase.prototype, "plannedPoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], SprintMetricsBase.prototype, "completedPoints", void 0);
exports.SprintMetricsBase = SprintMetricsBase = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], SprintMetricsBase);
exports.SprintMetricsBaseSchema = mongoose_1.SchemaFactory.createForClass(SprintMetricsBase);
let Metric = class Metric extends mongoose_2.Document {
};
exports.Metric = Metric;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Référence au sprint' }),
    (0, mongoose_1.Prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", String)
], Metric.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Métriques de base (points planifiés/complétés)' }),
    (0, mongoose_1.Prop)({ type: exports.SprintMetricsBaseSchema, default: {} }),
    __metadata("design:type", SprintMetricsBase)
], Metric.prototype, "sprintMetrics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cartes KPI' }),
    (0, mongoose_1.Prop)({ type: [exports.KpiCardSchema], default: [] }),
    __metadata("design:type", Array)
], Metric.prototype, "kpiCards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Données burndown idéales (tableau de nombres)' }),
    (0, mongoose_1.Prop)({ type: [Number], default: [] }),
    __metadata("design:type", Array)
], Metric.prototype, "burndownIdeal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Données burndown réelles' }),
    (0, mongoose_1.Prop)({ type: [Number], default: [] }),
    __metadata("design:type", Array)
], Metric.prototype, "burndownReal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Historique de vélocité' }),
    (0, mongoose_1.Prop)({ type: [exports.VelocityEntrySchema], default: [] }),
    __metadata("design:type", Array)
], Metric.prototype, "velocityHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Points positifs (rétro/insights)' }),
    (0, mongoose_1.Prop)({ type: [exports.InsightItemSchema], default: [] }),
    __metadata("design:type", Array)
], Metric.prototype, "insightsGood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Points négatifs' }),
    (0, mongoose_1.Prop)({ type: [exports.InsightItemSchema], default: [] }),
    __metadata("design:type", Array)
], Metric.prototype, "insightsBad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quality Gates' }),
    (0, mongoose_1.Prop)({ type: exports.QualityGateSchema, default: {} }),
    __metadata("design:type", QualityGate)
], Metric.prototype, "qualityGate", void 0);
exports.Metric = Metric = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'metrics' })
], Metric);
exports.MetricSchema = mongoose_1.SchemaFactory.createForClass(Metric);
//# sourceMappingURL=metric.schema.js.map