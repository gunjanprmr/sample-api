import { Application } from "express";
import asyncWrap from "../middleware/asyncWrap.middleware";
import HealthController from "../controllers/health.controller";
import container from "../ioc.container";
import UserController from "../controllers/user.controller";
import { checkJwt } from "../middleware/authz.middleware";

export default function (application: Application) {
    
    const healthController = container.get<HealthController>(HealthController);
    application.get('/healthStatus', asyncWrap(healthController.healthCheck.bind(healthController)));

    // // 🔐 Secure endpoints with Auth0 🔐 👇🏼
    // application.use(checkJwt);
    const userController = container.get<UserController>(UserController); 
    application.get('/users', asyncWrap(userController.getUsers2.bind(userController)));
    application.get('/users/:userId', asyncWrap(userController.getUser.bind(userController)));
    application.post('/user', asyncWrap(userController.createUser.bind(userController)))
}
