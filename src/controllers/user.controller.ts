import { inject, injectable } from "inversify";
import UserService from "../services/user.service";
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from 'express';

/**
 * Retrieve user related information.
 */
@injectable()
export default class UserController {

    constructor(
        @inject("UserService") private UserService: UserService,
    ) { }

    /**
     * Get all users.
     * @param req 
     * @param res 
     * @returns all users
     */
    public async getUsers(req: ExpressRequest, res: ExpressResponse): Promise<any> {
        try {
            const returnThis = await this.UserService.getUsers();
            res.send(returnThis);
            return returnThis; 
        } catch (error) {
            // console.log("getUsers error ", error);
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
            const returnThis = await this.UserService.getUser(userId);
            res.send(returnThis);
            return returnThis;
        } catch (error) {
            throw error;
        }
        
    }
}