import { injectable } from "inversify";
import { createLogger, format, Logger, transports } from "winston";
import fs from 'fs';
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
                format.printf((info) => `${info.timestamp} ${info.service} ${info.level}: ${JSON.stringify(info.message)}`),
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