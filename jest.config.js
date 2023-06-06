module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '<rootDir>/build',
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/math/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/type-definitions/build',
    '<rootDir>/packages/util/build',
    '<rootDir>/packages/liquidity-proxy/build',
    '<rootDir>/packages/connection/build',
  ],
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/?!(@polkadot/util)'],
};
