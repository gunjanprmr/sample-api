module.exports = {
    // preset: 'ts-jest',
    // testEnvironment: 'node',
    // setupFiles: ['dotenv/config'],
    "testRegex": "((\\.|/*.)(spec))\\.js?$",
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: true,
};