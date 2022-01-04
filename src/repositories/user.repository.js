"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const database_1 = __importDefault(require("../utils/database"));
const mssql_1 = __importDefault(require("mssql"));
let UserRepository = class UserRepository {
    /**
     *
     * @returns all users
     */
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield mssql_1.default.connect((0, database_1.default)());
                const users = yield connect.request().query("SELECT * FROM [User]");
                return users.recordset;
            }
            catch (error) {
                console.log("getUsers Error", error);
                throw error;
            }
        });
    }
    /**
    * Returns specific user
    * @param userId
    */
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield mssql_1.default.connect((0, database_1.default)());
                const user = yield connect.request()
                    .input('input_parameter', mssql_1.default.Int, userId)
                    .query("SELECT * FROM [User] WHERE UserId = @input_parameter");
                return user.recordset[0];
            }
            catch (error) {
                console.log("getUser Error", error);
                throw error;
            }
        });
    }
    /**
     * POST call to create a user
     */
    createUser(userModel) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // INSERT INTO[User]
                // VALUES('Gunjan', 'Parmar', 'gp@carvana.com', '123', GETDATE(), GETDATE(), null, null, 1, null)
                const connect = yield mssql_1.default.connect((0, database_1.default)());
                const user = yield connect.request()
                    .input('FirstName', mssql_1.default.NVarChar, userModel.firstName)
                    .input('LastName', mssql_1.default.NVarChar, userModel.lastName)
                    .input('Email', mssql_1.default.NVarChar, userModel.email)
                    .input('Password', mssql_1.default.NVarChar, userModel.password)
                    .input('RowLoadedDateTime', mssql_1.default.DateTimeOffset, userModel.rowLoadedDateTime)
                    .input('RowUpdatedDateTime', mssql_1.default.DateTimeOffset, userModel.rowUpdatedDateTime)
                    .input('RowDeletedDateTime', mssql_1.default.DateTimeOffset, (_a = userModel.rowDeletedDateTime) !== null && _a !== void 0 ? _a : null)
                    .input('PhoneNumber', mssql_1.default.Char, (_b = userModel.phoneNumber) !== null && _b !== void 0 ? _b : null)
                    .input('UserTypeId', mssql_1.default.Int, userModel.userTypeId)
                    .input('LastLoginDateTime', mssql_1.default.DateTimeOffset, (_c = userModel.lastLoginDateTime) !== null && _c !== void 0 ? _c : null)
                    .query("INSERT INTO [USER] VALUES (@FirstName, @LastName, @Email, @Password, @RowLoadedDateTime, @RowUpdatedDateTime, @RowDeletedDateTime, @PhoneNumber, @UserTypeId, @LastLoginDateTime)");
                return "User Created";
            }
            catch (error) {
                console.log("createUser Error", error);
                throw error;
            }
        });
    }
};
UserRepository = __decorate([
    (0, inversify_1.injectable)()
], UserRepository);
exports.default = UserRepository;
