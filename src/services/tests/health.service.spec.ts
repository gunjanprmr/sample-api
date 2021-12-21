import 'reflect-metadata';
import { HealthModel } from "../../models/health.model";
import HealthService, { dateTime } from "../health.service";

describe("HealthService", () => {
    let healthService: HealthService;

    beforeEach(async () => {
        healthService = new HealthService();
    });

    it("Success", async () => {
        const mockHealthCheckModel: HealthModel = {
            dateTime: dateTime,
            description: "Health Check",
            status: "Connected",
        }
        const output = await healthService.healthCheck();
        expect(output).toEqual(mockHealthCheckModel);
    });
});