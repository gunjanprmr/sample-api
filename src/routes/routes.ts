import { Application } from "express";
import asyncWrap from "../utils/asyncWrap";
import HealthController from "../controllers/health.controller";
import container from "../ioc.container";
import UserController from "../controllers/user.controller";

export default function (application: Application) {
    const healthController = container.get<HealthController>(HealthController);
    application.get('/healthStatus', asyncWrap(healthController.healthCheck.bind(healthController)));

    const userController = container.get<UserController>(UserController);
    application.get('/users', asyncWrap(userController.getUsers.bind(userController)));
    application.get('/users/:userId', asyncWrap(userController.getUser.bind(userController)));
}
