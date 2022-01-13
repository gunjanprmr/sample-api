import { injectable } from "inversify";
import { createLogger, format, Logger, transports } from "winston";
import fs from 'fs';
import DailyRotateFile = require("winston-daily-rotate-file");

const logDir = 'logs';
@injectable()
export default class LoggerService {
    /**
     * 
     * @returns Log object for logging
     */
    public async logger(filename: string): Promise<Logger> {
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        const dailyRotateFileTransport = new DailyRotateFile({
            filename: `${logDir}/%DATE%-results.log`,
            datePattern: 'YYYY-MM-DD'
        });
        
        return createLogger({
            format: format.combine(
                format.timestamp(),
                format.printf((info) => `${info.timestamp} ${info.service} ${info.level}: ${JSON.stringify(info.message)}`),
            ),
            transports: [
                dailyRotateFileTransport,             
            ],
            exitOnError: false,
            defaultMeta: {
                service: filename,
            },
        });
    }
}