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
exports.PageSchema = exports.Page = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Page = class Page extends mongoose_2.Document {
};
exports.Page = Page;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Référence au sprint' }),
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], Page.prototype, "sprintId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la page' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Page.prototype, "pageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Titre de la page' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Page.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Slug URL' }),
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Page.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ordre d\'affichage' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Page.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Visible dans la navigation' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Page.prototype, "visible", void 0);
exports.Page = Page = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'pages' })
], Page);
exports.PageSchema = mongoose_1.SchemaFactory.createForClass(Page);
exports.PageSchema.index({ sprintId: 1, pageId: 1 }, { unique: true });
exports.PageSchema.index({ sprintId: 1, order: 1 });
//# sourceMappingURL=page.schema.js.map