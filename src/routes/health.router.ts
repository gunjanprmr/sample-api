import express, { Request, Response } from "express";
import { HealthModel } from "../models/health.model";
import * as HealthService from "../services/health.service";
/**
 * Router Definition
 */
export const healthRouter = express.Router();

/**
 * Controller Definitions
 */
healthRouter.get("/",async (req:Request, res: Response) => {
    try {
        const healthCheck: HealthModel = await HealthService.healthCheck();
        res.send(healthCheck);
    } catch (error) {
        res.send(error);
    }
})