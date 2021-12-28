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
        @inject("UserService") private userService: UserService,
        @inject("LoggerService") private loggerService: LoggerService,
    ) { }

    /**
     * Get all users.
     * @param req 
     * @param res 
     * @returns all users
     */
    public async getUsers(req: ExpressRequest, res: ExpressResponse): Promise<any> {
        const logger = await this.loggerService.logger(this.constructor.name);
        try {
            const response = await this.userService.getUsers();
            logger.debug(response);
            res.send(response);
            return response; 
        } catch (error) {
            logger.error(error);
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
        const logger = await this.loggerService.logger(this.constructor.name);
        try {
            const userId = +req.params.userId;
            const response = await this.userService.getUser(userId);
            logger.debug(response);
            res.send(response);
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
        
    }
}