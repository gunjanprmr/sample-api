"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const health_controller_1 = __importDefault(require("./controllers/health.controller"));
const health_service_1 = __importDefault(require("./services/health.service"));
let container = new inversify_1.Container();
// Controllers
container.bind(health_controller_1.default).to(health_controller_1.default);
// Services
container.bind("HealthService").to(health_service_1.default).inSingletonScope();
exports.default = container;
