"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const sprints_module_1 = require("./modules/sprints/sprints.module");
const teams_module_1 = require("./modules/teams/teams.module");
const objectives_module_1 = require("./modules/objectives/objectives.module");
const backlog_module_1 = require("./modules/backlog/backlog.module");
const realizations_module_1 = require("./modules/realizations/realizations.module");
const demo_configs_module_1 = require("./modules/demo-configs/demo-configs.module");
const metrics_module_1 = require("./modules/metrics/metrics.module");
const backlog_evolution_module_1 = require("./modules/backlog-evolution/backlog-evolution.module");
const next_steps_module_1 = require("./modules/next-steps/next-steps.module");
const styles_module_1 = require("./modules/styles/styles.module");
const pages_module_1 = require("./modules/pages/pages.module");
const minio_module_1 = require("./modules/minio/minio.module");
const attachments_module_1 = require("./modules/attachments/attachments.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/sprint-review'),
            sprints_module_1.SprintsModule,
            teams_module_1.TeamsModule,
            objectives_module_1.ObjectivesModule,
            backlog_module_1.BacklogModule,
            realizations_module_1.RealizationsModule,
            demo_configs_module_1.DemoConfigsModule,
            metrics_module_1.MetricsModule,
            backlog_evolution_module_1.BacklogEvolutionModule,
            next_steps_module_1.NextStepsModule,
            styles_module_1.StylesModule,
            pages_module_1.PagesModule,
            minio_module_1.MinioModule,
            attachments_module_1.AttachmentsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map