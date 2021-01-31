module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json']
  },
  ignorePatterns: ["*.d.ts"],
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ]
};
