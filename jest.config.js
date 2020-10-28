module.exports = {
  moduleNameMapper: {
    '@sora-neo-substrate/api(.*)$': '<rootDir>/packages/api/src/$1',
    '@sora-neo-substrate/api-derive(.*)$': '<rootDir>/packages/api-derive/src/$1',
    '@sora-neo-substrate/types(.*)$': '<rootDir>/packages/types/src/$1',
    '@sora-neo-substrate/type-definitions(.*)$': '<rootDir>/packages/type-definitions/src/$1',
    '@sora-neo-substrate/app-util(.*)$': '<rootDir>/packages/app-util/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build',
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/api-derive/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/type-definitions/build',
    '<rootDir>/packages/app-util/build'
  ]
}
