import { inject, injectable } from "inversify";
import sql from "mssql";
import { UserModel } from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import sqlConnect from "../utils/database";

/**
 * User(s) related information
 */
@injectable()
export default class UserService {

    constructor(
        @inject("UserRepository") private userRepository: UserRepository,
    ) {}

    /**
     * 
     * @returns all users 
     */
    public async getUsers(): Promise<UserModel[]> {
        try {   
            return await this.userRepository.getUsers();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns specific user
     * @param userId 
     */
    public async getUser(userId: number): Promise<UserModel> {
        try {
            return await this.userRepository.getUser(userId);
        } catch (error) {
            throw error;
        }
    }
}