import { inject, injectable } from "inversify";
import { UserModel } from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import LoggerService from "../services/logger.service";

/**
 * User(s) related information
 */
@injectable()
export default class UserService {

    constructor(
        @inject("UserRepository") private userRepository: UserRepository,
        @inject("LoggerService") private loggerService: LoggerService,
    ) {}

    /**
     * 
     * @returns all users 
     */
    public async getUsers(): Promise<UserModel[]> {
        const logger = await this.loggerService.logger(this.constructor.name);
        try {   
            const response = await this.userRepository.getUsers();
            logger.info(response);
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    /**
     * Returns specific user
     * @param userId 
     */
    public async getUser(userId: number): Promise<UserModel> {
        const logger = await this.loggerService.logger(this.constructor.name);
        try {
            const response = await this.userRepository.getUser(userId);
            logger.info(response);
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}