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
exports.NextStepSchema = exports.NextStep = exports.KeyDateSchema = exports.KeyDate = exports.RiskSchema = exports.Risk = exports.DecisionSchema = exports.Decision = exports.NextSprintCandidateSchema = exports.NextSprintCandidate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let NextSprintCandidate = class NextSprintCandidate {
};
exports.NextSprintCandidate = NextSprintCandidate;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NextSprintCandidate.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NextSprintCandidate.prototype, "storyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NextSprintCandidate.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], NextSprintCandidate.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['high', 'medium', 'low', ''], default: '' }),
    __metadata("design:type", String)
], NextSprintCandidate.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], NextSprintCandidate.prototype, "points", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], NextSprintCandidate.prototype, "type", void 0);
exports.NextSprintCandidate = NextSprintCandidate = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], NextSprintCandidate);
exports.NextSprintCandidateSchema = mongoose_1.SchemaFactory.createForClass(NextSprintCandidate);
let Decision = class Decision {
};
exports.Decision = Decision;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Decision.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Decision.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Decision.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Decision.prototype, "icon", void 0);
exports.Decision = Decision = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Decision);
exports.DecisionSchema = mongoose_1.SchemaFactory.createForClass(Decision);
let Risk = class Risk {
};
exports.Risk = Risk;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Risk.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Risk.prototype, "text", void 0);
exports.Risk = Risk = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Risk);
exports.RiskSchema = mongoose_1.SchemaFactory.createForClass(Risk);
let KeyDate = class KeyDate {
};
exports.KeyDate = KeyDate;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], KeyDate.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], KeyDate.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], KeyDate.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], KeyDate.prototype, "color", void 0);
exports.KeyDate = KeyDate = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], KeyDate);
exports.KeyDateSchema = mongoose_1.SchemaFactory.createForClass(KeyDate);
let NextStep = class NextStep extends mongoose_2.Document {
};
exports.NextStep = NextStep;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Référence au sprint' }),
    (0, mongoose_1.Prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", String)
], NextStep.prototype, "sprintId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.NextSprintCandidateSchema], default: [] }),
    __metadata("design:type", Array)
], NextStep.prototype, "nextSprintCandidates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.DecisionSchema], default: [] }),
    __metadata("design:type", Array)
], NextStep.prototype, "decisions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.RiskSchema], default: [] }),
    __metadata("design:type", Array)
], NextStep.prototype, "risks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.KeyDateSchema], default: [] }),
    __metadata("design:type", Array)
], NextStep.prototype, "keyDates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], NextStep.prototype, "nextSprintDate", void 0);
exports.NextStep = NextStep = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'next_steps' })
], NextStep);
exports.NextStepSchema = mongoose_1.SchemaFactory.createForClass(NextStep);
//# sourceMappingURL=next-step.schema.js.map