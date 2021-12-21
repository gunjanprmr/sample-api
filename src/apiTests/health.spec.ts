const request = require('supertest');
const app = require('../index');
import { HealthModel } from "../models/health.model";
import { dateTime } from "../services/health.service";

describe('GET /heathStatus', () => {
    
    it("Receives 200 on successful call", async () => {

        const mockHealthCheckModel: HealthModel = {
            dateTime: dateTime,
            description: "Health Check",
            status: "Connected",
        };
        
        const result = await request(app).get("/healthStatus");
        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.text)).toEqual(mockHealthCheckModel);
    });

    it("Receives 404 - Not Found on unsuccessful call", async () => {
        const result = await request(app).get("/invalidEndPoint");
        expect(result.statusCode).toEqual(404);
    })
});