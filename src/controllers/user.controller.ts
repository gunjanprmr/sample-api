import { inject, injectable } from "inversify";
import UserService from "../services/user.service";
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from 'express';
import LoggerService from "../services/logger.service";

/**
 * Retrieve user related information.
 */
@injectable()
export default class UserController {

    constructor(
        @inject("UserService") private UserService: UserService,
        @inject("LoggerService") private loggerService: LoggerService,
    ) { }

    /**
     * Get all users.
     * @param req 
     * @param res 
     * @returns all users
     */
    public async getUsers(req: ExpressRequest, res: ExpressResponse): Promise<any> {
        try {
            const response = await this.UserService.getUsers();
            this.loggerService.info(this.constructor.name, response);
            res.send(response);
            return response; 
        } catch (error) {
            this.loggerService.error(this.constructor.name, error);
            throw error;
        }
    }

    /**
     * Get specific user
     * @param req 
     * @param res 
     * @param userId 
     * @returns 
     */
    public async getUser(req: ExpressRequest, res: ExpressResponse): Promise<any> {
        try {
            const userId = +req.params.userId;
            const response = await this.UserService.getUser(userId);
            this.loggerService.info(this.constructor.name, response);
            res.send(response);
            return response;
        } catch (error) {
            this.loggerService.error(this.constructor.name, error);
            throw error;
        }
        
    }
}