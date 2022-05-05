'use strict';

module.exports = {
  root: true,
  extends: 'airbnb-base',
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'script',
  },
  rules: {
    strict: [2, 'global'],
    'arrow-parens': [2, 'as-needed'],
    'consistent-return': 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.js',
        '**/__mocks__/*.js',
        'jest.setup.js',
      ],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
    },
  ],
};
