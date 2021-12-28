"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const health_service_1 = __importStar(require("../health.service"));
describe("HealthService", () => {
    let healthService;
    let mockLoggerService;
    let mockInfo;
    let mockError;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Mock Logger Service
        mockLoggerService = jest.fn();
        mockLoggerService.logger = jest.fn();
        mockInfo = {
            info: jest.fn(),
        };
        mockError = {
            error: jest.fn(),
        };
        healthService = new health_service_1.default(mockLoggerService);
    }));
    it("Success", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockHealthCheckModel = {
            dateTime: health_service_1.dateTime,
            description: "Health Check",
            status: "Connected",
        };
        mockLoggerService.logger.mockReturnValueOnce(mockInfo);
        const output = yield healthService.healthCheck();
        expect(output).toEqual(mockHealthCheckModel);
    }));
    it("handles error", () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeError = "Can't get health status";
        mockLoggerService.logger.mockReturnValueOnce(mockError);
        healthService.healthCheck = jest.fn(() => {
            return Promise.reject(fakeError);
        });
        try {
            yield healthService.healthCheck();
            fail("shouldn't be here");
        }
        catch (error) {
            expect(error).toEqual(fakeError);
        }
    }));
});
