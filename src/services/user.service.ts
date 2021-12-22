import { injectable } from "inversify";
import sql from "mssql";
import sqlConnect from "../utils/database";

@injectable()
export default class UserService {
 
    public async getUsers(): Promise<any> {
        try {
            const connect = await sql.connect(sqlConnect());
            const result = await connect.request().query("SELECT * FROM [User]");
            return result.recordsets;
        } catch (error) {
            console.log("getUsers Error", error);
            throw error;
        }
    }
}