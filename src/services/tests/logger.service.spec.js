"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const logger_service_1 = __importDefault(require("../logger.service"));
const fs = require('fs');
describe("LoggerService", () => {
    let loggerService;
    const mockFileName = "mockFileName";
    // let fsObject: typeof fs;
    let mockExistsSync;
    let mockMkdirSync;
    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
        // mockFs = jest.fn();
        loggerService = new logger_service_1.default();
    });
    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });
    describe("logger", () => {
        it("Success - When log folder exists", () => __awaiter(void 0, void 0, void 0, function* () {
            // mockExistsSync = {
            //     existsSync: jest.fn(),
            // };
            if (fs.existsSync('logs')) {
                const output = yield loggerService.logger(mockFileName);
                expect(output).toBeDefined();
                expect(loggerService).toBeInstanceOf(logger_service_1.default);
            }
        }));
        it("Success - When log folder does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockLogs = 'unitTestLogs';
            if (!fs.existsSync(mockLogs)) {
                fs.mkdirSync(mockLogs);
            }
            const output = yield loggerService.logger(mockFileName);
            expect(output).toBeDefined();
            expect(loggerService).toBeInstanceOf(logger_service_1.default);
        }));
        it("Failure", () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeError = "Can't log";
            loggerService.logger = jest.fn(() => {
                return Promise.reject(fakeError);
            });
            try {
                yield loggerService.logger(mockFileName);
                fail("shouldn't be here");
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toEqual(fakeError);
            }
        }));
    });
});
