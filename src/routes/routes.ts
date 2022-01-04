import { Application } from "express";
import asyncWrap from "../utils/asyncWrap";
import HealthController from "../controllers/health.controller";
import container from "../ioc.container";
import UserController from "../controllers/user.controller";
import { checkJwt } from "../utils/authz.middleware";

export default function (application: Application) {
    
    const healthController = container.get<HealthController>(HealthController);
    application.get('/healthStatus', asyncWrap(healthController.healthCheck.bind(healthController)));

    // 🔐 Secure endpoints with Auth0 🔐 👇🏼
    application.use(checkJwt);
    const userController = container.get<UserController>(UserController); 
    application.get('/users', asyncWrap(userController.getUsers.bind(userController)));
    application.get('/users/:userId', asyncWrap(userController.getUser.bind(userController)));
    application.post('/user', asyncWrap(userController.createUser.bind(userController)))
}
