"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const authz_middleware_1 = require("../utils/authz.middleware");
const request = require('supertest');
const userApp = require("../app");
describe("GET /users & GET /users/:userID API tests", () => {
    describe("GET /users", () => {
        it("Receives 200 on successful call", () => __awaiter(void 0, void 0, void 0, function* () {
            // userApp.use(checkJwt);
            const result = yield request(userApp).use(authz_middleware_1.checkJwt).get("/users");
            expect(result.statusCode).toEqual(200);
        }));
        it("Receives 404 - Not Found on unsuccessful call", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield request(userApp).get("/invalidEndPoint");
            expect(result.statusCode).toEqual(401);
        }));
    });
    describe("GET /users/:userID", () => {
        it("Receives 200 on successful call", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUserID = "1";
            const result = yield request(userApp).get(`/users/${mockUserID}`);
            expect(result.statusCode).toEqual(200);
        }), 10000);
        it("Receives 404 - Not Found on unsuccessful call", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield request(userApp).get("/invalidEndPoint");
            expect(result.statusCode).toEqual(401);
        }));
    });
});
