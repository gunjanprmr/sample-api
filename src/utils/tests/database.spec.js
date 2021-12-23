"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
describe("Database", () => {
    it("success", (done) => {
        const output = (0, database_1.default)();
        expect(output).toBeDefined();
        expect(output).toEqual({
            user: 'DMPAdmin',
            password: 'edDLHHMRcaJc5y21WhNf',
            server: 'carvana-dmp-dev.database.windows.net',
            database: 'DealerMarketplace',
            port: 1433
        });
        done();
    });
});
