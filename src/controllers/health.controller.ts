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
        @inject("HealthService") private HealthService: HealthService,
        @inject("LoggerService") private loggerService: LoggerService,
    ) { }

    /**
     * Returns health check
     * @param req 
     * @param res 
     * @returns HealthModel
     */
    public async healthCheck(req: ExpressRequest, res: ExpressResponse): Promise<HealthModel> {
        try {
            const response = await this.HealthService.healthCheck();
            this.loggerService.info(this.constructor.name, response);
            res.send(response);
            return response;
        } catch (error) {
            this.loggerService.error(this.constructor.name, error);
            throw error;
        }
    }
}