import { injectable } from "inversify";
import { UserModel } from "../models/user.model";
import sqlConnect from "../middleware/database.middleware";
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

    /**
     * POST call to create a user
     */
    public async createUser(userModel: UserModel): Promise<string> {
        try {
            const connect = await sql.connect(sqlConnect());
            const user = await connect.request()
                .input('FirstName', sql.NVarChar, userModel.FirstName)
                .input('LastName', sql.NVarChar, userModel.LastName)
                .input('Email', sql.NVarChar, userModel.Email)
                .input('Password', sql.NVarChar, userModel.Password)
                .input('RowLoadedDateTime', sql.DateTimeOffset, userModel.rowLoadedDateTime)
                .input('RowUpdatedDateTime', sql.DateTimeOffset, userModel.rowUpdatedDateTime)
                .input('RowDeletedDateTime', sql.DateTimeOffset, userModel.rowDeletedDateTime ?? null)
                .input('PhoneNumber', sql.Char, userModel.phoneNumber ?? null)
                .input('UserTypeId', sql.Int, userModel.userTypeId)
                .input('LastLoginDateTime', sql.DateTimeOffset, userModel.lastLoginDateTime ?? null)
                .input('DeviceToken', sql.NVarChar, userModel.deviceToken ?? null)
                .query("INSERT INTO [USER] VALUES (@FirstName, @LastName, @Email, @Password, @RowLoadedDateTime, @RowUpdatedDateTime, @RowDeletedDateTime, @PhoneNumber, @UserTypeId, @LastLoginDateTime, @DeviceToken)")
            return "User Created";
        } catch (error) {
            console.log("createUser Error", error);
            throw error;
        }
    }
}