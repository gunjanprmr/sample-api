import { inject, injectable } from "inversify";
import { HealthModel } from "../models/health.model";
import HealthService from "../services/health.service";
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from 'express';
import LoggerService from "../services/logger.service";

/**
 * To check health of the application
 */
@injectable()
export default class HealthController {

    constructor(
        @inject("HealthService") private healthService: HealthService,
        @inject("LoggerService") private loggerService: LoggerService,
    ) {

    }

    /**
     * Returns health check
     * @param req 
     * @param res 
     * @returns HealthModel
     */
    public async healthCheck(req: ExpressRequest, res: ExpressResponse): Promise<HealthModel> {
        const logger = await this.loggerService.logger(this.constructor.name);
        try {
            const response = await this.healthService.healthCheck();
            logger.debug(response);
            res.send(response);
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}