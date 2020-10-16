module.exports = {
  moduleNameMapper: {
    '@sora-neo-substrate/api(.*)$': '<rootDir>/packages/api/src/$1',
    '@sora-neo-substrate/types(.*)$': '<rootDir>/packages/types/src/$1',
    '@sora-neo-substrate/type-definitions(.*)$': '<rootDir>/packages/type-definitions/src/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build',
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/type-definitions/build'
  ]
}
