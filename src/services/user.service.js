"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const inversify_1 = require("inversify");
/**
 * User(s) related information
 */
let UserService = class UserService {
    constructor(userRepository, loggerService) {
        this.userRepository = userRepository;
        this.loggerService = loggerService;
    }
    /**
     *
     * @returns all users
     */
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userRepository.getUsers();
                this.loggerService.info(this.constructor.name, response);
                return response;
            }
            catch (error) {
                this.loggerService.error(this.constructor.name, error);
                throw error;
            }
        });
    }
    /**
     * Returns specific user
     * @param userId
     */
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userRepository.getUser(userId);
                this.loggerService.info(this.constructor.name, response);
                return response;
            }
            catch (error) {
                this.loggerService.error(this.constructor.name, error);
                throw error;
            }
        });
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("UserRepository")),
    __param(1, (0, inversify_1.inject)("LoggerService"))
], UserService);
exports.default = UserService;
