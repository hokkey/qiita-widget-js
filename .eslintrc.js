// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    // eslint-disable-next-line no-undef
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
  },
  ignorePatterns: ['*.d.ts'],
  plugins: ['jest', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'prettier',
  ],
}
