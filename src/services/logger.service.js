"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const winston_1 = require("winston");
let LoggerService = class LoggerService {
    /**
     *
     * @returns Log object for logging
     */
    logger(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, winston_1.createLogger)({
                format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message, service }) => {
                    return `[${timestamp}] ${service} ${level}: ${JSON.stringify(message)}`;
                })),
                // transports: [
                //     new winston.transports.File({
                //         filename: '../logs/logs.log'
                //     }),
                // ],
                transports: [new winston_1.transports.Console()],
                defaultMeta: {
                    service: filename,
                },
            });
        });
    }
    /**
     *
     * @param filename: Caller
     * @param response: returns INFO level
     * @returns
     */
    info(filename, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.logger(filename)).info(response);
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     *
     * @param filename: Caller
     * @param response: returns ERROR level
     * @returns
     */
    error(filename, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.logger(filename)).error(response);
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
 *
 * @param filename: Caller
 * @param response: returns WARN level
 * @returns
 */
    warn(filename, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.logger(filename)).warn(response);
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
*
* @param filename: Caller
* @param response: returns DEBUG level
* @returns
*/
    debug(filename, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.logger(filename)).debug(response);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
LoggerService = __decorate([
    (0, inversify_1.injectable)()
], LoggerService);
exports.default = LoggerService;
