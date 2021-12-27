import { injectable } from "inversify";
import { createLogger, format, Logger, transports } from "winston";

@injectable()
export default class LoggerService {
    /**
     * 
     * @returns Log object for logging
     */
    protected async logger(filename: string): Promise<Logger> {

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

    /**
     * 
     * @param filename: Caller 
     * @param response: returns INFO level
     * @returns 
     */
    public async info(filename: string, response: any): Promise<Logger> {
        try {
            return (await this.logger(filename)).info(response);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param filename: Caller 
     * @param response: returns ERROR level
     * @returns 
     */
    public async error(filename: string, response: any): Promise<Logger> {
        try {
            return (await this.logger(filename)).error(response);
        } catch (error) {
            throw error;
        }
    }

    /**
 * 
 * @param filename: Caller 
 * @param response: returns WARN level
 * @returns 
 */
    public async warn(filename: string, response: any): Promise<Logger> {
        try {
            return (await this.logger(filename)).warn(response);
        } catch (error) {
            throw error;
        }
    }

    /**
* 
* @param filename: Caller 
* @param response: returns DEBUG level
* @returns 
*/
    public async debug(filename: string, response: any): Promise<Logger> {
        try {
            return (await this.logger(filename)).debug(response);
        } catch (error) {
            throw error;
        }
    }
}