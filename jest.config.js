module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '<rootDir>/build',
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/math/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/type-definitions/build',
    '<rootDir>/packages/sdk/build',
    '<rootDir>/packages/liquidity-proxy/build',
    '<rootDir>/packages/connection/build',
  ],
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/?!(@polkadot/util)'],
  collectCoverage: true,
  collectCoverageFrom: ['packages/**/*.{js,jsx,ts,tsx,vue}'],
  coverageReporters: ['lcov'],
  coveragePathIgnorePatterns: ['node_modules/', 'coverage/'],
};
