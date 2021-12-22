import { Application } from "express";
import asyncWrap from "../utils/asyncWrap";
import HealthController from "../controllers/health.controller";
import container from "../ioc.container";
import UserController from "../controllers/user.controller";

export default function (application: Application) {
    const healthController = container.get<HealthController>(HealthController);
    const userController = container.get<UserController>(UserController);

    application.get('/healthStatus', asyncWrap(healthController.healthCheck.bind(healthController)));
    application.get('/users', asyncWrap(userController.getUsers.bind(userController)));
}
