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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const winston_1 = require("winston");
const fs_1 = __importDefault(require("fs"));
const DailyRotateFile = require("winston-daily-rotate-file");
const logDir = 'logs';
let LoggerService = class LoggerService {
    /**
     *
     * @returns Log object for logging
     */
    logger(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.default.existsSync(logDir)) {
                fs_1.default.mkdirSync(logDir);
            }
            const dailyRotateFileTransport = new DailyRotateFile({
                filename: `${logDir}/%DATE%-results.log`,
                datePattern: 'YYYY-MM-DD'
            });
            return (0, winston_1.createLogger)({
                format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf((info) => `${info.timestamp} ${info.service} ${info.level}: ${JSON.stringify(info.message)}`)),
                transports: [
                    dailyRotateFileTransport,
                ],
                exitOnError: false,
                defaultMeta: {
                    service: filename,
                },
            });
        });
    }
};
LoggerService = __decorate([
    (0, inversify_1.injectable)()
], LoggerService);
exports.default = LoggerService;
