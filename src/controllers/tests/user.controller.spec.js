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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const user_mockData_1 = require("../mockData/user.mockData");
const user_controller_1 = __importDefault(require("../user.controller"));
describe("UserController", () => {
    let userController;
    let mockUserService;
    let req;
    let res;
    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
        jest.doMock('../../services/user.service.ts', () => mockUserService);
        mockUserService = jest.fn();
        mockUserService.getUsers = jest.fn(() => {
            return Promise.resolve(user_mockData_1.mockUsers);
        });
        mockUserService.getUser = jest.fn(() => {
            return Promise.resolve(user_mockData_1.mockUser);
        });
        req = jest.fn();
        req.params = jest.fn(() => {
            return Promise.resolve();
        });
        req.params.id = jest.fn(() => {
            return Promise.resolve();
        });
        res = jest.fn();
        res.send = jest.fn(() => {
            return Promise.resolve();
        });
        userController = new user_controller_1.default(mockUserService);
    });
    describe("getUsers", () => {
        it("returns successful list of users", () => __awaiter(void 0, void 0, void 0, function* () {
            const output = yield userController.getUsers(req, res);
            expect(output).toEqual(user_mockData_1.mockUsers);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toBeCalledTimes(1);
            expect(req).not.toHaveBeenCalled();
            expect(mockUserService.getUsers).toHaveBeenCalled();
            expect(mockUserService.getUsers).toBeCalledTimes(1);
        }));
        it("handles error", () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeError = "Can't get users";
            mockUserService.getUsers = jest.fn(() => {
                return Promise.reject(fakeError);
            });
            try {
                yield userController.getUsers(req, res);
                fail("shouldn't be here");
            }
            catch (error) {
                expect(error).toEqual(fakeError);
            }
        }));
    });
    describe("getUser", () => {
        it("Success", () => __awaiter(void 0, void 0, void 0, function* () {
            const output = yield userController.getUser(req, res);
            expect(output).toEqual(user_mockData_1.mockUser);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toBeCalledTimes(1);
            expect(mockUserService.getUser).toHaveBeenCalled();
            expect(mockUserService.getUser).toBeCalledTimes(1);
        }));
        it("handles error", () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeError = "Can't get user";
            mockUserService.getUser = jest.fn(() => {
                return Promise.reject(fakeError);
            });
            try {
                yield userController.getUser(req, res);
                fail("shouldn't be here");
            }
            catch (error) {
                expect(error).toEqual(fakeError);
            }
        }));
    });
});
