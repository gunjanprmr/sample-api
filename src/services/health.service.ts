import { injectable } from "inversify";
import { HealthModel } from "../models/health.model";

@injectable()
export default class HealthService {
    public readonly dateTime = new Date();
    public async healthCheck(): Promise<HealthModel> {
        return {
            dateTime: this.dateTime,
            description: "Health Check",
            status: "Connected"
        } as HealthModel;
    }
}