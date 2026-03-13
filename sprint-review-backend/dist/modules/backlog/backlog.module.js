"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacklogModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const backlog_schema_1 = require("./schemas/backlog.schema");
const backlog_service_1 = require("./backlog.service");
const backlog_controller_1 = require("./backlog.controller");
let BacklogModule = class BacklogModule {
};
exports.BacklogModule = BacklogModule;
exports.BacklogModule = BacklogModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: backlog_schema_1.Backlog.name, schema: backlog_schema_1.BacklogSchema }])],
        controllers: [backlog_controller_1.BacklogController],
        providers: [backlog_service_1.BacklogService],
        exports: [backlog_service_1.BacklogService],
    })
], BacklogModule);
//# sourceMappingURL=backlog.module.js.map