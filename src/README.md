# TypeScript repository using Dependency Injection

# Install a stable version of typescript as a developer dependency:
- `npm i -D typescript`


# Install Project Dependencies:
- `npm i express dotenv cors helmet`
    - `express`: Fast, unopinionated, minimalist web framework for Node.js.
    - `dotenv`: Zero-dependency module that loads environment variables from a .env file into process.env.
    - `cors`: Express middleware to enable CORS with various options.
    - `helmet`: Express middleware to secure your apps by setting various HTTP headers, which mitigate common attack vectors.
- `npm i -D ts-node-dev`
    - Restarts a target Node.js process when any of the required files change.  However, it shares the Typescript compilation process between restarts, which can significantly increase the restart speed.

# Install type definitions for the packages you installed previously:
- `npm i -D @types/node @types/express @types/dotenv @types/cors @types/helmet`