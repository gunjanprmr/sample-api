import 'reflect-metadata';
import HealthController from "../health.controller";

describe("HealthController", () => {

    let healthController: HealthController;
    let mockHealthService: any;
    let mockLoggerService: any;
    let mockDebug: any;
    let mockError: any;
    let req: any;
    let res: any;
    
    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();

        // Mock Health Service
        mockHealthService = jest.fn();
        mockHealthService.healthCheck = jest.fn(() => {
            return Promise.resolve();
        });

         // Mock Logger Service
        mockLoggerService = jest.fn();
        mockLoggerService.logger = jest.fn();
        mockDebug = {
            debug: jest.fn(),
        };
        mockError = {
            error: jest.fn(),
        };

        // Mock express Request and Response
        req = jest.fn();
        res = jest.fn();
        res.send = jest.fn(() => {
            return Promise.resolve();
        });

        healthController = new HealthController(mockHealthService, mockLoggerService);
    });

    describe("healthCheck", () => {
        it("returns successful response", async () => {

            mockLoggerService.logger.mockReturnValueOnce(mockDebug);
            
            await healthController.healthCheck(req, res);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toBeCalledTimes(1);
            expect(req).not.toHaveBeenCalled();
            expect(mockHealthService.healthCheck).toHaveBeenCalled();
            expect(mockHealthService.healthCheck).toBeCalledTimes(1);
        });

        it("handles error", async () => {
            
            const fakeError = "Can't get health status";
            mockLoggerService.logger.mockReturnValueOnce(mockError);
            mockHealthService.healthCheck = jest.fn(() => {
                return Promise.reject(fakeError);
            });

            try {
                await healthController.healthCheck(req, res);
                fail("shouldn't be here")
            } catch (error) {
                expect(error).toEqual(fakeError);
            }
        });
    })
});