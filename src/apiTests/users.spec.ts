const request = require('supertest');
const userApp = require("../app");

describe("GET /users & GET /users/:userID API tests", () => {
    describe("GET /users", () => {

        it("Receives 200 on successful call", async () => {
            const result = await request(userApp).get("/users");
            expect(result.statusCode).toEqual(200);
        });

        it("Receives 404 - Not Found on unsuccessful call", async () => {
            const result = await request(userApp).get("/invalidEndPoint");
            expect(result.statusCode).toEqual(404);
        });

    });

    describe("GET /users/:userID", () => {

        it("Receives 200 on successful call", async () => {
            const mockUserID = "1";
            const result = await request(userApp).get(`/users/${mockUserID}`);
            expect(result.statusCode).toEqual(200);
        }, 10000);

        it("Receives 404 - Not Found on unsuccessful call", async () => {
            const result = await request(userApp).get("/invalidEndPoint");
            expect(result.statusCode).toEqual(404);
        });

    });
});

