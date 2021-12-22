import { config } from "mssql";

/**
 * 
 * @returns SQL connection configuration
 */
export default function sqlConnect(): config {
    const configuration: config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST || '',
        database: process.env.DB_NAME,
        port: 1433,
    };
    return configuration;
}