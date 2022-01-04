"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncWrap_1 = __importDefault(require("../utils/asyncWrap"));
const health_controller_1 = __importDefault(require("../controllers/health.controller"));
const ioc_container_1 = __importDefault(require("../ioc.container"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authz_middleware_1 = require("../utils/authz.middleware");
function default_1(application) {
    const healthController = ioc_container_1.default.get(health_controller_1.default);
    application.get('/healthStatus', (0, asyncWrap_1.default)(healthController.healthCheck.bind(healthController)));
    // 🔐 Secure endpoints with Auth0 🔐 👇🏼
    application.use(authz_middleware_1.checkJwt);
    const userController = ioc_container_1.default.get(user_controller_1.default);
    application.get('/users', (0, asyncWrap_1.default)(userController.getUsers.bind(userController)));
    application.get('/users/:userId', (0, asyncWrap_1.default)(userController.getUser.bind(userController)));
    application.post('/user', (0, asyncWrap_1.default)(userController.createUser.bind(userController)));
}
exports.default = default_1;
