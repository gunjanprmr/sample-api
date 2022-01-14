/**
 * Required External Modules
 */
import "reflect-metadata"
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/routes";
import compress from 'compression';

dotenv.config();

export const app = express();

/**
 *  App Configuration
 */
app.use(helmet()); // Express middleware to secure your apps by setting various HTTP headers, which mitigate common attack vectors.
app.use(cors()); // Express middleware to enable CORS with various options.
app.use(express.json());
app.disable('x-powered-by'); // Hide information
app.use(compress());
routes(app);

module.exports = app;