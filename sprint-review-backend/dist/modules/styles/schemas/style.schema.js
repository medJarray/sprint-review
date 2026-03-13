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
exports.StyleSchema = exports.Style = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Style = class Style extends mongoose_2.Document {
};
exports.Style = Style;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Référence au sprint' }),
    (0, mongoose_1.Prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", String)
], Style.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: 'DM Sans, sans-serif' }),
    __metadata("design:type", String)
], Style.prototype, "fontFamily", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: 'DM Sans, sans-serif' }),
    __metadata("design:type", String)
], Style.prototype, "headingFontFamily", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: '#0F52BA' }),
    __metadata("design:type", String)
], Style.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: '#6366F1' }),
    __metadata("design:type", String)
], Style.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: '#00C48C' }),
    __metadata("design:type", String)
], Style.prototype, "accentColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: '#F9FAFB' }),
    __metadata("design:type", String)
], Style.prototype, "backgroundColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: '#1F2937' }),
    __metadata("design:type", String)
], Style.prototype, "textColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: 14 }),
    __metadata("design:type", Number)
], Style.prototype, "fontSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: 8 }),
    __metadata("design:type", Number)
], Style.prototype, "borderRadius", void 0);
exports.Style = Style = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'styles' })
], Style);
exports.StyleSchema = mongoose_1.SchemaFactory.createForClass(Style);
//# sourceMappingURL=style.schema.js.map