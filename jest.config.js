module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  testPathIgnorePatterns: ["/lib/", "/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  roots: [
    "<rootDir>/src", // informs jest of the root dir
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
