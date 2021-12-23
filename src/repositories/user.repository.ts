import { injectable } from "inversify";
import { UserModel } from "../models/user.model";
import sqlConnect from "../utils/database";
import sql from "mssql";

@injectable()
export default class UserRepository {

    /**
     * 
     * @returns all users 
     */
    public async getUsers(): Promise<UserModel[]> {
        try {
            const connect = await sql.connect(sqlConnect());
            const users = await connect.request().query("SELECT * FROM [User]");
            return users.recordset as UserModel[];
        } catch (error) {
            console.log("getUsers Error", error);
            throw error;
        }
    }

    /**
    * Returns specific user
    * @param userId 
    */
    public async getUser(userId: number): Promise<UserModel> {
        try {
            const connect = await sql.connect(sqlConnect());
            const user = await connect.request()
                .input('input_parameter', sql.Int, userId)
                .query("SELECT * FROM [User] WHERE UserId = @input_parameter");
            return user.recordset[0] as UserModel;
        } catch (error) {
            console.log("getUser Error", error);
            throw error;
        }
    }
}