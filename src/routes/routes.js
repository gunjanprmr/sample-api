"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncWrap_1 = __importDefault(require("../utils/asyncWrap"));
const health_controller_1 = __importDefault(require("../controllers/health.controller"));
const ioc_container_1 = __importDefault(require("../ioc.container"));
function default_1(application) {
    const healthController = ioc_container_1.default.get(health_controller_1.default);
    application.get('/healthStatus', (0, asyncWrap_1.default)(healthController.healthCheck.bind(healthController)));
}
exports.default = default_1;