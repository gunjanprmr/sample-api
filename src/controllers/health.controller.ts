import { inject, injectable } from "inversify";
import { HealthModel } from "../models/health.model";
import HealthService from "../services/health.service";
import { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
} from 'express';

@injectable()
export default class HealthController {

    constructor(
        @inject("HealthService") private HealthService: HealthService,
    ) { }

    public async healthCheck(req: ExpressRequest, res: ExpressResponse): Promise<HealthModel> {
        const returnThis = await this.HealthService.healthCheck();
        res.send(returnThis);
        return returnThis;
    }
}