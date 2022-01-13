import 'reflect-metadata';
import { mockUser, mockUsers } from "../mockData/user.mockData";
import UserController from "../user.controller";

describe("UserController", () => {
    let userController: UserController;
    let mockUserService: any;
    let mockLoggerService: any;
    let mockDebug: any;
    let mockError: any;
    let req: any;
    let res: any;

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
        jest.doMock('../../services/user.service.ts', () => mockUserService);

        // Mock User Service
        mockUserService = jest.fn();
        mockUserService.getUsers = jest.fn(() => {
            return Promise.resolve(mockUsers);
        });
        mockUserService.getUser = jest.fn(() => {
            return Promise.resolve(mockUser);
        });
        mockUserService.createUser = jest.fn(() => {
            return Promise.resolve(mockUser);
        });

        // Mock Logger Service
        mockLoggerService = jest.fn();
        mockLoggerService.logger = jest.fn();
        mockDebug = {
            debug: jest.fn(),
        };
        mockError = {
            error: jest.fn(),
        };

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

        userController = new UserController(mockUserService, mockLoggerService);
    });

    describe("getUsers", () => {
        it("returns successful list of users", async () => {
            
            mockLoggerService.logger.mockReturnValueOnce(mockDebug);

            const output = await userController.getUsers(req, res);
            expect(output).toEqual(mockUsers);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toBeCalledTimes(1);
            expect(req).not.toHaveBeenCalled();
            expect(mockUserService.getUsers).toHaveBeenCalled();
            expect(mockUserService.getUsers).toBeCalledTimes(1);
        });

        it("handles error", async () => {
            mockLoggerService.logger.mockReturnValueOnce(mockError);
            const fakeError = "Can't get users";
            mockUserService.getUsers = jest.fn(() => {
                return Promise.reject(fakeError);
            });

            try {
                await userController.getUsers(req, res);
                fail("shouldn't be here")
            } catch (error) {
                expect(error).toEqual(fakeError);
            }
        });
    });

    describe("getUser", () => {
        it("Success", async () => {
            mockLoggerService.logger.mockReturnValueOnce(mockDebug);
            const output = await userController.getUser(req, res);
            expect(output).toEqual(mockUser);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toBeCalledTimes(1);
            expect(mockUserService.getUser).toHaveBeenCalled();
            expect(mockUserService.getUser).toBeCalledTimes(1);
        });

        it("handles error", async () => {
            mockLoggerService.logger.mockReturnValueOnce(mockError);
            const fakeError = "Can't get user";
            mockUserService.getUser = jest.fn(() => {
                return Promise.reject(fakeError);
            });

            try {
                await userController.getUser(req, res);
                fail("shouldn't be here")
            } catch (error) {
                expect(error).toEqual(fakeError);
            }
        });
    });

    describe("createUser", () => {
        it("Success", async () => {
            mockLoggerService.logger.mockReturnValueOnce(mockDebug);
            const output = await userController.createUser(req, res);
            expect(output).toEqual(mockUser);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toBeCalledTimes(1);
            expect(mockUserService.createUser).toHaveBeenCalled();
            expect(mockUserService.createUser).toBeCalledTimes(1);
        });

        it("handles error", async () => {
            mockLoggerService.logger.mockReturnValueOnce(mockError);
            const fakeError = "Can't create user";
            mockUserService.createUser = jest.fn(() => {
                return Promise.reject(fakeError);
            });

            try {
                await userController.createUser(req, res);
                fail("shouldn't be here")
            } catch (error) {
                expect(error).toEqual(fakeError);
            }
        });
    });
});