import { inject, injectable } from "inversify";
import { HealthModel } from "../models/health.model";
import HealthService from "../services/health.service";
import { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
} from 'express';

/**
 * To check health of the application
 */
@injectable()
export default class HealthController {

    constructor(
        @inject("HealthService") private HealthService: HealthService,
    ) { }

    /**
     * Returns health check
     * @param req 
     * @param res 
     * @returns HealthModel
     */
    public async healthCheck(req: ExpressRequest, res: ExpressResponse): Promise<HealthModel> {
        try {
            const returnThis = await this.HealthService.healthCheck();
            res.send(returnThis);
            return returnThis;
        } catch (error) {
            throw error;
        }
    }
}