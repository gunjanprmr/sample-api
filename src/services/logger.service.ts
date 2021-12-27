import { injectable } from "inversify";
import { createLogger, format, Logger, transports } from "winston";

@injectable()
export default class LoggerService {
    /**
     * 
     * @returns Log object for logging
     */
    public async logger(filename: string): Promise<Logger> {

        return createLogger({
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(({ timestamp, level, message, service }) => {
                    return `[${timestamp}] ${service} ${level}: ${JSON.stringify(message)}`;
                }),
            ),
            // transports: [
            //     new winston.transports.File({
            //         filename: '../logs/logs.log'
            //     }),
            // ],
            transports: [new transports.Console()],
            defaultMeta: {
                service: filename,
            },
        });
    }
}


