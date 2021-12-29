import 'reflect-metadata';
import LoggerService from '../logger.service';
import fs from 'fs';
describe("LoggerService", () => {

    let loggerService: LoggerService;
    const mockFileName: string = "mockFileName";
    let fsSpy: any;

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();

        fsSpy = jest.spyOn(fs, 'existsSync').mockImplementation();
        fsSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation();
  
        loggerService = new LoggerService();
    });

    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    describe("logger", () => {
        it("Success", async () => {
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