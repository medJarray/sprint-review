"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectivesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const objective_schema_1 = require("./schemas/objective.schema");
const objectives_service_1 = require("./objectives.service");
const objectives_controller_1 = require("./objectives.controller");
let ObjectivesModule = class ObjectivesModule {
};
exports.ObjectivesModule = ObjectivesModule;
exports.ObjectivesModule = ObjectivesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: objective_schema_1.Objective.name, schema: objective_schema_1.ObjectiveSchema }])],
        controllers: [objectives_controller_1.ObjectivesController],
        providers: [objectives_service_1.ObjectivesService],
        exports: [objectives_service_1.ObjectivesService],
    })
], ObjectivesModule);
//# sourceMappingURL=objectives.module.js.map