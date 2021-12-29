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
const user_mockData_1 = require("../../controllers/mockData/user.mockData");
const user_service_1 = __importDefault(require("../user.service"));
describe("UserService", () => {
    let userService;
    let mockUserRepository;
    let mockLoggerService;
    let mockInfo;
    let mockError;
    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
        // Mock User Repository
        mockUserRepository = jest.fn();
        mockUserRepository.getUsers = jest.fn(() => {
            return Promise.resolve(user_mockData_1.mockUsers);
        });
        mockUserRepository.getUser = jest.fn(() => {
            return Promise.resolve(user_mockData_1.mockUser);
        });
        // Mock Logger Service
        mockLoggerService = jest.fn();
        mockLoggerService.logger = jest.fn();
        mockInfo = {
            info: jest.fn(),
        };
        mockError = {
            error: jest.fn(),
        };
        userService = new user_service_1.default(mockUserRepository, mockLoggerService);
    });
    describe("getUsers", () => {
        it("returns successful list of users", () => __awaiter(void 0, void 0, void 0, function* () {
            mockLoggerService.logger.mockReturnValueOnce(mockInfo);
            const output = yield userService.getUsers();
            expect(output).toEqual(user_mockData_1.mockUsers);
            expect(mockUserRepository.getUsers).toHaveBeenCalled();
            expect(mockUserRepository.getUsers).toBeCalledTimes(1);
        }));
        it("handles error", () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeError = "Can't get users";
            mockLoggerService.logger.mockReturnValueOnce(mockError);
            mockUserRepository.getUsers = jest.fn(() => {
                return Promise.reject(fakeError);
            });
            try {
                yield userService.getUsers();
                fail("shouldn't be here");
            }
            catch (error) {
                expect(error).toEqual(fakeError);
            }
        }));
    });
    describe("getUser", () => {
        const mockUserId = 1;
        it("Success", () => __awaiter(void 0, void 0, void 0, function* () {
            mockLoggerService.logger.mockReturnValueOnce(mockInfo);
            const output = yield userService.getUser(mockUserId);
            expect(output).toEqual(user_mockData_1.mockUser);
            expect(mockUserRepository.getUser).toHaveBeenCalled();
            expect(mockUserRepository.getUser).toBeCalledTimes(1);
        }));
        it("handles error", () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeError = "Can't get user";
            mockLoggerService.logger.mockReturnValueOnce(mockError);
            mockUserRepository.getUser = jest.fn(() => {
                return Promise.reject(fakeError);
            });
            try {
                yield userService.getUser(mockUserId);
                fail("shouldn't be here");
            }
            catch (error) {
                expect(error).toEqual(fakeError);
            }
        }));
    });
});
