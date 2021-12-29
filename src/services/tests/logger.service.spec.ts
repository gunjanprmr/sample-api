import 'reflect-metadata';
import LoggerService from '../logger.service';

describe("LoggerService", () => {

    let loggerService: LoggerService;
    const mockFileName: string = "mockFileName";

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
  
        loggerService = new LoggerService();
    });

    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    describe("logger", () => {
        it("Success - When log folder exists", async () => {
             const output = await loggerService.logger(mockFileName);
            expect(output).toBeDefined();
            expect(loggerService).toBeInstanceOf(LoggerService);

        });

        it("Success - When log folder does not exists", async () => {
            const output = await loggerService.logger(mockFileName);
            expect(output).toBeDefined();
            expect(loggerService).toBeInstanceOf(LoggerService);
        });

        it("Failure", async () => {
            const fakeError = "Can't log";
            loggerService.logger = jest.fn(() => {
                return Promise.reject(fakeError);
            });

            try {
                await loggerService.logger(mockFileName);
                fail("shouldn't be here")
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toEqual(fakeError);
            }
        })
    })
});