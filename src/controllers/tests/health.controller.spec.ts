import 'reflect-metadata';
import HealthController from "../health.controller";

describe("HealthController", () => {

    let healthController: HealthController;
    let mockHealthService: any;
    let req: any;
    let res: any;
    
    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();

        mockHealthService = jest.fn();
        mockHealthService.healthCheck = jest.fn(() => {
            return Promise.resolve();
        });
        jest.doMock('../../services/health.service.ts', () => mockHealthService);

        req = jest.fn();
        res = jest.fn();
        res.send = jest.fn(() => {
            return Promise.resolve();
        });

        healthController = new HealthController(mockHealthService);
    });

    describe("healthCheck", () => {
        it("success", async () => {
            await healthController.healthCheck(req, res);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toBeCalledTimes(1);
            expect(req).not.toHaveBeenCalled();
            expect(mockHealthService.healthCheck).toHaveBeenCalled();
            expect(mockHealthService.healthCheck).toBeCalledTimes(1);
        })
    })
});