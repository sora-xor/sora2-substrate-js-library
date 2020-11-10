module.exports = {
  moduleNameMapper: {
    '@sora-substrate/api(.*)$': '<rootDir>/packages/api/src/$1',
    '@sora-substrate/api-derive(.*)$': '<rootDir>/packages/api-derive/src/$1',
    '@sora-substrate/types(.*)$': '<rootDir>/packages/types/src/$1',
    '@sora-substrate/type-definitions(.*)$': '<rootDir>/packages/type-definitions/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build',
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/api-derive/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/type-definitions/build'
  ]
}
