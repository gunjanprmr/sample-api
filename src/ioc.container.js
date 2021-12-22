"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const health_controller_1 = __importDefault(require("./controllers/health.controller"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const health_service_1 = __importDefault(require("./services/health.service"));
const user_service_1 = __importDefault(require("./services/user.service"));
let container = new inversify_1.Container();
// Controllers
container.bind(health_controller_1.default).toSelf();
;
container.bind(user_controller_1.default).toSelf();
// Services
container.bind("HealthService").to(health_service_1.default).inSingletonScope();
container.bind("UserService").to(user_service_1.default).inSingletonScope();
exports.default = container;
