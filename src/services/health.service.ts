import { injectable } from "inversify";
import { HealthModel } from "../models/health.model";

export const dateTime = new Date().toISOString();
@injectable()
export default class HealthService {
    // public readonly dateTime = new Date().toISOString();

    public async healthCheck(): Promise<HealthModel> {
        return {
            dateTime: dateTime,
            description: "Health Check",
            status: "Connected"
        } as HealthModel;
    }
}