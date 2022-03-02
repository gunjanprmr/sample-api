import sqlConnect from "../database.middleware";

describe("Database", () => {

    it("success", (done) => {
        const output = sqlConnect();
        expect(output).toBeDefined();
        done();
    });
});