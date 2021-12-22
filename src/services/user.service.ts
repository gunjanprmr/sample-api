import { injectable } from "inversify";
import sql from "mssql";
import sqlConnect from "../utils/database";

/**
 * User(s) related information
 */
@injectable()
export default class UserService {

    /**
     * 
     * @returns all users 
     */
    public async getUsers(): Promise<any> {
        try {
            const connect = await sql.connect(sqlConnect());
            const users = await connect.request().query("SELECT * FROM [User]");
            return users.recordsets;
        } catch (error) {
            console.log("getUsers Error", error);
            throw error;
        }
    }

    /**
     * Returns specific user
     * @param userId 
     */
    public async getUser(userId: number): Promise<any> {
        try {
            const connect = await sql.connect(sqlConnect());
            const user = await connect.request()
                .input('input_parameter', sql.Int, userId)
                .query("SELECT * FROM [User] WHERE UserId = @input_parameter");
                return user.recordset;
        } catch (error) {
            console.log("getUser Error", error);
            throw error;
        }
    }
}