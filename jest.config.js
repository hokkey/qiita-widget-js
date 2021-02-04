module.exports = {
  automock: false,
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/__mocks__/styleMock.js',
    '\\.html$': '<rootDir>/__mocks__/htmlMock.js',
    '\\.bundled.js$': '<rootDir>/__mocks__/bundleMock.js',
    '^@/(.+)': '<rootDir>/lib/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  testMatch: ['**/tests/**/*.spec.ts'],
  collectCoverageFrom: ['lib/**/*.ts', '!**/*.d.ts'],
}
