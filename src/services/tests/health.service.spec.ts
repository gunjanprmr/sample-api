import 'reflect-metadata';
import { HealthModel } from "../../models/health.model";
import HealthService, { dateTime } from "../health.service";

describe("HealthService", () => {
    let healthService: HealthService;
    let mockLoggerService: any;
    let mockInfo: any;
    let mockError: any;

    beforeEach(async () => {
        jest.resetModules();
        jest.resetAllMocks();
        
        // Mock Logger Service
        mockLoggerService = jest.fn();
        mockLoggerService.logger = jest.fn();
        mockInfo = {
            info: jest.fn(),
        };
        mockError = {
            error: jest.fn(),
        };

        healthService = new HealthService(mockLoggerService);
    });

    it("Success", async () => {
        const mockHealthCheckModel: HealthModel = {
            dateTime: dateTime,
            description: "Health Check",
            status: "Connected",
        };
        mockLoggerService.logger.mockReturnValueOnce(mockInfo);
        const output = await healthService.healthCheck();
        expect(output).toEqual(mockHealthCheckModel);
    });

    it("handles error", async () => {
        const fakeError = "Can't get health status";
        mockInfo = {
            info: Promise.reject(fakeError),
        };

        mockError = {
            error: Promise.reject("abc"),
        };
        mockLoggerService.logger.mockReturnValueOnce(mockInfo);
        mockLoggerService.logger.mockReturnValueOnce(mockError);
        // healthService.healthCheck = jest.fn(() => {
        //     return Promise.reject(fakeError);
        // });

        try {
            await healthService.healthCheck();
            fail("shouldn't be here")
        } catch (error) {
            const actualError = error as Error;
            const errorMessage = actualError.message;
            expect(errorMessage).toContain("logger.error is not a function");
        }
    })
});