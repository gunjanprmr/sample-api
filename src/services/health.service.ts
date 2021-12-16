import { injectable } from "inversify";
import { HealthModel } from "../models/health.model";

@injectable()
export default class HealthService {

    public async healthCheck(): Promise<HealthModel> {
        const healthModel: HealthModel = {
            dateTime: new Date(),
            description: "Health Check",
            status: "Connected"
        }
        return healthModel;
    }
}