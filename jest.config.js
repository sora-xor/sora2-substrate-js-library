module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '<rootDir>/build',
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/api-derive/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/type-definitions/build',
    '<rootDir>/packages/util/build'
  ]
}
