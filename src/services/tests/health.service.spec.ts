import 'reflect-metadata';
import { HealthModel } from "../../models/health.model";
import HealthService, { dateTime } from "../health.service";

describe("HealthService", () => {
    let healthService: HealthService;
    let mockLoggerService: any;

    beforeEach(async () => {
        mockLoggerService = jest.fn();
        mockLoggerService.info = jest.fn(() => {
            return Promise.resolve();
        });
        mockLoggerService.error = jest.fn(() => {
            return Promise.resolve();
        });

        healthService = new HealthService(mockLoggerService);
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

    it("handles error", async () => {
        const fakeError = "Can't get health status";
        healthService.healthCheck = jest.fn(() => {
            return Promise.reject(fakeError);
        });

        try {
            await healthService.healthCheck();
            fail("shouldn't be here")
        } catch (error) {
            expect(error).toEqual(fakeError);
        }
    })
});