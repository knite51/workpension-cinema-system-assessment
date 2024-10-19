export default {
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  testMatch: ["**/test/**/*.test.js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  verbose: true,
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
};
