import { HealthModel } from "../models/health.model";

export const healthCheck = async(): Promise<HealthModel> => {

    const healthModel: HealthModel = {
        status: "Connected",
        description: "Health Check",
        dateTime: new Date(),
    }

    return healthModel;
}