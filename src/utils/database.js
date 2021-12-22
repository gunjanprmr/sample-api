"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export const configuration: config = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     server: process.env.DB_HOST || '',
//     database: process.env.DB_NAME,
//     port: 1433,
// }
// module.exports = configuration;
function sqlConnect() {
    const configuration = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST || '',
        database: process.env.DB_NAME,
        port: 1433,
    };
    return configuration;
}
exports.default = sqlConnect;
