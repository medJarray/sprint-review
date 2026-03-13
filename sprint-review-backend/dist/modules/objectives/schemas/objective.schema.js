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
exports.ObjectiveSchema = exports.Objective = exports.TextItemSchema = exports.TextItem = exports.ObjectiveItemSchema = exports.ObjectiveItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let ObjectiveItem = class ObjectiveItem {
};
exports.ObjectiveItem = ObjectiveItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ObjectiveItem.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ObjectiveItem.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ObjectiveItem.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ObjectiveItem.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ObjectiveItem.prototype, "scope", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ObjectiveItem.prototype, "epicLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ObjectiveItem.prototype, "borderColor", void 0);
exports.ObjectiveItem = ObjectiveItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ObjectiveItem);
exports.ObjectiveItemSchema = mongoose_1.SchemaFactory.createForClass(ObjectiveItem);
let TextItem = class TextItem {
};
exports.TextItem = TextItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TextItem.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TextItem.prototype, "text", void 0);
exports.TextItem = TextItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], TextItem);
exports.TextItemSchema = mongoose_1.SchemaFactory.createForClass(TextItem);
let Objective = class Objective extends mongoose_2.Document {
};
exports.Objective = Objective;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Référence au sprint' }),
    (0, mongoose_1.Prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", String)
], Objective.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Liste des objectifs SMART' }),
    (0, mongoose_1.Prop)({ type: [exports.ObjectiveItemSchema], default: [] }),
    __metadata("design:type", Array)
], Objective.prototype, "objectives", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Critères de succès' }),
    (0, mongoose_1.Prop)({ type: [exports.TextItemSchema], default: [] }),
    __metadata("design:type", Array)
], Objective.prototype, "successCriteria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contraintes identifiées' }),
    (0, mongoose_1.Prop)({ type: [exports.TextItemSchema], default: [] }),
    __metadata("design:type", Array)
], Objective.prototype, "constraints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Definition of Done' }),
    (0, mongoose_1.Prop)({ type: [exports.TextItemSchema], default: [] }),
    __metadata("design:type", Array)
], Objective.prototype, "dodItems", void 0);
exports.Objective = Objective = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'objectives' })
], Objective);
exports.ObjectiveSchema = mongoose_1.SchemaFactory.createForClass(Objective);
//# sourceMappingURL=objective.schema.js.map