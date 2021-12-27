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
const health_controller_1 = __importDefault(require("../health.controller"));
describe("HealthController", () => {
    let healthController;
    let mockHealthService;
    let mockLoggerService;
    let req;
    let res;
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
        healthController = new health_controller_1.default(mockHealthService, mockLoggerService);
    });
    describe("healthCheck", () => {
        it("returns successful response", () => __awaiter(void 0, void 0, void 0, function* () {
            yield healthController.healthCheck(req, res);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toBeCalledTimes(1);
            expect(req).not.toHaveBeenCalled();
            expect(mockHealthService.healthCheck).toHaveBeenCalled();
            expect(mockHealthService.healthCheck).toBeCalledTimes(1);
        }));
        it("handles error", () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeError = "Can't get health status";
            mockHealthService.healthCheck = jest.fn(() => {
                return Promise.reject(fakeError);
            });
            try {
                yield healthController.healthCheck(req, res);
                fail("shouldn't be here");
            }
            catch (error) {
                expect(error).toEqual(fakeError);
            }
        }));
    });
});
