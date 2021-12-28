import { inject, injectable } from "inversify";
import { HealthModel } from "../models/health.model";
import LoggerService from "../services/logger.service";

export const dateTime = new Date().toISOString();

/**
 * Application health check
 */
@injectable()
export default class HealthService {

    constructor(
        @inject("LoggerService") private loggerService: LoggerService,
    ) { }
    /**
     * 
     * @returns health check
     */
    public async healthCheck(): Promise<HealthModel> {
        const logger = await this.loggerService.logger(this.constructor.name);
        try {
            const response: HealthModel = {
                dateTime: dateTime,
                description: "Health Check",
                status: "Connected"
            };
            logger.info(response);
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}