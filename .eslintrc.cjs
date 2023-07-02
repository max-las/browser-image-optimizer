// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    es2017: true,
    node: false
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['warn', 'single', { 'avoidEscape': true }],
    indent: ['warn', 2]
  }
};
