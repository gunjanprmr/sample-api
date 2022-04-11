import { inject, injectable } from "inversify";
import { AuthUserModel } from "../models/authUser.model";
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
     * 
     * @returns Auth0 specific model(s)
     */
    public async getUsers2(): Promise<AuthUserModel[]> {
        const logger = await this.loggerService.logger(this.constructor.name);
        try {
            const response = await this.userRepository.getUsers();
            const authUsers = await this.convertToAuthUsers(response);
            logger.info(authUsers);
            return authUsers;
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

    /**
     * POST call to create a user
     */
    public async createUser(userModel: UserModel): Promise<string> {
        const logger = await this.loggerService.logger(this.constructor.name);
        try {
            const response  = await this.userRepository.createUser(userModel);
            logger.info(response);
            return response;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    private async convertToAuthUsers(users: UserModel[]): Promise<AuthUserModel[]> {
        let authUsers: AuthUserModel[] = [];

        users.map((user) => {
            const authUser: AuthUserModel = {
                email: user.Email,
                email_verified: true,
                given_name: user.FirstName,
                family_name: user.LastName,
                name: user.FirstName + " " + user.LastName,
                blocked: false,
                password_hash: user.Password,
                app_metadata: {},
                user_metadata: {}
            };

            authUsers.push(authUser);
        })

        return authUsers;
    }
}