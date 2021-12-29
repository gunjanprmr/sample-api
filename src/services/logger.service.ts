import { injectable } from "inversify";
import { createLogger, format, Logger, transports } from "winston";
const fs = require('fs');
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
        return createLogger({
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(({ timestamp, level, message, service }) => {
                    return `[${timestamp}] ${service} ${level}: ${JSON.stringify(message)}`;
                }),
            ),
            transports: [
                new transports.File({
                    filename: './logs/winston.log',
                }),             
            ],
            exitOnError: false,
            defaultMeta: {
                service: filename,
            },
        });
    }
}