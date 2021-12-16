import { Application } from "express";
import asyncWrap from "../utils/asyncWrap";
import HealthController from "../controllers/health.controller";
import container from "../ioc.container";

export default function (application: Application) {
    const healthController = container.get<HealthController>(HealthController);
 
    application.get('/healthStatus', asyncWrap(healthController.healthCheck.bind(healthController)));
}
