module.exports = {
  automock: false,
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/__mocks__/styleMock.js',
    '\\.html$': '<rootDir>/__mocks__/htmlMock.js',
    '\\.bundled.js$': '<rootDir>/__mocks__/bundleMock.js',
    '^~lib/(.+)': '<rootDir>/src/lib/$1',
    '^~iframe/(.+)': '<rootDir>/src/iframe/$1',
    '^~docs/(.+)': '<rootDir>/src/docs/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: './jest.tsconfig.json',
    },
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.spec.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!**/*.d.ts'],
}
