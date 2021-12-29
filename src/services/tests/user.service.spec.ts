import 'reflect-metadata';
import { mockUsers, mockUser } from "../../controllers/mockData/user.mockData";
import UserService from "../user.service";

describe("UserService", () => {
    let userService: UserService;
    let mockUserRepository: any;
    let mockLoggerService: any;
    let mockInfo: any;
    let mockError: any;

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();

        // Mock User Repository
        mockUserRepository = jest.fn();
        mockUserRepository.getUsers = jest.fn(() => {
            return Promise.resolve(mockUsers);
        });
        mockUserRepository.getUser = jest.fn(() => {
            return Promise.resolve(mockUser);
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

        userService = new UserService(mockUserRepository, mockLoggerService);
    });

    describe("getUsers", () => {
        it("returns successful list of users", async () => {
            mockLoggerService.logger.mockReturnValueOnce(mockInfo);
            const output = await userService.getUsers();
            expect(output).toEqual(mockUsers);
            expect(mockUserRepository.getUsers).toHaveBeenCalled();
            expect(mockUserRepository.getUsers).toBeCalledTimes(1);
        });

        it("handles error", async () => {
            const fakeError = "Can't get users";
            mockLoggerService.logger.mockReturnValueOnce(mockError);
            mockUserRepository.getUsers = jest.fn(() => {
                return Promise.reject(fakeError);
            });

            try {
                await userService.getUsers();
                fail("shouldn't be here")
            } catch (error) {
                expect(error).toEqual(fakeError);
            }
        });
    });

    describe("getUser", () => {
        const mockUserId = 1;
        it("Success", async () => {
            mockLoggerService.logger.mockReturnValueOnce(mockInfo);
            const output = await userService.getUser(mockUserId);
            expect(output).toEqual(mockUser);
            expect(mockUserRepository.getUser).toHaveBeenCalled();
            expect(mockUserRepository.getUser).toBeCalledTimes(1);
        });

        it("handles error", async () => {
            const fakeError = "Can't get user";
            mockLoggerService.logger.mockReturnValueOnce(mockError);
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