import sqlConnect from "../database.middleware";

describe("Database", () => {

    it("success", (done) => {
        const output = sqlConnect();
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