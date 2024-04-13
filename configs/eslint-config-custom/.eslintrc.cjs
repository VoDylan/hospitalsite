require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'turbo', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  rules: {
    'semi': 'error',
    'no-empty': 'warn',
    'no-empty-function': 'warn',
    'prefer-const': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_'
      }
    ],
    'unused-imports/no-unused-imports': 'error',
  },
};
