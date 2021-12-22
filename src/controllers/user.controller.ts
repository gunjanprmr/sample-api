import { inject, injectable } from "inversify";
// import { HealthModel } from "../models/health.model";
import UserService from "../services/user.service";
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from 'express';

@injectable()
export default class UserController {

    constructor(
        @inject("UserService") private UserService: UserService,
    ) { }

    public async getUsers(req: ExpressRequest, res: ExpressResponse): Promise<any> {
        const returnThis = await this.UserService.getUsers();
        res.send(returnThis);
        return returnThis;
    }
}