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
exports.DemoConfigSchema = exports.DemoConfig = exports.DemoStepSchema = exports.DemoStep = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let DemoStep = class DemoStep {
};
exports.DemoStep = DemoStep;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DemoStep.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], DemoStep.prototype, "stepNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DemoStep.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DemoStep.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DemoStep.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DemoStep.prototype, "featureRef", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DemoStep.prototype, "isActive", void 0);
exports.DemoStep = DemoStep = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], DemoStep);
exports.DemoStepSchema = mongoose_1.SchemaFactory.createForClass(DemoStep);
let DemoConfig = class DemoConfig extends mongoose_2.Document {
};
exports.DemoConfig = DemoConfig;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Référence au sprint' }),
    (0, mongoose_1.Prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", String)
], DemoConfig.prototype, "sprintId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DemoConfig.prototype, "environment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DemoConfig.prototype, "testAccount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DemoConfig.prototype, "version", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DemoConfig.prototype, "demoOwner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DemoConfig.prototype, "demoOwnerInitials", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DemoConfig.prototype, "videoLink", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DemoConfig.prototype, "figmaLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.DemoStepSchema], default: [] }),
    __metadata("design:type", Array)
], DemoConfig.prototype, "steps", void 0);
exports.DemoConfig = DemoConfig = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'demo_configs' })
], DemoConfig);
exports.DemoConfigSchema = mongoose_1.SchemaFactory.createForClass(DemoConfig);
//# sourceMappingURL=demo-config.schema.js.map