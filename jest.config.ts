export default {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  testRegex: ".(spec|test).(ts|tsx)$",
  moduleNameMapper: {
    "@exmpl/(.*)": "<rootDir>/src/$1",
  },
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/prisma/",
    "/.github/",
    "/__tests__/",
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
};
