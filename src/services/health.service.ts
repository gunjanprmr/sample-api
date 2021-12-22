import { injectable } from "inversify";
import { HealthModel } from "../models/health.model";

export const dateTime = new Date().toISOString();

/**
 * Application health check
 */
@injectable()
export default class HealthService {

    /**
     * 
     * @returns health check
     */
    public async healthCheck(): Promise<HealthModel> {
        return {
            dateTime: dateTime,
            description: "Health Check",
            status: "Connected"
        } as HealthModel;
    }
}