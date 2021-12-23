import 'reflect-metadata';
import { mockUser, mockUsers } from "../mockData/user.mockData";
import UserController from "../user.controller";

describe("UserController", () => {
    let userController: UserController;
    let mockUserService: any;
    let req: any;
    let res: any;

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
        jest.doMock('../../services/user.service.ts', () => mockUserService);

        mockUserService = jest.fn();
        mockUserService.getUsers = jest.fn(() => {
            return Promise.resolve(mockUsers);
        });
        mockUserService.getUser = jest.fn(() => {
            return Promise.resolve(mockUser);
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

        userController = new UserController(mockUserService);
    });

    describe("getUsers", () => {
        it("returns successful list of users", async () => {
            const output = await userController.getUsers(req, res);
            expect(output).toEqual(mockUsers);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toBeCalledTimes(1);
            expect(req).not.toHaveBeenCalled();
            expect(mockUserService.getUsers).toHaveBeenCalled();
            expect(mockUserService.getUsers).toBeCalledTimes(1);
        });

        it("handles error", async () => {
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
            const output = await userController.getUser(req, res);
            expect(output).toEqual(mockUser);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toBeCalledTimes(1);
            expect(mockUserService.getUser).toHaveBeenCalled();
            expect(mockUserService.getUser).toBeCalledTimes(1);
        });

        it("handles error", async () => {
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
});