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
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('supertest');
const app = require("../app");
const health_service_1 = require("../services/health.service");
describe("GET /heathStatus API tests", () => {
    it("Receives 200 on successful call", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockHealthCheckModel = {
            dateTime: health_service_1.dateTime,
            description: "Health Check",
            status: "Connected",
        };
        const result = yield request(app).get("/healthStatus");
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.text)).toEqual(mockHealthCheckModel);
    }));
    it("Receives 404 - Not Found on unsuccessful call", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request(app).get("/invalidEndPoint");
        expect(result.statusCode).toEqual(401);
    }));
});
