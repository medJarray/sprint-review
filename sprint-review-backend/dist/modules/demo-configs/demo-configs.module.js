"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoConfigsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const demo_config_schema_1 = require("./schemas/demo-config.schema");
const demo_configs_service_1 = require("./demo-configs.service");
const demo_configs_controller_1 = require("./demo-configs.controller");
let DemoConfigsModule = class DemoConfigsModule {
};
exports.DemoConfigsModule = DemoConfigsModule;
exports.DemoConfigsModule = DemoConfigsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: demo_config_schema_1.DemoConfig.name, schema: demo_config_schema_1.DemoConfigSchema }])],
        controllers: [demo_configs_controller_1.DemoConfigsController],
        providers: [demo_configs_service_1.DemoConfigsService],
        exports: [demo_configs_service_1.DemoConfigsService],
    })
], DemoConfigsModule);
//# sourceMappingURL=demo-configs.module.js.map