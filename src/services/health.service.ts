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
        try {
            const response: HealthModel = {
                dateTime: dateTime,
                description: "Health Check",
                status: "Connected"
            };
            this.loggerService.info(this.constructor.name, response);
            return response;
        } catch (error) {
            this.loggerService.error(this.constructor.name, error);
            throw error;
        }
    }
}