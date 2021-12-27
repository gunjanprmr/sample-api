import 'reflect-metadata';
import { mockUsers, mockUser } from "../../controllers/mockData/user.mockData";
import UserService from "../user.service";

describe("UserService", () => {
    let userService: UserService;
    let mockUserRepository: any;
    let mockLoggerService: any;

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();

        mockUserRepository = jest.fn();
        mockUserRepository.getUsers = jest.fn(() => {
            return Promise.resolve(mockUsers);
        });
        mockUserRepository.getUser = jest.fn(() => {
            return Promise.resolve(mockUser);
        });

        mockLoggerService = jest.fn();
        mockLoggerService.info = jest.fn(() => {
            return Promise.resolve();
        });
        mockLoggerService.error = jest.fn(() => {
            return Promise.resolve();
        });

        userService = new UserService(mockUserRepository, mockLoggerService);
    });

    describe("getUsers", () => {
        it("returns successful list of users", async () => {
            const output = await userService.getUsers();
            expect(output).toEqual(mockUsers);
            expect(mockUserRepository.getUsers).toHaveBeenCalled();
            expect(mockUserRepository.getUsers).toBeCalledTimes(1);
        });

        it("handles error", async () => {
            const fakeError = "Can't get users";
            mockUserRepository.getUsers = jest.fn(() => {
                return Promise.reject(fakeError);
            });

            try {
                await mockUserRepository.getUsers();
                fail("shouldn't be here")
            } catch (error) {
                expect(error).toEqual(fakeError);
            }
        });
    });

    describe("getUser", () => {
        const mockUserId = 1;
        it("Success", async () => {
            const output = await userService.getUser(mockUserId);
            expect(output).toEqual(mockUser);
            expect(mockUserRepository.getUser).toHaveBeenCalled();
            expect(mockUserRepository.getUser).toBeCalledTimes(1);
        });

        it("handles error", async () => {
            const fakeError = "Can't get user";
            mockUserRepository.getUser = jest.fn(() => {
                return Promise.reject(fakeError);
            });

            try {
                await userService.getUser(mockUserId);
                fail("shouldn't be here")
            } catch (error) {
                expect(error).toEqual(fakeError);
            }
        });
    });
});