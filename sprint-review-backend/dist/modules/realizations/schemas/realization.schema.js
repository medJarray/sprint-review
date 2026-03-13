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
exports.RealizationSchema = exports.Realization = exports.ValueMetricSchema = exports.ValueMetric = exports.DeferredItemSchema = exports.DeferredItem = exports.SmallCardSchema = exports.SmallCard = exports.FeatureCardSchema = exports.FeatureCard = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let FeatureCard = class FeatureCard {
};
exports.FeatureCard = FeatureCard;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FeatureCard.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FeatureCard.prototype, "storyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FeatureCard.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], FeatureCard.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['deployed', 'validated', 'done', 'fixed', 'testing', 'blocked'], default: 'done' }),
    __metadata("design:type", String)
], FeatureCard.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FeatureCard.prototype, "impact", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FeatureCard.prototype, "prLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], FeatureCard.prototype, "assignees", void 0);
exports.FeatureCard = FeatureCard = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], FeatureCard);
exports.FeatureCardSchema = mongoose_1.SchemaFactory.createForClass(FeatureCard);
let SmallCard = class SmallCard {
};
exports.SmallCard = SmallCard;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SmallCard.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], SmallCard.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SmallCard.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], SmallCard.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['deployed', 'validated', 'done', 'fixed', 'testing', 'blocked'], default: 'done' }),
    __metadata("design:type", String)
], SmallCard.prototype, "status", void 0);
exports.SmallCard = SmallCard = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], SmallCard);
exports.SmallCardSchema = mongoose_1.SchemaFactory.createForClass(SmallCard);
let DeferredItem = class DeferredItem {
};
exports.DeferredItem = DeferredItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeferredItem.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeferredItem.prototype, "storyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeferredItem.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DeferredItem.prototype, "reason", void 0);
exports.DeferredItem = DeferredItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], DeferredItem);
exports.DeferredItemSchema = mongoose_1.SchemaFactory.createForClass(DeferredItem);
let ValueMetric = class ValueMetric {
};
exports.ValueMetric = ValueMetric;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ValueMetric.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ValueMetric.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ValueMetric.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ValueMetric.prototype, "subText", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ValueMetric.prototype, "bgColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ValueMetric.prototype, "borderColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ValueMetric.prototype, "iconColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ValueMetric.prototype, "icon", void 0);
exports.ValueMetric = ValueMetric = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ValueMetric);
exports.ValueMetricSchema = mongoose_1.SchemaFactory.createForClass(ValueMetric);
let Realization = class Realization extends mongoose_2.Document {
};
exports.Realization = Realization;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Référence au sprint' }),
    (0, mongoose_1.Prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", String)
], Realization.prototype, "sprintId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.FeatureCardSchema], default: [] }),
    __metadata("design:type", Array)
], Realization.prototype, "featureCards", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.SmallCardSchema], default: [] }),
    __metadata("design:type", Array)
], Realization.prototype, "smallCards", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.DeferredItemSchema], default: [] }),
    __metadata("design:type", Array)
], Realization.prototype, "deferredItems", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Realization.prototype, "teamNote", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ValueMetricSchema], default: [] }),
    __metadata("design:type", Array)
], Realization.prototype, "valueMetrics", void 0);
exports.Realization = Realization = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'realizations' })
], Realization);
exports.RealizationSchema = mongoose_1.SchemaFactory.createForClass(Realization);
//# sourceMappingURL=realization.schema.js.map