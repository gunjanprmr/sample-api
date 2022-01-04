import { inject, injectable } from "inversify";
import UserService from "../services/user.service";
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from 'express';
import LoggerService from "../services/logger.service";
import { UserModel } from "../models/user.model";

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
    public async getUsers(req: ExpressRequest, res: ExpressResponse): Promise<UserModel[]> {
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
    public async getUser(req: ExpressRequest, res: ExpressResponse): Promise<UserModel> {
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

    /**
     * Create the user
     * @param req 
     * @param res 
     * @returns newly created user (UserModel)
     */
    public async createUser(req: ExpressRequest, res: ExpressResponse): Promise<string> {
        const logger = await this.loggerService.logger(this.constructor.name);
        try {
            const userModel = req.body as UserModel;
            const response = await this.userService.createUser(userModel);
            logger.debug(response);
            res.send(response);
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}