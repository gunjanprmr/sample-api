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
        try {   
            const response = await this.userRepository.getUsers();
            this.loggerService.info(this.constructor.name, response);
            return response;
        } catch (error) {
            this.loggerService.error(this.constructor.name, error);
            throw error;
        }
    }

    /**
     * Returns specific user
     * @param userId 
     */
    public async getUser(userId: number): Promise<UserModel> {
        try {
            const response = await this.userRepository.getUser(userId);
            this.loggerService.info(this.constructor.name, response);
            return response;
        } catch (error) {
            this.loggerService.error(this.constructor.name, error);
            throw error;
        }
    }
}